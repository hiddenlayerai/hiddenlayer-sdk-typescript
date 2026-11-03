// Stand-in for @huggingface/hub, installed per test file with vi.mock.
import { type Mock, vi } from "vitest";

export interface FakeListFileEntry {
    type: "file" | "directory";
    size: number;
    path: string;
    oid: string;
}

export interface FakeDownload {
    arrayBuffer(): Promise<ArrayBuffer>;
}

export const listFiles: Mock<(params: unknown) => AsyncGenerator<FakeListFileEntry>> = vi.fn(async function* (
    _params: unknown,
) {
    yield { type: "file", size: 123, path: "models/model.bin", oid: "mock-oid" } satisfies FakeListFileEntry;
});

export const downloadFile: Mock<(params: unknown) => Promise<FakeDownload | null>> = vi.fn(
    async (_params: unknown) => ({
        arrayBuffer: async () => new TextEncoder().encode("mock-data").buffer,
    }),
);
