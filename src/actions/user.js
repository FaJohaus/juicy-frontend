import api from "../api";

export const loginUser = async (email, pwd) => {
    const res = await api.post('/users/user/login', {
        Email: email,
        Password: pwd
    });

    console.log(res);

    return res.data;
}

export async function logoutUser() {
    console.info("werd ich dann mal bei Gelegenheit machen ;)")
}