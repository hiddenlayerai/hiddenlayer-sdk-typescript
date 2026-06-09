// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from '@hiddenlayerai/hiddenlayer-sdk';

const client = new HiddenLayer({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource redTeam', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.evaluations.redTeam.create({ name: 'name' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.evaluations.redTeam.create({
      name: 'name',
      attacker_guidance: 'attacker_guidance',
      attacker_max_generation_attempts: 1,
      attacker_model: 'attacker_model',
      config_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      evaluation_report_model: 'evaluation_report_model',
      execution_strategy_type: 'RANDOM',
      hl_project_id: 'hl_project_id',
      max_parallel_techniques: 0,
      max_turns: 0,
      n_random_techniques: 0,
      objective_ids: ['string'],
      objective_judge_model: 'objective_judge_model',
      prompt_set_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      refusal_judge_model: 'refusal_judge_model',
      sessions_per_technique: 1,
      severity_mapping: { foo: 'CRITICAL' },
      target_model: 'target_model',
      target_system_prompt: 'target_system_prompt',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveEvaluationResults', async () => {
    const responsePromise = client.evaluations.redTeam.retrieveEvaluationResults('workflow_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
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

  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('submitTargetResponse: required and optional params', async () => {
    const response = await client.evaluations.redTeam.submitTargetResponse('workflow_id', {
      session_id: 'session_id',
      target_response: 'target_response',
    });
  });

  // Mock server tests are disabled
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
