import PreviewCard from "./PreviewCard";
import BarChartPreview from "./BarChartPreview";
import PieChartPreview from "./PieChartPreview";
import LineChartPreview from "./LineChartPreview";
import TimelinePreview from "./TimelinePreview";
import { getWidget } from "../../actions/widgets";
import { useEffect, useState } from "react";

/**
 * Takes a widget id, fetches its data and renders the right preview componenet based on its widget-type
 */
const PreviewWrapper = ({ widget }) => {
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

    const timelineData = [
        { "_id": "1", "subevent": "1.1", "nextevent": "2", "previousevent": null, "type": "mail", "date": "01.01.24" },
        { "_id": "1.1", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "05.01.24" },
        { "_id": "2", "subevent": "2.1", "nextevent": "3", "previousevent": "1", "type": "retour", "date": "15.01.24" },
        { "_id": "2.1", "subevent": "2.1.1", "nextevent": null, "previousevent": null, "type": "visit", "date": "28.01.24" },
        { "_id": "2.1.1", "subevent": "2.1.1.1", "nextevent": null, "previousevent": null, "type": "mail", "date": "10.02.24" },
        { "_id": "2.1.1.1", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "25.02.24" },
        { "_id": "3", "subevent": null, "nextevent": "4", "previousevent": "2", "type": "purchase", "date": "10.03.24" },
        { "_id": "4", "subevent": "4.1", "nextevent": null, "previousevent": "3", "type": "retour", "date": "25.03.24" },
        { "_id": "4.1", "subevent": "4.1.1", "nextevent": null, "previousevent": null, "type": "visit", "date": "15.04.24" },
        { "_id": "4.1.1", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "05.05.24" },
        { "_id": "5", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },

        /* { "_id": "6", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "7", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "8", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "9", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "51", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "52", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "53", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "54", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "20.05.24" },

        { "_id": "116", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "117", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "118", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "119", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "151", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "152", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "153", "subevent": null, "nextevent": null, "previousevent": null, "type": "mail", "date": "20.05.24" },
        { "_id": "154", "subevent": null, "nextevent": null, "previousevent": null, "type": "call", "date": "20.05.24" }, */
    ];

    /* ---------- */

    const getPreview = () => {
        switch (widget.diagramType) {
            case "bar":
                return <BarChartPreview title={widget.name} data={barChartData} />;
            case "pie":
                return <PieChartPreview title={widget.name} data={pieChartData} />;
            case "graph":
                return <LineChartPreview title={widget.name} data={lineChartData} />;
            case "timeline":
                return <TimelinePreview title={widget.name} data={timelineData} />;
            case "table":
                return <PreviewCard title="TBD" />
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