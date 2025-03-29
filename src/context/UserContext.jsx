import { createContext, useState, useContext } from 'react';
import { loginUser, logoutUser } from '../actions/user';
import { useNavigate } from 'react-router-dom';

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

            const user = {
                name: _user.Name,
                email: _user.Email,
                phone: _user.Phone,
                dashboards: _user.dashboard
            }

            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/");
        } catch (e) {
            throw e;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (e) {
            throw e;
        };

        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    return useContext(UserContext);
};

export { UserProvider, useUser }