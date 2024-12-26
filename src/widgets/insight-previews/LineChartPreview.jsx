import PreviewCard from "./PreviewCard";
import { LineChart, ResponsiveContainer, CartesianGrid, YAxis, XAxis, Legend, Tooltip, Line } from "recharts";
import { useTheme } from "@chakra-ui/react";

const LineChartPreview = ({ title, maxVal, data }) => {
    const theme = useTheme();

    const COLORS = [
        theme.colors.yellow["500"],
        theme.colors.orange["400"],
        theme.colors.green["400"],
        theme.colors.blue["400"],
    ];

    return (
        <PreviewCard title={title}>
            <ResponsiveContainer height={240}>
                <LineChart data={data} style={{ marginLeft: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        domain={[0, maxVal ?? 'auto']}
                    />
                    <Tooltip
                        contentStyle={{ zIndex: 1 }}
                        wrapperStyle={{ zIndex: 1 }}
                    />
                    <Legend style={{ marginLeft: 20 }} />
                    {Object.keys(data[0]).splice(1).map((customer, i) => (
                        <Line
                            type="linear"
                            dataKey={customer}
                            stroke={COLORS[i % COLORS.length]}
                            key={i}
                            isAnimationActive={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </PreviewCard >
    );
}

export default LineChartPreview;