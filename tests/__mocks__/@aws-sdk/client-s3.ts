// Jest mock for @aws-sdk/client-s3 used in tests
export class S3Client {
  send = jest.fn(async (_command: any) => ({ Body: { pipe: jest.fn() } }));
}
export class GetObjectCommand {
  input: any;
  constructor(input: any) {
    this.input = input;
  }
}
