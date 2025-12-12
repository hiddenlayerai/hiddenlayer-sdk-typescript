// Jest mock for @azure/storage-blob used in tests
export class BlobServiceClient {
  url: string;
  credential: any;
  constructor(url: string, credential?: any) {
    this.url = url;
    this.credential = credential;
  }
  getContainerClient() {
    return {
      getBlobClient: () => ({
        downloadToFile: jest.fn().mockResolvedValue(undefined),
      }),
    };
  }
}
