import type {VercelRequest, VercelResponse} from '@vercel/node';
import {getDb} from './_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({error: 'Method not allowed'});
  }

  try {
    const {rows} = await getDb().execute(
      `SELECT type, title, sub_title, description, example
         FROM html_notes
        ORDER BY sort_order, id`
    );

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Failed to load html notes:', error);
    return res.status(500).json({error: 'Failed to load html notes'});
  }
}
