import { HiddenLayerServiceClient } from "../hiddenlayer";

describe('When using the HiddenLayerServiceClient', () => {
    it('should fail accessing SaaS if the api id is missing', () => {
        expect(() => {
            new HiddenLayerServiceClient("", "test");
        }).toThrow();
    });

    it('should fail accessing SaaS if the api secret is missing', () => {
        expect(() => {
            new HiddenLayerServiceClient("test", "");
        }).toThrow();
    });

    it('should test if the host is SaaS', () => {
        const client = new HiddenLayerServiceClient("test", "test", "https://api.us.hiddenlayer.ai");
        expect(client.isSaaS).toBe(true);
    });

    it('should test if the host is not SaaS', () => {
        const client = new HiddenLayerServiceClient("test", "test", "http://enterprise.deployment.test");
        expect(client.isSaaS).toBe(false);
    });
});