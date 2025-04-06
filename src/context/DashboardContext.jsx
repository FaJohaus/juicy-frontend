import { createContext } from "react";
import useChartColors from "../hooks/useChartColors";
import { useContext } from "react";
import { createWidget } from "../actions/widgets";
import { updateDashboard } from "../actions/dashboards";

const DashboardContext = createContext();

const DashboardContextProvider = ({ id, dashboardCustomers, time, children, name, widgets }) => {
    const chartColors = useChartColors(dashboardCustomers.length);

    const createWidgetHere = async (name, diagramtype, datatype) => {
        try {
            const widget = await createWidget(
                name, diagramtype, [], id, datatype
            );

            /* try {
                await updateDashboard(id, widgets.push(_id));
            }
            catch (e) {
                console.error("Error adding widget to Dashboard: ", e);
            } */

            return widget;
        } catch (e) {
            console.error("Error creating widget: ", e);
        }
    }

    return (
        <DashboardContext.Provider value={{ dashboardCustomers, time, chartColors, name, widgets, createWidgetHere }}>
            {children}
        </DashboardContext.Provider>
    );
};

const useDashboard = () => {
    return useContext(DashboardContext);
};


export { useDashboard, DashboardContextProvider };