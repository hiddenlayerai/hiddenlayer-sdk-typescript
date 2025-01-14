import { Model, SensorApi, ResponseError, Configuration } from "../../generated";
import { sleep } from './utils';

export class ModelNotFoundError extends Error {
}

export class ModelService {
    readonly sensorApi: SensorApi;

    constructor(config: Configuration) {
        this.sensorApi = new SensorApi(config);
    }

    /**
     * Creates a model in the HiddenLayer Platform
     * 
     * @param modelName Name of the model
     * @param version Version of the model
     * 
     * @returns Model
     */
    async create(modelName: string, version?: number): Promise<Model> {
        const model = await this.sensorApi.createSensor({createSensorRequest: {plaintextName: modelName, adhoc: true, version: version }});
        return model;
    }

    /**
     * Creates a model in the HiddenLayer Platfom if it does not exist
     * If the model and version already exists, returns the existing model.
     *
     * @param modelName Name of the model
     * @param version Version of the model
     *
     * @returns Model
     */
    async createOrGet(modelName: string, version?: number): Promise<Model> {
        try {
            return await this.create(modelName, version);
        } catch (error) {
            if (error instanceof ResponseError && error.response.status == 400) {
                const body = await error.response.text();
                if (body.includes('already exists')) {
                    return await this.getWithRetry(modelName, version, 3);
                }
            }
            throw error;
        }
    }

    async getWithRetry(modelName: string, version?: number, retries?: number): Promise<Model> {
        let attempts = 0;
        let model: Model;
        if (!retries) {
            retries = 1;
        }
        const baseDelay = 0.1; // seconds
        while (attempts < retries) {
            try {
                model = await this.get(modelName, version);
                return model;
            } catch (error) {
                if (error instanceof ModelNotFoundError) {
                    sleep(baseDelay * Math.pow(2, attempts) + Math.random());
                    attempts++;
                } else {
                    throw error;
                }
            }
        }
        throw new Error(`Model ${modelName} not found after ${retries} attempts`);
    }

    /**
     * Gets a HiddenLayer model object. If no version is supplied, the latest model is returned.
     * 
     * @param modelName Name of the model
     * @param version Version of the model to get
     * 
     * @returns Model
     */
    async get(modelName: string, version?: number): Promise<Model> {
        const request = {
            sensorSORQueryRequest: {
                filter: {
                    plaintextName: modelName,
                    version: version
                }
            }
        };
        const response = await this.sensorApi.querySensor(request);
        if (!response.results || response.results.length == 0) {
            let msg = `Model ${modelName} does not exist`;
            if (version) {
                msg += ` with version ${version}`;
            }
            throw new ModelNotFoundError(msg);
        }
        if (!version) {
            // Sort by version in descending order
            response.results.sort((a, b) => b.version - a.version);
        }
        return response.results[0];
    }

    /**
     * Delete a model.
     * 
     * @param modelName Name of the model to be deleted
     */
    async delete(modelName: string): Promise<void> {
        const model = await this.get(modelName);

        try {
            await this.sensorApi.deleteModel({sensorId: model.sensorId});
        } catch (error) {
            if (error instanceof ResponseError && error.response.status == 409) {
                throw new Error('This type of model is unable to be deleted');
            }
            throw error;
        }
    }
}
