import PreviewCard from "./PreviewCard";
import { useEffect } from "react";
import { LineChart, ResponsiveContainer, CartesianGrid, YAxis, XAxis, Legend, Tooltip, Line } from "recharts";
import { useDashboard } from "../../context/DashboardContext";
import { useTheme } from "@chakra-ui/react";

const LineChartPreview = ({ title, maxVal, data }) => {
    const { chartColors } = useDashboard();
    const { widget } = useTheme();

    useEffect(() => {
        console.info("New chart colors");
    }, [chartColors])

    return (
        <PreviewCard title={title}>
            <ResponsiveContainer height={widget.baseHeight - 80}>
                <LineChart data={data} style={{ marginLeft: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 13, angle: -10, textAnchor: "end" }}
                        interval={0}
                        dx={5}
                    />
                    <YAxis
                        domain={[0, maxVal ?? 'auto']}
                    />
                    <Tooltip
                        contentStyle={{ zIndex: 1 }}
                        wrapperStyle={{ zIndex: 1 }}
                    />
                    {/* <Legend style={{ marginLeft: 20 }} /> */}
                    {Object.keys(data[0]).splice(1).map((customer, i) => (
                        <Line
                            type="linear"
                            dataKey={customer}
                            stroke={chartColors[i]}
                            strokeWidth={2}
                            key={i}
                            isAnimationActive={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </PreviewCard>
    );
}

export default LineChartPreview;