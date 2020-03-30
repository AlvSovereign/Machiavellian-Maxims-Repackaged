import { Router } from 'express';
import controllers from './user.controller';

const router = Router();

router.route('/updatemaxims').post(controllers.updateMaxims);

export default router;
