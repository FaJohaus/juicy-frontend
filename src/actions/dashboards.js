import api from "../api";

export const getDashboard = async id => {
    const res = await api.get(`/dashboards/dashboard?id=${id}`);

    return res.data;
}

export const getMyDashboards = async () => {
    const res = await api.get('/dashboards/my');

    return res.data;
}

export const updateDashboard = async (id, changes) => {
    const res = await api.put(`/dashboards/dashboard?id=${id}`, changes);

    return res.data;
}

export const createDashboard = async (name, customers) => {
    const res = await api.post("dashboards/dashboard", { name: name, customers: customers });

    return res.data._id;
}