import fs from 'fs';
import path from 'path';
import database from '../db/database';
import { getRepository, Repository } from 'typeorm';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import startsWith from 'lodash/startsWith';
import map from 'lodash/map';

import { IEventManager, eventManager as EManager } from '../eventManager/eventManager';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { fileManager, IFileCsv, IFIleCsvRow } from '../fileManager/fileManager';
import Util from '../utils/Util';
import fileEntity from '../db/models/file';

import db from '../dbSequelizeTS/databaseSTS';
import { setFileData } from '../services/fileService';
import { PWD } from '../app';

const util = new Util();

interface IFileController extends IEventManager {
  eventManager: IEventManager;
}

const basename = path.basename(String(PWD));

class FileController {
  eventManager: IEventManager;
  // private static eventManager: IEventManager;
  constructor(eManager: IEventManager) {
    this.eventManager = eManager;
    this.eventManager.startListening(
      'file',
      (data: any) => fileManager.createAndSave(data),
    );
  }
  setDataAndCreateFile = async (ctx: any) => {
    const { request } = ctx;

    const fileData: IFileCsv = request.body;
    const dataArray = request.body.data;
    const dataToDB = {
      type: fileData.type,
      fileName: fileData.fileName,
      data: JSON.stringify(dataArray),
    };

    console.info('setDataAndCreateFile!!!', ctx.request.body, dataToDB);

    const fileRepo: Repository<fileEntity> = getRepository(fileEntity);
    this.eventManager.emit('file', request.body);

    // const result = await database.File.create(ctx.request.body);
    try {
      const result = await fileRepo.save(dataToDB);
      console.info('create result!!!', result, ctx, ctx.response);
      if (request) {
        util.setSuccess(200, 'File successfully saved!', result);
      } else {
        util.setError(400, 'File not saved(');
      }
      util.send(ctx.response);
    } catch (error) {
      util.setError(500, error);
      util.send(ctx.response);
    }
  }

  setDataAndCreateFileSTS = async (ctx: any) => {
    const { request } = ctx;

    const fileData: IFileCsv = request.body;
    // const dataArray = request.body.data;
    const dataToDB = {
      type: fileData.type,
      fileName: fileData.fileName,
      data: fileData.data,
    };

    console.info('setDataAndCreateFile!!!', ctx.request, dataToDB);

    this.eventManager.emit('file', request.body);

    // const result = await database.File.create(ctx.request.body);
    try {
      const result = await setFileData(dataToDB);
      // console.info('create result!!!', result, ctx, ctx.response);
      if (request) {
        util.setSuccess(200, 'File successfully saved!', result);
      } else {
        util.setError(400, 'File not saved(');
      }
      util.send(ctx.response);
    } catch (error) {
      util.setError(500, error);
      util.send(ctx.response);
    }
  }

  getFileByName = async (ctx: any) => {
    const { request, response } = ctx;

    const fileName = request.query.fileName;

    console.info(`${PWD}`);

    const filePath = path.join(`${PWD}/files/csv/`, `${fileName}.csv`);
    const stat = fs.statSync(filePath);

    // response.writeHead(200, {
    //   'Content-Type': 'audio/mpeg',
    //   'Content-Length': stat.size
    // });

    const readStream = fs.createReadStream(filePath);
    // To upload file
    util.setSuccess(200, 'Files sent', readStream);
    // To see response details
    // util.setSuccess(200, 'Files sent', { readStream });
    util.send(ctx.response);
  }

  getAllFiles = async (ctx: any) => {
    const { request, response } = ctx;

    // const fileName = request.query.fileName;
    const filesPaths: any = [];

    forEach(
      filter(fs.readdirSync(`${PWD}/files/csv`), file => {
         return (
           !startsWith(file, '.') && file !== basename && file.slice(-4) === '.csv'
         );
      }),
      file => {
      filesPaths.push(`${PWD}/files/csv/${file}`);
    },
   );


    console.info(`${PWD}`, filesPaths);

    // response.writeHead(200, {
    //   'Content-Type': 'audio/mpeg',
    //   'Content-Length': stat.size
    // });

    const readStream = map(filesPaths, f => {
      return fs.createReadStream(f);
    });
    util.setSuccess(200, 'Files sent', readStream);
    util.send(ctx.response);
  }
}

export const fileController  = new FileController(EManager);
