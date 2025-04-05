import PreviewCard from "./PreviewCard";
import BarChartPreview from "./BarChartPreview";
import PieChartPreview from "./PieChartPreview";
import LineChartPreview from "./LineChartPreview";
import TimelinePreview from "./TimelinePreview";
import TablePreview from "./MyTablePreview";
import { getWidget } from "../../actions/widgets";
import { queryEvents } from "../../actions/widgets";

import { useEffect, useState } from "react";
import { useDashboard } from "../../context/DashboardContext";

/**
 * Takes a widget id, fetches its data and renders the right preview componenet based on its widget-type
 */
const PreviewWrapper = ({ widget }) => {
    const { time, dashboardCustomers } = useDashboard();

    /* const [widget, setWidget] = useState();

    useEffect(() => {
        const fetchWidget = async () => {
            try {
                const data = await getWidget(id);

                setWidget(data);
            } catch (e) {
                console.error(`Error fetching widget ${id}:`, e);
            }
        }

        fetchWidget();
    }, [id]); */

    /* ------ EXAMPLE DATA ----- */

    const pieChartData = [
        { name: 'Customer A', value: 400 },
        { name: 'Customer B', value: 300 },
        { name: 'Customer C', value: 300 },
        { name: 'Customer D', value: 200 },
        { name: 'Customer E', value: 150 },
    ];

    const barChartData = [
        {
            name: "Customer A",
            value1: 6,
        },
        {
            name: "Customer B",
            value1: 6,
        },
        {
            name: "Customer C",
            value1: 7,
        },
        {
            name: "Customer D",
            value1: 1,
        },
        {
            name: "Customer E",
            value1: 8
        }
    ];

    // TBD: "Abtastrate" dynamisch nach Zeitintervall und verfügbarem Screenplatz anpassen
    // TBD: Methode schreiben, die die echten Daten in diese scheiss Form hier überträgt
    const lineChartData = [
        {
            "name": "KW 21",
            "Customer A": 5,
            "Customer B": 6,
            "Customer C": 7,
            "Customer D": 2,
            "Customer E": null
        },
        {
            "name": "KW 22",
            "Customer A": 5.5,
            "Customer B": 4,
            "Customer C": 8,
            "Customer D": 1,
            "Customer E": null
        },
        {
            "name": "KW 24",
            "Customer A": 4,
            "Customer B": 6,
            "Customer C": 8,
            "Customer D": 1.5,
            "Customer E": 5
        },
        {
            "name": "KW 24",
            "Customer A": 6,
            "Customer B": 6,
            "Customer C": 7,
            "Customer D": 1,
            "Customer E": 8
        },
    ];

    const timelineDataOld = [
        { "_id": "1", "subevent": "1.1", "nextevent": "2", "previousevent": null, "__t": "mail", "Date": "01.01.24" },
        { "_id": "1.1", "subevent": null, "nextevent": null, "previousevent": null, "__t": "call", "Date": "05.01.24" },
        { "_id": "2", "subevent": "2.1", "nextevent": "3", "previousevent": "1", "__t": "retour", "Date": "15.01.24" },
        { "_id": "2.1", "subevent": "2.1.1", "nextevent": null, "previousevent": null, "__t": "visit", "Date": "28.01.24" },
        { "_id": "2.1.1", "subevent": "2.1.1.1", "nextevent": null, "previousevent": null, "__t": "mail", "Date": "10.02.24" },
        { "_id": "2.1.1.1", "subevent": null, "nextevent": null, "previousevent": null, "__t": "call", "Date": "25.02.24" },
        { "_id": "3", "subevent": null, "nextevent": "4", "previousevent": "2", "__t": "purchase", "Date": "10.03.24" },
        { "_id": "4", "subevent": "4.1", "nextevent": null, "previousevent": "3", "__t": "retour", "Date": "25.03.24" },
        { "_id": "4.1", "subevent": "4.1.1", "nextevent": null, "previousevent": null, "__t": "visit", "Date": "15.04.24" },
        { "_id": "4.1.1", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "05.05.24" },
        { "_id": "5", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },

        /* { "_id": "6", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "7", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "8", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "9", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "51", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "52", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "53", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "54", "subevent": null, "nextevent": null, "previousevent": null, "__t": "call", "Date": "20.05.24" },

        { "_id": "116", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "117", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "118", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "119", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "151", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "152", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "153", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" },
        { "_id": "154", "subevent": null, "nextevent": null, "previousevent": null, "__t": "call", "Date": "20.05.24" }, */
    ];

    const columnNames = ["Name", "Age", "Email"];

    const demoRows = [
        { name: "Alice", age: 25, email: "alice@example.com" },
        { name: "Bob", age: 30, email: "bob@example.com" },
        { name: "Charlie", age: 35, email: "charlie@example.com" },
        { name: "Alice", age: 25, email: "alice@example.com" },
        { name: "Bob", age: 30, email: "bob@example.com" },
        { name: "Charlie", age: 35, email: "charlie@example.com" },
    ];

    /* ---------- */

    const [timelineData, setTimelineData] = useState();

    useEffect(() => {
        const getTimelineData = async () => {
            try {
                const data = await queryEvents(dashboardCustomers[0].id, time);

                setTimelineData(data);
            } catch (e) {
                console.error("Could not get timeline data: ", e);
            }
        }

        getTimelineData();
    }, [dashboardCustomers]);

    const getPreview = () => {
        switch (widget.view.diagramType) {
            case "bar":
                return <BarChartPreview title={widget.view.name} data={barChartData} />;
            case "pie":
                return <PieChartPreview title={widget.view.name} data={pieChartData} />;
            case "graph":
                return <LineChartPreview title={widget.view.name} data={lineChartData} />;
            case "timeline":
                return <TimelinePreview title={widget.view.name} data={timelineData ?? []} />;
            case "table":
                return <TablePreview title={widget.view.name} data={demoRows} columns={columnNames} />
            case "big number":
                return <PreviewCard title="TBD" />
            default:
                return null;
        }
    }

    return (
        <>
            {getPreview()}
        </>
    );
}

export default PreviewWrapper;