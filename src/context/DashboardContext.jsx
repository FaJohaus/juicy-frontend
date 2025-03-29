import { createContext } from "react";
import useChartColors from "../hooks/useChartColors";

const DashboardContext = createContext();

const DashboardContextProvider = ({ customers, time, children }) => {
    const chartColors = useChartColors(customers.length);

    return (
        <DashboardContext.Provider value={{ customers, time, chartColors }}>
            {children}
        </DashboardContext.Provider>
    )
}

export { DashboardContext, DashboardContextProvider };