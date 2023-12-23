import express from 'express';

import { ContentNode, pageTree } from '@/domain/content';

const pages = express.Router();

interface PagesGetResponse {
  nodes: ContentNode[]
}

pages.get<{}, PagesGetResponse>('/', (req, res) => {
  res.json({ nodes: pageTree });
});

export default pages;
