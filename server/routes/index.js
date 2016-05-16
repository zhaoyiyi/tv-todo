import express from 'express';
import tvdbRoutes from './tvdb';

const router = express.Router();

router.use('/api/tvdb', tvdbRoutes);

export default router;
