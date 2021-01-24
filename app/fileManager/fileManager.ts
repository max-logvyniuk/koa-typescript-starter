import fs from 'fs';
import path from 'path';
import * as fastCsv from 'fast-csv';
import map from 'lodash/map';
// import { logger } from '../logger/logger';

import { eventManager, IEventManager } from '../eventManager/eventManager';
import { Row } from '@fast-csv/format';

export interface IFileCsv {
  type: string;
  fileName: string;
  data: IFIleCsvRow[];
}

export interface IFIleCsvRow {
  title: string;
  data: number;
  description: string;
}

class FileManager {
  // constructor(eventManager: IEventManager) {
  //   eventManager.startListening('file', this.createAndSave({type, data}));
  // }

  createAndSave = ({ type, fileName, data }: {type: string, fileName: string, data: IFIleCsvRow[]}) => {
    if (type === 'csv') {
      const ws = fs.createWriteStream(path.resolve(`files/csv/${fileName}.csv`));
      const dataToArray: Row[] = map(data, (item: IFIleCsvRow) => {
        return [
          item.title,
          `${item.data}`,
          item.description,
        ];
      });

      const header = Object.keys(data[0]);

      const dataWithHeader = [
        header,
        ...dataToArray
      ];

      fastCsv
        .write(dataWithHeader, { headers: true })
        .pipe(ws);
      // fs.writeFile(`/files/csv`, data, () => {
      //   console.info('FileManager - ', type);
      // });
    }
    if (type === 'image') {
      console.info('FileManager - ', type);
    }
  }
}

export const fileManager = new FileManager();

// eventManager.startListening(
//   'file',
//   (data: any) => fileManager.createAndSave(data)
// );
