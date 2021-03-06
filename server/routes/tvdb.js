import express from 'express';
import { tvdbController } from '../controllers'

const router = express.Router();

router.get('/:searchText', tvdbController.search);
router.get('/detail/:id', tvdbController.detail);
router.get('/newestEpisode/:id', tvdbController.newestEpisode);


export default router;