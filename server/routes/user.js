import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.post('/save', userController.saveTodo);

export default router;
