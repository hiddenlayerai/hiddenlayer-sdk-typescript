// Fern generates this file with `expires_in: 1`, which the client's 2-minute refresh buffer treats as already expired,
// so a paginated test's second page fetched a token nothing mocks. .fernignore keeps this copy until Fern fixes it.

import type { MockServer } from "../mock-server/MockServer";

export function mockHiddenLayerOAuth(server: MockServer): void {
    const rawResponseBody = { access_token: "access_token", token_type: "Bearer", expires_in: 3600 };
    server.mockEndpoint().post("/oauth2/token").respondWith().statusCode(200).jsonBody(rawResponseBody).build();
}
