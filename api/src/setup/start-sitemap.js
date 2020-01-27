import { createSitemap } from 'sitemap';

import params from '../config/params.json';
import { getAllRSS } from '../modules/chapter/resolvers';
import { getAll as getAllWorks } from '../modules/works/resolvers';
import { getAll as getAllPeople } from '../modules/people/resolvers';
import { getAll as getAllPosts } from '../modules/post/resolvers';
import { APP_URL } from '../config/env';

const languages = Object.keys(params.global.languages).map(
  lang => params.global.languages[lang]
);

export default function(server) {
  console.info('SETUP - Sitemap...');

  server.get('/sitemap.xml', async (req, res) => {
    // Get chapters
    const chapters = await getAllRSS({ first: 50 });
    const chaptersUrl = chapters.map(release => {
      const lang = languages.find(ln => ln.id === release.language);
      return {
        url: `/read/${release.work.stub}/${lang.name}/${release.volume}/${release.chapter}.${release.subchapter}`,
        changefreq: 'daily',
        priority: 0.6
      };
    });

    // Get Works
    const works = await getAllWorks(
      null,
      {
        language: -1,
        orderBy: 'ASC',
        sortBy: 'stub',
        first: 120,
        offset: 0,
        showHidden: false
      },
      null,
      { fieldNodes: [] }
    );
    const worksUrl = works.map(work => {
      return {
        url: `/work/${work.stub}`,
        changefreq: 'weekly',
        priority: 0.4
      };
    });

    // Get People
    const people = await getAllPeople(null, { first: 100 });
    const peopleUrl = people.map(person => {
      return {
        url: `/people/${person.id}`,
        changefreq: 'weekly',
        priority: 0.4
      };
    });

    // Get Posts
    const posts = await getAllPosts(null, { first: 100 });
    const postsUrl = posts.map(post => {
      return {
        url: `/blog/${post.stub}`,
        changefreq: 'weekly',
        priority: 0.4
      };
    });

    const sitemap = await createSitemap({
      hostname: APP_URL,
      cacheTime: 600000,
      urls: [...chaptersUrl, ...worksUrl, ...peopleUrl, ...postsUrl]
    });

    try {
      const xml = sitemap.toXML();
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });
}
