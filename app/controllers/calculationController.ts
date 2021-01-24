import { fork } from 'child_process';

import Util from '../utils/Util';

const util = new Util();

class CalculationController {
  bidData = async (ctx: any) => {
    const { request } = ctx;
    const { number } = request.query;

    const compute = fork('./app/modules/childProcessCalculator.ts', [number.toString()]);
    compute.send('start');

    compute.on('message', async data => {
      console.info('Data from child process!!!', ctx, data);
      // ctx.response.body = data;
      ctx.response.set('status', 200);
      ctx.response.set('body', data);
      console.info('rrrrrrrrrrrrr!!!!!!!s', ctx);
      ctx.status = 200;
      ctx.body = data;

      return ctx;
      // return ctx.body = data;
      // ctx.response.status = 200;
      // return {
      //   response: {
      //     body: data,
      //     status: 200
      //   }
      // };
      // util.setSuccess(200, 'Data successfully calculated!', data);
      // console.info('util!!!!!!!s', util, ctx.response);

      // await util.send(ctx.response);
    });

    // console.info('responseData', responseData);

    // if (responseData) {
    //   util.setSuccess(200, 'Data successfully calculated!', responseData);
    //   util.send(ctx.response);
    // }

    // util.setSuccess(200, 'Data successfully calculated!', 'dsfdfad');

    // util.send(ctx.response);
  }
}

export const calculationController = new CalculationController();
