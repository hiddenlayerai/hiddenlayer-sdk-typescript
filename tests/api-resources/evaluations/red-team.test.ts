// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from '@hiddenlayerai/hiddenlayer-sdk';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource redTeam', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.evaluations.redTeam.create({ name: 'name', target_model: 'target_model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.evaluations.redTeam.create({
      name: 'name',
      target_model: 'target_model',
      attacker_max_generation_attempts: 0,
      attacker_model: 'attacker_model',
      evaluation_report_model: 'evaluation_report_model',
      execution_strategy_type: 'execution_strategy_type',
      hl_project_id: 'hl_project_id',
      max_parallel_techniques: 0,
      max_turns: 0,
      n_random_techniques: 0,
      objective_ids: ['string'],
      objective_judge_model: 'objective_judge_model',
      prompt_set_id: 'prompt_set_id',
      refusal_judge_model: 'refusal_judge_model',
      sessions_per_technique: 0,
      target_system_prompt: 'target_system_prompt',
    });
  });

  // Prism tests are disabled
  test.skip('retrieveNextAction', async () => {
    const responsePromise = client.evaluations.redTeam.retrieveNextAction('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieveStatus', async () => {
    const responsePromise = client.evaluations.redTeam.retrieveStatus('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('submitTargetResponse: only required params', async () => {
    const responsePromise = client.evaluations.redTeam.submitTargetResponse('workflow_id', {
      session_id: 'session_id',
      target_response: 'target_response',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('submitTargetResponse: required and optional params', async () => {
    const response = await client.evaluations.redTeam.submitTargetResponse('workflow_id', {
      session_id: 'session_id',
      target_response: 'target_response',
    });
  });

  // Prism tests are disabled
  test.skip('terminate', async () => {
    const responsePromise = client.evaluations.redTeam.terminate('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
