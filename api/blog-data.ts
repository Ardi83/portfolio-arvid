import type {Request, Response} from 'express';
import {getDb} from './_db.js';

export default async function handler(req: Request, res: Response) {
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

    // Content changes rarely, so allow a short cache rather than hitting the
    // database on every visit.
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return res.status(500).json({error: 'Failed to load blog posts'});
  }
}
