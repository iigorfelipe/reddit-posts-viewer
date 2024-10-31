import { Router, Request, Response } from 'express';
import { Posts } from '../models/posts';
import { formatDateToTimestamp } from '../utils/format-date-to-timestamp';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { start_date, end_date } = req.query;

  if (!start_date || !end_date) {
    res.status(400).json({ message: 'Por favor, forneça start_date e end_date.' });
  }

  const startDateTimestamp = formatDateToTimestamp(start_date as string);
  const endDateTimestamp = formatDateToTimestamp(end_date as string);

  if (isNaN(startDateTimestamp) || isNaN(endDateTimestamp)) {
    res.status(400).json({ message: 'Data inválida fornecida.' });
  }

  if (startDateTimestamp > endDateTimestamp) {
    res.status(400).json({ message: 'start_date deve ser anterior a end_date.' });
  }

  try {
    const posts = await Posts.find({
      created_utc: {
        $gte: startDateTimestamp,
        $lte: endDateTimestamp,
      },
    }).sort({ created_utc: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar postagens.' });
  }
});

export default router;
