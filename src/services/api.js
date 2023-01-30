import axios from 'axios';

const URL = "http://localhost:5000";

async function signUp(data) {
    return axios.post(`${URL}/signup`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}
async function signIn(data) {
    return axios.post(`${URL}/login`, data);
}

async function getPosts() {
    return axios.get(`${URL}/posts`);
}

const api = {
    signUp,
    signIn,
    getPosts
};

export default api;