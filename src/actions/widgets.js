import api from "../api";
import { PURCHASE, RETOUR } from "../assets/types";

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

/* export const getEventCount = async (customers, time, type) => {
    let _data = [];

    const fetchPerUser = async (c) => {
        const { data } = await api.get(`/events/count?enddate=${time.end}&CustomerID=${c.id}&startdate=${time.start}&type=${type ?? ""}`);

        _data.push({ name: c.name, value: data.count ?? 0 });
    }

    await Promise.all(customers.map(fetchPerUser));

    return _data;
} */

export const getEventCount = async (customers, time, type) => {
    let events = await queryEventsAdvanced(customers, time, type);

    return events.length;
}

/* export const getRevenues = async (customers, time) => {
    let _data = [];

    const fetchPerUser = async (c) => {
        const { data } = await api.get(`/events/revenue?CustomerID=${c.id}&startdate=${time.start}&enddate=${time.end}`);

        _data.push({ name: c.name, value: data.revenue ?? 0 });
    }

    await Promise.all(customers.map(fetchPerUser));

    return _data;
} */

/* needs customers as object with name and id */
export const getRevenues = async (customers, time) => {
    const purchases = await queryEventsAdvanced(customers.map(c => c.id), time, "Kauf");
    const retours = await queryEventsAdvanced(customers.map(c => c.id), time, RETOUR);

    let data = [];

    customers.forEach(cust => {
        const plus = purchases.filter(p => p.CustomerID === cust.id).map(p => p.Kaufpreis).reduce((total, current) => {
            return total + current;
        }, 0);
        const minus = retours.filter(p => p.CustomerID === cust.id).map(p => p.Kaufpreis).reduce((total, current) => {
            return total + current;
        }, 0);

        data.push({ name: cust.name, value: (plus - minus) });
    });

    return data;
}