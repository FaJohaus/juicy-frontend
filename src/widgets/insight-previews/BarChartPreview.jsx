import PreviewCard from "./PreviewCard";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "@emotion/react";
import { truncateText } from "../../utils";

/* TBD: Determine fix number of bars at which this widgets becomes a 'double sized' */
const BarChartPreview = ({ data, title, maxVal }) => {
    const theme = useTheme();

    return (
        <PreviewCard title={title}>
            <ResponsiveContainer height={240}>
                <BarChart
                    data={data}
                    margin={{ top: 10, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 15, angle: -20, textAnchor: "end" }}
                        tickFormatter={name => truncateText(name, 12)}
                        interval={0}
                        height={40}
                    />
                    <YAxis
                        domain={[0, maxVal ?? 'auto']}
                        ticks={[...data.map(o => o.value1), maxVal]}
                        interval={0}
                    />
                    <Tooltip
                        contentStyle={{ zIndex: 1 }}
                        wrapperStyle={{ zIndex: 1 }}
                    />
                    <Bar
                        dataKey="value1"
                        fill={theme.colors.purple["400"]}
                        isAnimationActive={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </PreviewCard>
    );
}

export default BarChartPreview;