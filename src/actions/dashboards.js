import api from "../api";

export const getDashboard = async id => {
    const res = await api.get(`/dashboards/dashboard?id=${id}`);

    return res.data;
}

export const getMyDashboards = async () => {
    const res = await api.get('/dashboards/my');

    return res.data;
}