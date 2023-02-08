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

async function like(id, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.post(`${URL}/like/${id}`, {}, config);
}


async function checkIfUserAlreadyLikedThisPost(id, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.get(`${URL}/like/${id}`, config);
}

async function commentOnPost(id, comment, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.post(`${URL}/comment/${id}`, comment, config);
}

async function getComments(id) {
    return axios.get(`${URL}/comment/${id}`);
}

const api = {
    signUp,
    signIn,
    getPosts,
    like,
    checkIfUserAlreadyLikedThisPost,
    commentOnPost,
    getComments
};

export default api;