import { ModelApi, Model, Sensor, SensorApi, ResponseError, Configuration } from "../../generated";
import { sleep } from './utils';

export class ModelNotFoundError extends Error {
}

export class ModelService {
    readonly sensorApi: SensorApi;
    readonly modelApi: ModelApi;

    constructor(config: Configuration) {
        this.sensorApi = new SensorApi(config);
        this.modelApi = new ModelApi(config);
    }

    /**
     * Creates a sensor in the HiddenLayer Platform
     * 
     * @param modelName Name of the model
     * @param version Version of the model
     * 
     * @returns Sensor
     */
    async createSensor(modelName: string, version?: number): Promise<Sensor> {
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
     * @returns Sensor
     */
    async createOrGetSensor(modelName: string, version?: number): Promise<Sensor> {
        try {
            return await this.createSensor(modelName, version);
        } catch (error) {
            if (error instanceof ResponseError && error.response.status == 400) {
                const body = await error.response.text();
                if (body.includes('already exists')) {
                    return await this.getSensorWithRetry(modelName, version, 3);
                }
            }
            throw error;
        }
    }

    async getSensorWithRetry(modelName: string, version?: number, retries?: number): Promise<Sensor> {
        let attempts = 0;
        let sensor: Sensor;
        if (!retries) {
            retries = 1;
        }
        const baseDelay = 0.1; // seconds
        while (attempts < retries) {
            try {
                sensor = await this.getSensor(modelName, version);
                return sensor;
            } catch (error) {
                if (error instanceof ModelNotFoundError) {
                    sleep(baseDelay * Math.pow(2, attempts) + Math.random());
                    attempts++;
                } else {
                    throw error;
                }
            }
        }
        throw new Error(`Sensor ${modelName} not found after ${retries} attempts`);
    }

    /**
     * Gets a HiddenLayer model object. If no version is supplied, the latest model is returned.
     * 
     * @param modelName Name of the model
     * @param version Version of the model to get
     * 
     * @returns Model
     */
    async getSensor(modelName: string, version?: number): Promise<Sensor> {
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
     * Delete a sensor.
     * 
     * @param sensorId id of the sensor
     */
    async deleteSensor(sensorId: string): Promise<void> {
        try {
            await this.sensorApi.deleteSensor({sensorId: sensorId});
        } catch (error) {
            if (error instanceof ResponseError && error.response.status == 409) {
                throw new Error('A sensor associated with this type of model is unable to be deleted');
            }
            throw error;
        }
    }

    /**
     * Delete a model
     * 
     * @param modelId id of the model
     */
    async deleteModel(modelId: string): Promise<void> {
        try {
            await this.modelApi.deleteModel({modelId: modelId});
        } catch (error) {
            if (error instanceof ResponseError && error.response.status == 409) {
                throw new Error('A model of this type unable to be deleted');
            }
            throw error;
        }
    }

    /**
     * Get a model by id
     * 
     * @param modelId id of the model
     */
    async getModel(modelId: string): Promise<Model> {
        const response = await this.modelApi.getModel({modelId: modelId});
        return response;
    }
}
