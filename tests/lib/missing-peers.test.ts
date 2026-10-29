import { afterEach, describe, expect, it, vi } from "vitest";
import { PathValidator } from "../../src/internal/utils/path-validator.js";
import { ModelScanner } from "../../src/lib/model-scan.js";
import { HiddenLayer } from "../../src/wrapper/HiddenLayer.js";

// The storage SDKs are optional peer dependencies; these stand in for a consumer who installed none of them.
vi.mock("@aws-sdk/client-s3", () => {
    throw new Error("Cannot find package '@aws-sdk/client-s3'");
});
vi.mock("@azure/storage-blob", () => {
    throw new Error("Cannot find package '@azure/storage-blob'");
});
vi.mock("@huggingface/hub", () => {
    throw new Error("Cannot find package '@huggingface/hub'");
});

describe("ModelScanner without the storage SDKs", () => {
    const scanner = new ModelScanner(new HiddenLayer({ token: "test-token" }));

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it.each([
        ["@aws-sdk/client-s3", () => scanner.scanS3Model({ modelName: "m", bucket: "b", key: "k" })],
        [
            "@azure/storage-blob",
            () =>
                scanner.scanAzureBlobModel({
                    modelName: "m",
                    accountUrl: "https://test.blob.core.windows.net",
                    container: "c",
                    blob: "b",
                }),
        ],
        ["@huggingface/hub", () => scanner.scanHuggingFaceModel({ repoId: "org/model" })],
    ])("names %s when a scan needs it", async (name, scan) => {
        const createSafeTempPath = vi.spyOn(PathValidator, "createSafeTempPath");
        const createSafeTempDir = vi.spyOn(PathValidator, "createSafeTempDir");

        await expect(scan()).rejects.toThrow(
            `This scan needs ${name}: install it beside @hiddenlayerai/hiddenlayer-sdk.`,
        );
        expect(createSafeTempPath).not.toHaveBeenCalled();
        expect(createSafeTempDir).not.toHaveBeenCalled();
    });
});
