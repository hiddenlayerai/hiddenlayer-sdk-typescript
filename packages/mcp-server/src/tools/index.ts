// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import retrieve_models from './models/retrieve-models';
import delete_models from './models/delete-models';
import list_models_cards from './models/cards/list-models-cards';
import create_sensors from './sensors/create-sensors';
import retrieve_sensors from './sensors/retrieve-sensors';
import delete_sensors from './sensors/delete-sensors';
import query_sensors from './sensors/query-sensors';
import retrieve_scans_results from './scans/results/retrieve-scans-results';
import list_scans_results from './scans/results/list-scans-results';
import list_scans_jobs from './scans/jobs/list-scans-jobs';
import request_scans_jobs from './scans/jobs/request-scans-jobs';
import complete_all_scans_upload from './scans/upload/complete-all-scans-upload';
import start_scans_upload from './scans/upload/start-scans-upload';
import add_upload_scans_file from './scans/upload/file/add-upload-scans-file';
import complete_upload_scans_file from './scans/upload/file/complete-upload-scans-file';

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
addEndpoint(retrieve_scans_results);
addEndpoint(list_scans_results);
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
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
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
