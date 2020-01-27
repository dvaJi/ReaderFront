import subDays from 'date-fns/sub_days';

// App Imports
import {
  getByChapterId as getArchiveByChapterId,
  getByDate,
  createArchiveZip,
  updateArchiveZip,
  update as updateArchive,
  create as createArchive,
  getArchivePath,
  updateLastDownload,
  remove as removeArchive
} from '../modules/archive/resolvers';
import { forEachSeries } from './utils';
import { getLatestPage } from '../modules/page/resolvers';

// File upload configurations and route
export default function(server) {
  console.info('SETUP - Upload...');

  // Upload route
  server.get('/download/:idChapter', async (request, response) => {
    const idChapter = request.params.idChapter;

    // Check if archive already exist
    const archive = await getArchiveByChapterId(idChapter);

    if (archive) {
      const archiveDetail = archive.get();
      const chapter = archiveDetail.chapter;
      const lastPage = await getLatestPage(chapter.id);
      const lastPageDetail = await lastPage.get();

      // Check if archive is updated
      if (archiveDetail.updatedAt > lastPageDetail.updatedAt) {
        await updateLastDownload(archiveDetail.id);
        const archivePath = await getArchivePath(archiveDetail);
        return response.download(archivePath);
      } else {
        // Update archive (zip file) with latest pages from the chapter
        const archiveUpdated = await updateArchiveZip(archiveDetail);
        await updateArchive(archiveUpdated);
        const archivePath = await getArchivePath(archiveUpdated);
        return response.download(archivePath);
      }
    } else {
      // Just create a new archive
      const newArchive = await createArchiveZip(idChapter);
      await createArchive(newArchive);
      const archivePath = await getArchivePath(newArchive);
      return response.download(archivePath);
    }
  });

  server.get('/clean_archives', async (request, response) => {
    const date = subDays(new Date(), 7);
    const archives = await getByDate(date);

    await forEachSeries(archives, async archive => {
      await removeArchive(undefined, { id: archive.id });
    });

    response.send('Done!');
  });
}
