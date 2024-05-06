export class HTTPException extends Error {
  public statusCode!: number;
  public detail?: any;

  constructor(statusCode: number, message: string, detail?: string) {
    super(message);
    this.statusCode = statusCode;
    this.detail = detail;
  }
}
