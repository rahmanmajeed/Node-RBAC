import {Express} from 'express';
export interface IServer{
    app:Express;
   
     /**
      * @application server
      */
     appServer(): Promise<void>
}