// Stand-in for @azure/storage-blob, installed per test file with vi.mock.
import { type Mock, vi } from "vitest";

interface FakeBlobClient {
    downloadToFile: Mock<(path: string) => Promise<void>>;
}

interface FakeContainerClient {
    getBlobClient: (blob: string) => FakeBlobClient;
}

export class BlobServiceClient {
    readonly url: string;
    readonly credential: unknown;

    constructor(url: string, credential?: unknown) {
        this.url = url;
        this.credential = credential;
    }

    getContainerClient(_container: string): FakeContainerClient {
        return {
            getBlobClient: () => ({ downloadToFile: vi.fn(async (_path: string) => undefined) }),
        };
    }
}
