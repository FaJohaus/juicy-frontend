import PreviewCard from "./PreviewCard";
import BarChartPreview from "./BarChartPreview";
import PieChartPreview from "./PieChartPreview";
import LineChartPreview from "./LineChartPreview";
import TimelinePreview from "./TimelinePreview";
import TablePreview from "./MyTablePreview";
import { getEventCount, getRevenues, queryEvents, queryEventsAdvanced } from "../../actions/widgets";

import { useEffect, useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import { divideTimespan, truncateText } from "../../utils";

/**
 * Takes a widget id, fetches its data and renders the right preview componenet based on its widget-type
 */
const PreviewWrapper = ({ widget }) => {
    const { time, dashboardCustomers } = useDashboard();

    const [timelineData, setTimelineData] = useState();
    const [timelineCust, setTimelineCust] = useState(dashboardCustomers[0].id);
    const [tableData, setTableData] = useState();
    const [barChartData, setBarChartData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [lineChartData, setLineChartData] = useState();

    /* Get widget data */
    useEffect(() => {
        if (widget.view.diagramType === "timeline") {
            const getTimelineData = async () => {
                try {
                    const data = await queryEvents(timelineCust, time);

                    setTimelineData(data);
                } catch (e) {
                    console.error("Could not get timeline data: ", e);
                }
            }

            getTimelineData();
        } else if (widget.view.diagramType === "table") {
            const getTableData = async () => {
                try {
                    const type = widget.view.description === "KaufEvent" ? "Kauf" : widget.view.description
                    const data = await queryEventsAdvanced(dashboardCustomers.map(c => c.id), time, [type]);

                    setTableData(() => {
                        switch (widget.view.description) {
                            case "TalkEvent":
                            case "CallEvent":
                                return data.map(e => [truncateText(dashboardCustomers.find(c => c.id === e.CustomerID).name, 10), e.Date.substring(0, 10), `${e.Duration ?? "?"} min`, e.rating]);
                            case "EmailEvent":
                                return data.map(e => [truncateText(dashboardCustomers.find(c => c.id === e.CustomerID).name, 10), e.Date.substring(0, 10), truncateText(e.Subject, 12), e.rating]);
                            case "KaufEvent":
                            case "Kauf":
                            case "RetourEvent":
                            case "StornoEvent":
                                return data.map(e => [truncateText(dashboardCustomers.find(c => c.id === e.CustomerID).name, 10), e.Date.substring(0, 10), (e.Kaufpreis ? `${e.Kaufpreis} €` : ""), e.rating]);
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
        } else if (widget.view.diagramType === "bar" && widget.view.description === "satisfaction") {
            setBarChartData(dashboardCustomers.map(c => ({ "name": c.name, "value": c.satisfaction })));
        } else if (widget.view.diagramType === "bar" && widget.view.description.startsWith("events (amount)")) {
            const getBarData = async () => {
                try {
                    const data = await getEventCount(dashboardCustomers, time, widget.view.description.split("-")[1]);

                    setBarChartData(data);
                } catch (e) {
                    console.error("Could not get bar chart data: ", e);
                }
            }

            getBarData();
        } else if (widget.view.diagramType === "pie" && widget.view.description === "revenue") {
            const getPieData = async () => {
                try {
                    const data = await getRevenues(dashboardCustomers, time);

                    setPieData(data);
                } catch (e) {
                    console.error("Could not get pie chart data: ", e);
                }
            }

            getPieData();
        } else if (widget.view.diagramType === "bar" && widget.view.description === "revenue") {
            const getBarData = async () => {
                try {
                    const data = await getRevenues(dashboardCustomers, time);

                    setBarChartData(data);
                } catch (e) {
                    console.error("Could not get bar chart data: ", e);
                }
            }

            getBarData();
        } else if (widget.view.diagramType === "graph" && widget.view.description.startsWith("events (amount)")) {
            const fetchLineChartData = async () => {
                try {
                    const timeSpans = divideTimespan(time);

                    const data = [];

                    for (let i = 0; i < timeSpans.length; i++) {
                        const timeSpan = timeSpans[i];
                        const _data = await getEventCount(
                            dashboardCustomers,
                            timeSpan,
                            widget.view.description.split("-")[1]
                        );

                        const timeSpanData = {};


                        timeSpanData.name = `${timeSpan.start.substring(2, 7).replaceAll("-", "/")}-${timeSpan.end.substring(2, 7).replaceAll("-", "/")}`

                        _data.forEach(cust => {
                            timeSpanData[cust.name] = cust.value;
                        });

                        data.push(timeSpanData);
                    }

                    setLineChartData(data);
                } catch (e) {
                    console.error("Error fetching line chart data: ", e);
                }
            };
            fetchLineChartData()
        }
    }, [dashboardCustomers, timelineCust]);

    const getTableColumns = (type) => {
        switch (type) {
            case "TalkEvent":
                return ["Customer", "Date", "Duration", "Rating"];
            case "EmailEvent":
                return ["Customer", "Date", "Subject", "Rating"];
            case "CallEvent":
                return ["Customer", "Date", "Duration", "Rating"];
            case "KaufEvent":
            case "Kauf":
            case "RetourEvent":
            case "StornoEvent":
                return ["Customer", "Date", "Value", "Rating"];
            default:
                return [];
        }
    }

    const getPreview = () => {
        switch (widget.view.diagramType) {
            case "bar":
                return <BarChartPreview title={widget.view.name} data={barChartData} />;
            case "pie":
                return <PieChartPreview title={widget.view.name} data={pieData} />;
            case "graph":
                return <LineChartPreview title={widget.view.name} data={lineChartData ?? [{ "name": "loading..." }]} />;
            case "timeline":
                return <TimelinePreview
                    title={widget.view.name}
                    data={timelineData ?? []}
                    customer={timelineCust}
                    setCustomer={setTimelineCust}
                />;
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