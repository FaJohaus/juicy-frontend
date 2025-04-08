import api from "../api";

export const loginUser = async (email, pwd) => {
    const res = await api.post('/users/user/login', {
        Email: email,
        Password: pwd
    });

    return res.data;
}

export const logoutUser = async () => {
    return await api.get('/users/user/logout');
}

export const getUser = async () => {
    const res = await api.get('/users/user');

    return res.data;
}

export const createUser = async (creds) => {
    const res = await api.post('/users/user', creds);

    return res.data;
}