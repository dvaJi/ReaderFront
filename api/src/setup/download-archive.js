import subDays from 'date-fns/subDays';

// App Imports
import {
  getByChapterId as getArchiveByChapterId,
  getByDate,
  createArchiveFS,
  updateArchiveFS,
  update as updateArchive,
  create as createArchive,
  getArchivePath,
  updateLastDownload,
  remove as removeArchive,
  generateFilename,
  getAllPagesbyChapter
} from '../modules/archive/resolvers';
import { asyncForeach } from '@shared/async-foreach';
import { getLatestPage } from '../modules/page/resolvers';

const SUPPORTED_FILE_TYPES = ['zip', 'pdf'];

// File upload configurations and route
export default function (server) {
  console.info('SETUP - Upload...');

  server.get('/download/:idChapter', async (request, response) => {
    const idChapter = request.params.idChapter;
    response.redirect(`/download/${idChapter}/zip`);
  });

  // Upload route
  server.get('/download/:idChapter/:type', async (request, response) => {
    const idChapter = request.params.idChapter;
    const type = request.params.type;

    if (!SUPPORTED_FILE_TYPES.includes(type)) {
      response.status(400);
      return response.json({ error: 'Unsupported file type.' });
    }

    // Check if archive already exist
    const archive = await getArchiveByChapterId(idChapter, type);

    if (!archive) {
      // First creation
      const chapterDetail = await getAllPagesbyChapter(idChapter);
      const filename = await generateFilename(chapterDetail, type);
      const createdArchive = await createArchive({
        chapterId: idChapter,
        filename,
        size: 0,
        exist: false,
        type
      });
      const newArchive = await createArchiveFS(idChapter, type, chapterDetail);
      await updateArchive({ ...newArchive, id: createdArchive.get('id') });
      const archivePath = await getArchivePath(newArchive);
      return response.download(archivePath);
    }

    const archiveDetail = archive.get();

    if (archiveDetail.exist) {
      const chapter = archiveDetail.chapter;
      const lastPage = await getLatestPage(chapter.id);
      const lastPageDetail = lastPage.get();

      // The archive exists and is up to date
      if (archiveDetail.updatedAt > lastPageDetail.updatedAt) {
        await updateLastDownload(archiveDetail.id, archiveDetail.count);
        const archivePath = await getArchivePath(archiveDetail);
        return response.download(archivePath);
      } else {
        // The archive is outdated, update it with latest pages from the chapter
        const archiveUpdated = await updateArchiveFS(archiveDetail, type);
        await updateArchive(archiveUpdated);
        const archivePath = await getArchivePath(archiveUpdated);
        return response.download(archivePath);
      }
    } else {
      // The archive does not longer exist
      const chapterDetail = await getAllPagesbyChapter(idChapter);
      const newArchive = await createArchiveFS(idChapter, type, chapterDetail);
      await updateArchive(newArchive);
      const archivePath = await getArchivePath(newArchive);
      return response.download(archivePath);
    }
  });

  server.get('/clean_archives', async (request, response) => {
    const date = subDays(new Date(), 7);
    const archives = await getByDate(date);

    await asyncForeach(archives, async archive => {
      await removeArchive(undefined, { id: archive.id });
    });

    response.send('Done!');
  });
}
