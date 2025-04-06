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
import { truncateText } from "../../utils";

/**
 * Takes a widget id, fetches its data and renders the right preview componenet based on its widget-type
 */
const PreviewWrapper = ({ widget }) => {
    const { time, dashboardCustomers } = useDashboard();

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
        /* { "_id": "1", "subevent": "1.1", "nextevent": "2", "previousevent": null, "__t": "mail", "Date": "01.01.24" },
        { "_id": "1.1", "subevent": null, "nextevent": null, "previousevent": null, "__t": "call", "Date": "05.01.24" },
        { "_id": "2", "subevent": "2.1", "nextevent": "3", "previousevent": "1", "__t": "retour", "Date": "15.01.24" },
        { "_id": "2.1", "subevent": "2.1.1", "nextevent": null, "previousevent": null, "__t": "visit", "Date": "28.01.24" },
        { "_id": "2.1.1", "subevent": "2.1.1.1", "nextevent": null, "previousevent": null, "__t": "mail", "Date": "10.02.24" },
        { "_id": "2.1.1.1", "subevent": null, "nextevent": null, "previousevent": null, "__t": "call", "Date": "25.02.24" },
        { "_id": "3", "subevent": null, "nextevent": "4", "previousevent": "2", "__t": "purchase", "Date": "10.03.24" },
        { "_id": "4", "subevent": "4.1", "nextevent": null, "previousevent": "3", "__t": "retour", "Date": "25.03.24" },
        { "_id": "4.1", "subevent": "4.1.1", "nextevent": null, "previousevent": null, "__t": "visit", "Date": "15.04.24" },
        { "_id": "4.1.1", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "05.05.24" },
        { "_id": "5", "subevent": null, "nextevent": null, "previousevent": null, "__t": "mail", "Date": "20.05.24" }, */


        { "_id": "647b9f1e1c4a1a001f1e1a01", "subevent": "647b9f1e1c4a1a001f1e1a02", "nextevent": "647b9f1e1c4a1a001f1e1a03", "previousevent": null, "__t": "EmailEvent", "Date": "2024-06-01T12:30:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a02", "subevent": null, "nextevent": null, "previousevent": null, "__t": "CallEvent", "Date": "2024-06-05T14:45:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a03", "subevent": "647b9f1e1c4a1a001f1e1a04", "nextevent": "647b9f1e1c4a1a001f1e1a08", "previousevent": "647b9f1e1c4a1a001f1e1a01", "__t": "RetourEvent", "Date": "2024-07-10T09:15:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a04", "subevent": "647b9f1e1c4a1a001f1e1a06", "nextevent": null, "previousevent": null, "__t": "TalkEvent", "Date": "2024-08-01T16:00:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a06", "subevent": "647b9f1e1c4a1a001f1e1a07", "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2024-09-15T11:20:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a07", "subevent": null, "nextevent": null, "previousevent": null, "__t": "CallEvent", "Date": "2024-10-10T13:50:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a08", "subevent": null, "nextevent": "647b9f1e1c4a1a001f1e1a09", "previousevent": "647b9f1e1c4a1a001f1e1a03", "__t": "KaufEvent", "Date": "2024-11-20T08:00:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a09", "subevent": "647b9f1e1c4a1a001f1e1a10", "nextevent": null, "previousevent": "647b9f1e1c4a1a001f1e1a08", "__t": "RetourEvent", "Date": "2024-12-05T10:10:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a10", "subevent": "647b9f1e1c4a1a001f1e1a11", "nextevent": null, "previousevent": null, "__t": "TalkEvent", "Date": "2025-01-15T15:30:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a11", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-02-20T12:00:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a12", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-03-25T09:40:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" }
    ];

    const columnNames = ["Name", "Age", "Email"];

    const demoRows = [
        { name: "Alice", age: 25, email: "alice@example.com" },
        { name: "Bob", age: 30, email: "bob@example.com" },
        { name: "Charlie", age: 35, email: "charlie@example.com" },
        { name: "Alice", age: 25, email: "alice@example.com" },
        { name: "Bob", age: 30, email: "bob@example.com" },
        { name: "Charlie", age: 35, email: "charlie@example.com" },
        { name: "Alice", age: 25, email: "alice@example.com" },
        { name: "Bob", age: 30, email: "bob@example.com" },
        { name: "Charlie", age: 35, email: "charlie@example.com" },
        /* { name: "Alice", age: 25, email: "alice@example.com" },
        { name: "Bob", age: 30, email: "bob@example.com" },
        { name: "Charlie", age: 35, email: "charlie@example.com" }, */
    ];

    /* ---------- */

    const [timelineData, setTimelineData] = useState();
    const [tableData, setTableData] = useState();

    useEffect(() => {
        if (/* widget.diagramType === "timeline" */true) {
            const getTimelineData = async () => {
                try {
                    const data = await queryEvents(dashboardCustomers[0].id, time);

                    setTimelineData(data);
                } catch (e) {
                    console.error("Could not get timeline data: ", e);
                }
            }

            getTimelineData();
        } else if (widget.diagramType === "table") {
            const getTableData = async () => {
                try {
                    const data = await queryEvents(dashboardCustomers[0].id, time);

                    setTableData(data);
                } catch (e) {
                    console.error("Could not get timeline data: ", e);
                }
            }

            getTableData();
        }
    }, [dashboardCustomers]);

    const getTableData = (type) => {
        const data = timelineData.filter(event => event.__t === type);

        switch (type) {
            case "TalkEvent":
                return data.map(e => [truncateText(dashboardCustomers.find(c => c.id === e.CustomerID).name, 10), e.Date.substring(0, 10), e.Duration, e.rating]);
            default:
                return null;
        }
    }

    const getTableColumns = (type) => {
        switch (type) {
            case "TalkEvent":
                return ["Customer", "Date", "Duration", "Rating"];
            case "EmailEvent":
                return ["Customer", "Date", "Rating"];
            case "CallEvent":
                return ["Customer", "Date", "Rating"];
            case "KaufEvent":
                return ["Customer", "Date", "Rating"];
            case "RetourEvent":
                return ["Customer", "Date", "Rating"];
            case "StornoEvent":
                return ["Customer", "Date", "Rating"];
            default:
                return null;
        }
    }

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
                return <TablePreview
                    title={widget.view.name}
                    data={timelineData ? getTableData(widget.view.description) : []}
                    columns={timelineData ? getTableColumns(widget.view.description) : []}
                />
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