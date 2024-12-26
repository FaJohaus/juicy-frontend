import PreviewCard from "./PreviewCard";
import { LineChart, ResponsiveContainer, CartesianGrid, YAxis, XAxis, Legend, Tooltip, Line } from "recharts";
import { useTheme } from "@chakra-ui/react";

const LineChartPreview = ({ title, maxVal }) => {
    const theme = useTheme();

    const COLORS = [
        theme.colors.yellow["500"],
        theme.colors.orange["400"],
        theme.colors.green["400"],
        theme.colors.blue["400"],
    ];

    // TBD: "Abtastrate" dynamisch nach Zeitintervall und verfügbarem Sreenplatz anpassen
    // TBD: Methode schreiben, die Daten in diese scheiss Form überträgt
    const data = [
        {
            "name": "KW 21",
            "Customer 0": 5,
            "Customer 1": 6,
            "Customer 2": 7,
            "Customer 3": 2
        },
        {
            "name": "KW 22",
            "Customer 0": 5.5,
            "Customer 1": 4,
            "Customer 2": 8,
            "Customer 3": 1
        },
        {
            "name": "KW 23",
            "Customer 0": 4,
            "Customer 1": 6,
            "Customer 2": 8,
            "Customer 3": 1.5
        },
        {
            "name": "KW 24",
            "Customer 0": 6,
            "Customer 1": 6,
            "Customer 2": 7,
            "Customer 3": 1
        },
    ];

    return (
        <PreviewCard title={title}>
            <ResponsiveContainer height={240}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        domain={[0, maxVal ?? 'auto']}
                        interval={0}
                    />
                    <Tooltip
                        contentStyle={{ zIndex: 1 }}
                        wrapperStyle={{ zIndex: 1 }}
                    />
                    <Legend />
                    <Line type="linear" dataKey="Customer 0" stroke={COLORS[0]} />
                    <Line type="linear" dataKey="Customer 1" stroke={COLORS[1]} />
                    <Line type="linear" dataKey="Customer 2" stroke={COLORS[2]} />
                    <Line type="linear" dataKey="Customer 3" stroke={COLORS[3]} />
                </LineChart>
            </ResponsiveContainer>
        </PreviewCard>
    );
}

export default LineChartPreview;