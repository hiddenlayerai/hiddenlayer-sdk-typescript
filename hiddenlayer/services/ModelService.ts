import { Model, SensorApi, ResponseError, Configuration } from "../../generated";

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
     * Gets a HiddenLayer model object. If no version is supplied, the latest model is returned.
     * 
     * @param modelName Name of the model
     * @param version Version of the model to get
     * 
     * @returns Model
     */
    async get (modelName: string, version?: number): Promise<Model> {
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
            throw new Error(msg);
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
