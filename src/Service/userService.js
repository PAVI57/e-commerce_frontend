import axios from 'axios';


const BASE_URL = 'http://localhost:8080/users';
const PRODUCT_URL = 'http://localhost:8080/products';
// Function to fetch user by ID
export const getUserById = (userId) => {
    return axios.get(BASE_URL + `/${userId}` + '/products');
};

// Function to list all users
export const listUsers = () => {
    return axios.get(BASE_URL + '/getAll');
};

export const addUser = (user) => {
    return axios.post(BASE_URL + '/add',user );
};

export const deleteUser = (userId) => {
    return axios.delete(BASE_URL + '/delete' + `/${userId}`);
};

export const deleteProduct = (productId) => {
    return axios.delete(PRODUCT_URL + '/delete' + `/${productId}`);
};

export const getProductById = (productId) => {
    return axios.get(PRODUCT_URL + '/get' + `/${productId}`);
};

export const updateProduct = (productId, product) => {
    return axios.put(PRODUCT_URL + '/update' + `/${productId}`, product);
};

export const updateUser = (userId, user) => {
    return axios.put(BASE_URL + '/update' + `/${userId}`, user);
};
