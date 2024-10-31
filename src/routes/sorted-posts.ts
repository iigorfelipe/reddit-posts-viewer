import { Router, Request, Response } from 'express';
import { Posts } from '../models/posts';
import { formatDateToTimestamp } from '../utils/format-date-to-timestamp';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { start_date, end_date, order } = req.query;

  try {
    if (!start_date || !end_date || !order) {
      res.status(400).json({
        message: 'Por favor, forneça start_date, end_date e order (ups ou comments).',
      });
    }

    if (order !== 'ups' && order !== 'comments') {
      res.status(400).json({
        message: 'O parâmetro order deve ser "ups" ou "comments".',
      });
    }

    const sortField = order === 'ups' ? 'ups' : 'num_comments';

    const posts = await Posts.find({
      created_utc: {
        $gte: formatDateToTimestamp(start_date as string),
        $lte: formatDateToTimestamp(end_date as string),
      },
    }).sort({ [sortField]: -1 });

    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts ordenados:', error);
    res.status(500).json({ message: 'Erro ao buscar posts ordenados.' });
  }
});

export default router;
