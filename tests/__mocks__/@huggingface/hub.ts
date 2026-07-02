// Jest mock for @huggingface/hub used in tests
export async function* listFiles(_params: any) {
  yield {
    type: 'file',
    size: 123,
    path: 'models/model.bin',
    oid: 'mock-oid',
  } as any;
}

export const downloadFile = jest.fn(async (_params: any) => ({
  arrayBuffer: async () => Buffer.from('mock-data').buffer,
}));
