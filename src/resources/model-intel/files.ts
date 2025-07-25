// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  /**
   * Retrieve detailed file information including all associated instances,
   * repositories, and metadata
   */
  retrieve(
    sha256: string,
    query: FileRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FileRetrieveResponse> {
    return this._client.get(path`/model-intel/v1/file/${sha256}`, { query, ...options });
  }

  /**
   * Retrieve file information such as filetype, file size in bytes, and MIME type
   */
  getMetadata(sha256: string, options?: RequestOptions): APIPromise<FileGetMetadataResponse> {
    return this._client.get(path`/model-intel/v1/file/${sha256}/metadata`, options);
  }
}

/**
 * Cursor-based pagination navigation links
 */
export interface FileRetrieveResponse {
  /**
   * Pagination cursor pointing to the first page.
   */
  first: string;

  /**
   * Pagination cursor pointing to the next page.
   */
  next: string;

  /**
   * Pagination cursor pointing to the previous page.
   */
  prev: string;

  file_instances?: Array<FileRetrieveResponse.FileInstance>;

  /**
   * Pagination cursor pointing to the last page.
   */
  last?: string;
}

export namespace FileRetrieveResponse {
  export interface FileInstance {
    instance: FileInstance.Instance;

    licenses: Array<FileInstance.License>;

    repo_owner: FileInstance.RepoOwner;

    repo_revision: FileInstance.RepoRevision;

    repository: FileInstance.Repository;

    use_policies: Array<FileInstance.UsePolicy>;
  }

  export namespace FileInstance {
    export interface Instance {
      /**
       * Timestamp when the file instance was created
       */
      created_at: string;

      /**
       * File path within the repository
       */
      path: string;

      /**
       * UUID of the repository revision
       */
      revision_id: string;

      /**
       * SHA256 hash of the file
       */
      sha256: string;

      /**
       * Source of the file instance
       */
      source: string;

      /**
       * Tags associated with the file instance
       */
      tags: Array<string>;

      /**
       * Timestamp when the file instance was last updated
       */
      updated_at: string;
    }

    export interface License {
      /**
       * UUID of the license
       */
      id: string;

      /**
       * Timestamp when the license was created
       */
      created_at: string;

      /**
       * Name of the license
       */
      name: string;

      /**
       * SHA256 hash of the license text
       */
      sha256: string;

      /**
       * Timestamp when the license was last updated
       */
      updated_at: string;

      /**
       * URL of the license
       */
      url: string;

      /**
       * Version of the license
       */
      version: string;

      /**
       * Description of the license
       */
      description?: string;

      /**
       * SPDX identifier for the license
       */
      spdx_id?: string;
    }

    export interface RepoOwner {
      /**
       * UUID of the contributor
       */
      id: string;

      /**
       * Country of the contributor
       */
      country: string;

      /**
       * Timestamp when the contributor was created
       */
      created_at: string;

      /**
       * Handle or username of the contributor
       */
      handle: string;

      /**
       * Homepage URL of the contributor
       */
      homepage_url: string;

      /**
       * Type of contributor
       */
      kind: string;

      /**
       * Additional metadata for the contributor
       */
      metadata: { [key: string]: unknown };

      /**
       * Source platform of the contributor
       */
      source: string;

      /**
       * Tags associated with the contributor
       */
      tags: Array<string>;

      /**
       * Trust level of the contributor
       */
      trust_level: string;

      /**
       * Timestamp when the contributor was last updated
       */
      updated_at: string;

      /**
       * Display name of the contributor
       */
      display_name?: string;
    }

    export interface RepoRevision {
      /**
       * UUID of the repository revision
       */
      id: string;

      /**
       * Git commit hash
       */
      commit_hash: string;

      /**
       * Timestamp when the revision was created
       */
      created_at: string;

      /**
       * Timestamp when the revision was fetched
       */
      fetched_at: string;

      /**
       * Additional metadata for the revision
       */
      metadata: { [key: string]: unknown };

      /**
       * UUID of the repository
       */
      repository_id: string;

      /**
       * Timestamp when the revision was last updated
       */
      updated_at: string;
    }

    export interface Repository {
      /**
       * UUID of the repository
       */
      id: string;

      /**
       * Supported architectures
       */
      architectures: Array<string>;

      /**
       * Timestamp when the repository was created
       */
      created_at: string;

      /**
       * Additional metadata for the repository
       */
      metadata: { [key: string]: unknown };

      /**
       * Supported modalities
       */
      modalities: Array<string>;

      /**
       * UUID of the repository owner
       */
      owner_id: string;

      /**
       * Tags associated with the repository
       */
      tags: Array<string>;

      /**
       * Timestamp when the repository was last updated
       */
      updated_at: string;

      /**
       * URL of the repository
       */
      url: string;

      /**
       * Description of the repository
       */
      description?: string;

      /**
       * Name of the repository
       */
      name?: string;
    }

    export interface UsePolicy {
      /**
       * UUID of the use policy
       */
      id: string;

      /**
       * Timestamp when the use policy was created
       */
      created_at: string;

      /**
       * SHA256 hash of the policy text
       */
      sha256: string;

      /**
       * Title of the use policy
       */
      title: string;

      /**
       * Timestamp when the use policy was last updated
       */
      updated_at: string;

      /**
       * URL of the use policy
       */
      url: string;

      /**
       * Description of the use policy
       */
      description?: string;
    }
  }
}

export interface FileGetMetadataResponse {
  /**
   * Timestamp when the file was created
   */
  created_at: string;

  /**
   * SHA256 hash of the file
   */
  sha256: string;

  /**
   * File size in bytes
   */
  size_bytes: number;

  /**
   * Timestamp when the file was last updated
   */
  updated_at: string;

  /**
   * File extension
   */
  extension?: string;

  /**
   * Type of the file
   */
  file_type?: string;

  /**
   * MIME type of the file
   */
  mime_type?: string;
}

export interface FileRetrieveParams {
  /**
   * Cursor for pagination, used to navigate through pages of results
   */
  cursor?: string;

  /**
   * Number of items to return per page
   */
  page_size?: number;
}

export declare namespace Files {
  export {
    type FileRetrieveResponse as FileRetrieveResponse,
    type FileGetMetadataResponse as FileGetMetadataResponse,
    type FileRetrieveParams as FileRetrieveParams,
  };
}
