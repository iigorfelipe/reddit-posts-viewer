import { Request, Response } from 'express';
import { fetchPosts, fetchSortedPosts } from '../services/posts-services';


export const getPosts = async (req: Request, res: Response) => {
  const { start_date, end_date } = req.query;

  try {
    const posts = await fetchPosts(start_date as string, end_date as string);
    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar postagens:', error);
    res.status(500).json({ message: 'Erro ao buscar postagens.' });
  }
};

export const getSortedPosts = async (req: Request, res: Response) => {
  const { start_date, end_date, order } = req.query;

  try {
    const posts = await fetchSortedPosts(start_date as string, end_date as string, order as string);
    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts ordenados:', error);
    res.status(500).json({ message: 'Erro ao buscar posts ordenados.' });
  }
};
