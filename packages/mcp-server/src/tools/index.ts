// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import HiddenLayer from 'hiddenlayer';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

import retrieve_models from './models/retrieve-models';
import delete_models from './models/delete-models';
import list_models_cards from './models/cards/list-models-cards';
import create_sensors from './sensors/create-sensors';
import retrieve_sensors from './sensors/retrieve-sensors';
import delete_sensors from './sensors/delete-sensors';
import query_sensors from './sensors/query-sensors';
import submit_vectors_vectors from './vectors/submit-vectors-vectors';
import check_health_scans from './scans/check-health-scans';
import check_readiness_scans from './scans/check-readiness-scans';
import retrieve_results_scans from './scans/retrieve-results-scans';
import retrieve_scans_results from './scans/results/retrieve-scans-results';
import list_scans_results from './scans/results/list-scans-results';
import patch_scans_results from './scans/results/patch-scans-results';
import start_scans_results from './scans/results/start-scans-results';
import list_scans_jobs from './scans/jobs/list-scans-jobs';
import request_scans_jobs from './scans/jobs/request-scans-jobs';
import complete_all_scans_upload from './scans/upload/complete-all-scans-upload';
import start_scans_upload from './scans/upload/start-scans-upload';
import add_upload_scans_file from './scans/upload/file/add-upload-scans-file';
import complete_upload_scans_file from './scans/upload/file/complete-upload-scans-file';

export type HandlerFunction = (client: HiddenLayer, args: any) => Promise<any>;

export type Metadata = {
  resource: string;
  operation: 'read' | 'write';
  tags: string[];
};

export type Endpoint = {
  metadata: Metadata;
  tool: Tool;
  handler: HandlerFunction;
};

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(retrieve_models);
addEndpoint(delete_models);
addEndpoint(list_models_cards);
addEndpoint(create_sensors);
addEndpoint(retrieve_sensors);
addEndpoint(delete_sensors);
addEndpoint(query_sensors);
addEndpoint(submit_vectors_vectors);
addEndpoint(check_health_scans);
addEndpoint(check_readiness_scans);
addEndpoint(retrieve_results_scans);
addEndpoint(retrieve_scans_results);
addEndpoint(list_scans_results);
addEndpoint(patch_scans_results);
addEndpoint(start_scans_results);
addEndpoint(list_scans_jobs);
addEndpoint(request_scans_jobs);
addEndpoint(complete_all_scans_upload);
addEndpoint(start_scans_upload);
addEndpoint(add_upload_scans_file);
addEndpoint(complete_upload_scans_file);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  if (filters.length === 0) {
    return endpoints;
  }
  const allExcludes = filters.every((filter) => filter.op === 'exclude');

  return endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        included = filter.op === 'include';
      }
    }

    return included;
  });
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
