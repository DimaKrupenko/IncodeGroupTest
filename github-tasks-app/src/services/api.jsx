import axios from 'axios';

export const API = {
    query: '',

    setQuery(query) {
        API.query = query;
    },

    resetQuery() {
        API.query = '';
    },

    async addMaterial() {
        const url = `https://api.github.com/repos/${API.query}/issues`;
        const response = await axios.get(url);
        return response.data;
    },
};

