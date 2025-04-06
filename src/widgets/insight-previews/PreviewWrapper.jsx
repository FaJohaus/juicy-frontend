import PreviewCard from "./PreviewCard";
import BarChartPreview from "./BarChartPreview";
import PieChartPreview from "./PieChartPreview";
import LineChartPreview from "./LineChartPreview";
import TimelinePreview from "./TimelinePreview";
import TablePreview from "./MyTablePreview";
import { queryEvents, queryEventsAdvanced } from "../../actions/widgets";

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
        { "_id": "647b9f1e1c4a1a001f1e1a12", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-03-25T09:40:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },

        /* { "_id": "647b9f1e1c4a1a001f1e1a13", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-03-25T09:40:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a14", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-03-25T09:40:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a15", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-03-25T09:40:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a16", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-03-25T09:40:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a17", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-03-25T09:40:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a18", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-03-25T09:40:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" },
        { "_id": "647b9f1e1c4a1a001f1e1a19", "subevent": null, "nextevent": null, "previousevent": null, "__t": "EmailEvent", "Date": "2025-03-25T09:40:00.000Z", "CustomerID": "67f15e10bfb2d86b66a3459b" } */
    ];

    /* ---------- */

    const [timelineData, setTimelineData] = useState();
    const [tableData, setTableData] = useState();

    /* Get widget data */
    useEffect(() => {
        if (widget.view.diagramType === "timeline") {
            const getTimelineData = async () => {
                try {
                    const data = await queryEvents(dashboardCustomers[0].id, time);

                    setTimelineData(data);
                } catch (e) {
                    console.error("Could not get timeline data: ", e);
                }
            }

            getTimelineData();
        } else if (widget.view.diagramType === "table") {
            const getTableData = async () => {
                try {
                    const data = await queryEventsAdvanced(dashboardCustomers.map(c => c.id), time, [widget.view.description]);

                    setTableData(() => {
                        switch (widget.view.description) {
                            case "TalkEvent":
                                return data.map(e => [truncateText(dashboardCustomers.find(c => c.id === e.CustomerID).name, 10), e.Date.substring(0, 10), e.Duration, e.rating]);
                            case "EmailEvent":
                                return [];
                            case "CallEvent":
                                return [];
                            case "KaufEvent":
                                return [];
                            case "RetourEvent":
                                return [];
                            case "StornoEvent":
                                return [];
                            default:
                                return [];
                        }
                    }
                    );
                } catch (e) {
                    console.error("Could not get table data: ", e);
                }
            }

            getTableData();
        }
    }, [dashboardCustomers]);

    const getTableColumns = (type) => {
        switch (type) {
            case "TalkEvent":
                return ["Customer", "Date", "Duration", "Rating"];
            case "EmailEvent":
                return ["Customer", "Date", "Rating"];
            case "CallEvent":
                return ["Customer", "Date", "Duration", "Rating"];
            case "KaufEvent":
                return ["Customer", "Date", "Rating"];
            case "RetourEvent":
                return ["Customer", "Date", "Rating"];
            case "StornoEvent":
                return ["Customer", "Date", "Rating"];
            default:
                return [];
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
                    data={tableData ?? []}
                    columns={getTableColumns(widget.view.description)}
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