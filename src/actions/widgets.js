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

export const createWidget = async (name, diagramtype, customers, dashboardID, description) => {
    const res = await api.post("dashboards/widgets/widget", {
        "view": {
            "name": name,
            "diagramType": diagramtype,
            "description": description
        },
        "data": {
            "customers": customers,
            "rating": "satisfaction",
            "tree": diagramtype === "timeline"
        },
        "dashboardID": dashboardID
    });

    return res.data;
}