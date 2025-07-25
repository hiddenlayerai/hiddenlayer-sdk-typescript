// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FilesAPI from './files';
import { FileGetMetadataResponse, FileRetrieveParams, FileRetrieveResponse, Files } from './files';

export class ModelIntel extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
}

ModelIntel.Files = Files;

export declare namespace ModelIntel {
  export {
    Files as Files,
    type FileRetrieveResponse as FileRetrieveResponse,
    type FileGetMetadataResponse as FileGetMetadataResponse,
    type FileRetrieveParams as FileRetrieveParams,
  };
}
