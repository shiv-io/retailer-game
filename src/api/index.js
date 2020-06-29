import { version } from '../../package.json';
import { Router } from 'express';
import { upload } from './upload';
import { getDemands } from './demands';

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  // api.use('/facets', facets({ config, db }));

  api.get('/demands', getDemands);
  api.post('/demands', upload);

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};
