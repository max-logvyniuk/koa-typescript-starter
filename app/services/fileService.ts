// import database from '../db/database';
import FileData from '../dbSequelizeTS/models/fileData';

const setFileData = (data: any) => {
  return FileData.create(data);
};

export {
  setFileData,
};
