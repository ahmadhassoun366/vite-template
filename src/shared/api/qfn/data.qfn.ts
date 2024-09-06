import axios from 'axios';
import api from '../api';
import { ExampleDataResponse } from '../responses/data/data.response';

const DataQfn = {
	getAll: async function (): Promise<ExampleDataResponse> {
		const response = await axios<ExampleDataResponse>({
			method: 'GET',
			url: api.data.getAll,
		});

		return response.data;
	},
};

export { DataQfn };
