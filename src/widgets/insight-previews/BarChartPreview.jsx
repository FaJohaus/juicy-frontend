import PreviewCard from "./PreviewCard";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { truncateText } from "../../utils";
import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";

/* TBD: Determine fix number of bars at which this widgets becomes a 'double sized' */
const BarChartPreview = ({ data, title, maxVal }) => {
    const { chartColors } = useContext(DashboardContext);

    return (
        <PreviewCard title={title}>
            <ResponsiveContainer height={240}>
                <BarChart
                    data={data}
                    margin={{ top: 10, bottom: 10 }}
                    style={{ marginLeft: -20 }}
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
                    <Bar dataKey="value1" isAnimationActive={false}>
                        {data.map((_, i) => (
                            <Cell key={`cell-${i}`} fill={chartColors[i]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </PreviewCard>
    );
}

export default BarChartPreview;