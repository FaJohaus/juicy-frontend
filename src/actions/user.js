import api from "../api";

export const loginUser = async (email, pwd) => {
    const res = await api.post('/users/user/login', {
        Email: email,
        Password: pwd
    });

    return res.data;
}

export async function logoutUser() {
    return await api.get('/users/user/logout');
}