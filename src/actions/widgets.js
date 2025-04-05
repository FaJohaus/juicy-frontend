import api from "../api";

export const getWidget = async id => {
    /* const res = await api.get(`/dashboards/widgets?id=${id}`);

    return res.data; */

    const res = await api.get("/dashboards/widgets/");

    return res.data.find(w => w._id === id);
}

export const queryEvents = async (customerID, time) => {
    const res = await api.get(`/events/?CustomerID=${customerID}&startdate=${time.start}&enddate=${time.end}`);

    return res.data;
}