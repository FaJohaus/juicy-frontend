import api from "../api";

export const getCustomerName = async id => {
    const res = await api.get(`/customers/customer?id=${id}`);

    return `${res.data.Name.First} ${res.data.Name.Last}`
}