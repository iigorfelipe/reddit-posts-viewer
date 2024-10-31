import { Request, Response, NextFunction } from 'express';
import { formatDateToTimestamp } from '../utils/format-date-to-timestamp';

export const validateDateMiddleware = (req: Request, res: Response, next: NextFunction) => {
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

  next();
};

export const validateDateAndOrderMiddleware = (req: Request, res: Response, next: NextFunction) => {
  validateDateMiddleware(req, res, () => {
    const { order } = req.query;

    if (!order || (order !== 'ups' && order !== 'comments')) {
      res.status(400).json({
        message: 'O parâmetro order deve ser "ups" ou "comments".',
      });
    }

    next();
  });
};
