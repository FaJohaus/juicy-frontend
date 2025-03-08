import { createContext, useState, useContext } from 'react';
import { loginUser, logoutUser } from '../actions/user';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        return localStorage.getItem("user") || null;
    });

    const login = async (email, pwd) => {
        setUser(email);

        try {
            /* await loginUser({
                "Email": email,
                "Password": pwd
            }); */

            localStorage.setItem("user", email); //TBD: GET username and other info and put that in the context instead
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
        }
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