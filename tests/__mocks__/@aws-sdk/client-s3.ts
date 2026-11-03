// Stand-in for @aws-sdk/client-s3, installed per test file with vi.mock.
import { type Mock, vi } from "vitest";

export class S3Client {
    send: Mock<(command: unknown) => Promise<{ Body: unknown }>> = vi.fn(async (_command: unknown) => ({
        Body: { on: vi.fn(), pipe: vi.fn() },
    }));
}

export class GetObjectCommand {
    readonly input: unknown;

    constructor(input: unknown) {
        this.input = input;
    }
}
