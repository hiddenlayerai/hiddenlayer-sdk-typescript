import { HiddenLayerServiceClient } from "../hiddenlayer";

describe('When using the HiddenLayerServiceClient', () => {
    it('should fail accessing SaaS if the api id is missing', () => {
        expect(() => {
            HiddenLayerServiceClient.createSaaSClient("", "test");
        }).toThrow();
    });

    it('should fail accessing SaaS if the api secret is missing', () => {
        expect(() => {
            HiddenLayerServiceClient.createSaaSClient("test", "");
        }).toThrow();
    });

    it('should test if the host is SaaS', () => {
        const client = HiddenLayerServiceClient.createSaaSClient(process.env.HL_CLIENT_ID , process.env.HL_CLIENT_SECRET, "https://api.us.hiddenlayer.ai");
        expect(client.isSaaS).toBe(true);
    });

    it('should test if the host is not SaaS', () => {
        const client = HiddenLayerServiceClient.createEnterpriseClient("http://enterprise.deployment.test");
        expect(client.isSaaS).toBe(false);
    });
});