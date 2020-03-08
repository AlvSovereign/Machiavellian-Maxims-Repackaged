import { Router } from 'express';
import controllers from './maxim.controller';

const router = Router();

router.route('/:maximNumber').get(controllers.getMaximByMaximNumber);

export default router;
