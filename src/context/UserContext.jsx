import { createContext, useState, useContext } from 'react';
import { loginUser, logoutUser, getUser } from '../actions/user';
import { useNavigate } from 'react-router-dom';
import { fetchAllCustomers } from '../actions/customers';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch (e) {
            return null;
        }
    });

    const login = async (email, pwd) => {
        try {
            const _user = await loginUser(email, pwd);
            const custs = await getCustomers();

            const user = {
                name: _user.Name,
                email: _user.Email,
                phone: _user.Phone,
                dashboards: _user.dashboards,
                customers: custs
            }

            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/dashboard/0");
        } catch (e) {
            console.error("Error logging in: ", e);
            throw e;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (e) {
            console.error("Error logging out: ", e);
            throw e;
        };

        setUser(null);
        localStorage.removeItem("user");
    };

    const refetchUser = async () => {
        try {
            const _user = await getUser();
            const custs = await getCustomers();

            const user = {
                name: _user.Name,
                email: _user.Email,
                phone: _user.Phone,
                dashboards: _user.dashboards,
                customers: custs
            }

            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
            console.error("Error fetching user: ", e);
            throw e;
        }

    }

    const getCustomers = async () => {
        try {
            const custs = await fetchAllCustomers();

            return custs.map(c => {
                return {
                    name: `${c.Name.First} ${c.Name.Last}`,
                    email: c.Email,
                    id: c._id,
                    satisfaction: c.Data?.Satisfaction ?? 0
                }
            });
        } catch (e) {
            console.error("Error fetching customers: ", e);
            throw e;
        }
    }

    return (
        <UserContext.Provider value={{ user, login, logout, refetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    return useContext(UserContext);
};

export { UserProvider, useUser }