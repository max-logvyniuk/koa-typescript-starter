import { EventEmitter } from 'events';

import { fileManager } from '../fileManager/fileManager';

export interface IEventManager {
  startListening: (eventName: string, callback: (data: any) => void) => void;
  emit: (event: string | symbol, ...args: any[]) => boolean;
}

class EventManager extends EventEmitter {
  constructor() {
    super();
  }
  public startListening = (eventName: string, callback: (data: any) => void) => {
    this.addListener(eventName, (data) => {
      callback(data);
    });
  }

  public completeListening = (eventName: string) => {
    this.removeListener(eventName, () => {
      console.info(`Complete listening event ${eventName}`);
    });
  }
}

export const eventManager: IEventManager = new EventManager();
