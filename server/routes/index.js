import express from 'express';
import tvdbRoutes from './tvdb';
import userRoutes from './user';

const router = express.Router();

router.use('/api/tvdb', tvdbRoutes);
router.use('/api/user', userRoutes);

export default router;
