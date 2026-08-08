import type {VercelRequest, VercelResponse} from '@vercel/node';
import {getDb} from './_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({error: 'Method not allowed'});
  }

  try {
    const {rows} = await getDb().execute(
      `SELECT id, title, category, description, example_link, posted_by, created_at
         FROM blog_posts
        ORDER BY created_at DESC`
    );

    // Content changes rarely, so let the CDN serve it and revalidate in the
    // background rather than hitting the database on every visit.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return res.status(500).json({error: 'Failed to load blog posts'});
  }
}
