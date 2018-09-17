import * as express from 'express';

export class HttpUtil {
  static handleSuccess(req: express.Request, res: express.Response, next: express.NextFunction, ans: HttpResponseData) {
    try {
      switch (ans.type) {
        case HttpResponseType.json:
          res.json(ans.data);
          next();
          break;
        default:
          res.status(500).json({err: `invalid HttpResponseData type: ${ans.type}`});
          next();
      }
    } catch (e) {
      console.log(e.stack);
      res.status(500).json({err: e.message});
    }
  }
}

export class HttpResponseData {
  type: HttpResponseType;
  data: any;

  constructor(type: HttpResponseType, data: any) {
    this.type = type;
    this.data = data;
  }
}

export enum HttpResponseType {
  json = 1, pic = 2, picRemote = 3, tarFile = 4
}