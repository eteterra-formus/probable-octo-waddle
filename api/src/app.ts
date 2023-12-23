import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { apiUrl } from '@/config';
import pageResource from '@/routes/pages';


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Show a list of resources available as a simple API documentation 
 * when browsing the index page.
 */
app.get<{}>('/', (req, res) => {
  res.json({
    resources: [
      {
        title: 'Page Tree',
        url: `${apiUrl()}/pages`,
        description: 'a nested data structure representing all pages',
      },
    ],
  });
});

app.use('/pages', pageResource);

export default app;
