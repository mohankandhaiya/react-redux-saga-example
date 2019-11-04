import axios from 'axios'

const BASE_URL = 'https://api.backendless.com/8DE6548E-8BF3-6D86-FFD1-69A3FB236D00/CF3980EA-F0E0-187F-FF73-FE1EA86E8A00';

export async function fetchTopics(){
    return axios.get( 'https://api.backendless.com/8DE6548E-8BF3-6D86-FFD1-69A3FB236D00/CF3980EA-F0E0-187F-FF73-FE1EA86E8A00/data/Topics')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
}

export async function showTopics(key){
    console.log(key);
    return axios.get( `${BASE_URL}/data/Topics?where=UserId%3D${key}`)
        .then(response => response)
        .catch(error => error);
}

export async function addTopics(payload){
    console.log(payload);
    return axios.post( `${BASE_URL}/data/Topics`, payload)
        .then(response => response)
        .catch(error => error);
}

export async function deleteTopics(key){
    console.log(key);
    return axios.delete( `${BASE_URL}/data/Topics/${key.key}`)
        .then(response => response)
        .catch(error => error);
}

export async function editTopics(payload){
    console.log(payload.payload);
    return axios.put( 'https://api.backendless.com/8DE6548E-8BF3-6D86-FFD1-69A3FB236D00/CF3980EA-F0E0-187F-FF73-FE1EA86E8A00/data/Topics/' + payload.objectId.objectId, payload.payload)
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
}

export async function fetchCategory(){
    return axios.get( 'https://api.backendless.com/8DE6548E-8BF3-6D86-FFD1-69A3FB236D00/CF3980EA-F0E0-187F-FF73-FE1EA86E8A00/data/Categories')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
}

export async function loginRequest(data){
    const payload={
        "login":data.login,
        "password":data.password
    };
    return axios.post(`${BASE_URL}/users/login`, payload)
        .then(response => response)
        .catch(error => error);
}

export async function signupRequest(data){
    return axios.post(`${BASE_URL}/users/register`, data)
        .then(function (response) {
            console.log("Login successful");
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

export async function editRequest(id,data){
    return axios.post(`${BASE_URL}/data/sample/${id}`, data)
        .then(function (response) {
            console.log("Login successful");
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

export async function requestComments(payload){
    console.log("Required " + payload);
    return axios.get(
        `${BASE_URL}/data/Topics?where=Name%3D%27${payload}%27`)
        .then(response => response)
        .catch(error => error);
}

export async function requestReviews(payload){
    console.log("Required " + payload);
    return axios.get(
        `${BASE_URL}/data/Ratings?where=Author%3D%27${payload}%27`)
        .then(response => response)
        .catch(error => error);
}

export async function averageRating(payload){
    console.log(payload);
    return axios.get(`${BASE_URL}/data/Ratings?props=Avg(Stars)&where=Author%3D%27${payload}%27`)
        .then(response => response)
        .catch(error => error);
}

export async function totalRating(payload){
    console.log(payload);
    return axios.get(`${BASE_URL}/data/Ratings?props=Count(Stars)`)
        .then(response => response)
        .catch(error => error);
}

export async function postComments(data){
    console.log(data);
    return axios.post( `${BASE_URL}/data/Ratings`, data)
        .then(response => response)
        .catch(error => error);
}

export async function postAuthor(data){
    console.log(data);
    return axios.post( `${BASE_URL}/data/Topics`, data)
        .then(response => response)
        .catch(error => error);
}