import { Request, Response } from 'express';
import { graphById } from '../services/ksql_service';

type Query = {
  id: string;
};
export const getGraphById = async (
  req: Request<{}, {}, {}, Query>,
  res: Response
) => {

  const id = parseInt(req.query.id);
  console.log('wat', id);
  if (isNaN(id)) {
    res.json('Bad req');
  }
  const queries = await graphById(id);
  res.json(queries);
};
