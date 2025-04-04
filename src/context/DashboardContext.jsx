import { createContext } from "react";
import useChartColors from "../hooks/useChartColors";
import { useContext } from "react";

const DashboardContext = createContext();

const DashboardContextProvider = ({ dashboardCustomers, time, children, name, widgets }) => {
    const chartColors = useChartColors(dashboardCustomers.length);

    return (
        <DashboardContext.Provider value={{ dashboardCustomers, time, chartColors, name, widgets }}>
            {children}
        </DashboardContext.Provider>
    );
};

const useDashboard = () => {
    return useContext(DashboardContext);
};


export { useDashboard, DashboardContextProvider };