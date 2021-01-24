import Router from 'koa-router';

import { fileController } from '../controllers/fileController';
import { calculationController } from '../controllers/calculationController';

const router = new Router();

/**
 * Base route, return a 401
 */
router.get('/', async ctx => ctx.status = 401);

/**
 * Basic healthcheck
 */
router.get('/healthcheck', async ctx => ctx.body = 'OK');

router.get('/files', async ctx => fileController.getAllFiles(ctx));

router.get('/file', async ctx => fileController.getFileByName(ctx));

router.post('/file', async ctx => fileController.setDataAndCreateFile(ctx));

router.post('/file-sts', async ctx => fileController.setDataAndCreateFileSTS(ctx));

router.get('/calculation/big-count', async ctx => await calculationController.bidData(ctx));

export const appRouter = router.routes();
