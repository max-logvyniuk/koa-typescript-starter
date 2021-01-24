// interface IUtil {
//   statusCode: string;
//   type: string;
//   data: string;
//   message: string;
// }

export default class Util {
  private statusCode: number | null;
  private type: undefined | 'success' | 'error';
  private data: undefined;
  private message: string | null;
  constructor() {
    this.statusCode = undefined;
    this.type = undefined;
    this.data = undefined;
    this.message = undefined;
  }

  public setSuccess(statusCode: number, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  public setError(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  public send(response: any) {

    if (this.type === 'success') {
      response.set('status', this.statusCode);
      response.type = this.type;
      response.message = this.message;
      response.body = this.data;
      console.info('response in Util 1!!!', response, this.statusCode);
      return response;
    }
    response.status = this.statusCode;
    response.type = this.type;
    response.message = this.message;
    console.info('response in Util 2!!!', response);
    return response;
  }
}
