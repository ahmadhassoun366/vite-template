const _baseUrl = import.meta.env.VITE_APP_API;
const api = {
	baseUrl: _baseUrl,

	data: {
		getAll: `https://jsonplaceholder.typicode.com/posts`,
	},
};

export default api;
