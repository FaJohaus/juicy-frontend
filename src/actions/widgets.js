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

export const queryEventsAdvanced = async (customers, time, types) => {
    let events = [];

    const fetchPerUser = async (customer) => {
        try {
            const customerEvents = await queryEvents(customer, time);

            events = events.concat(customerEvents);
        } catch (e) {
            throw e;
        }
    }

    await Promise.all(customers.map(fetchPerUser));

    if (types) {
        events = events.filter(e => types.includes(e.__t));
    }

    return events;
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

export const getEventCount = async (customers, time, type) => {
    let _data = []

    const fetchPerUser = async (c) => {
        const { data } = await api.get(`/events/count?enddate=${time.end}&CustomerID=${c.id}&startdate=${time.start}&type=${type ?? ""}`);

        _data.push({ name: c.name, value: data.count });
    }

    await Promise.all(customers.map(fetchPerUser));

    return _data;
}