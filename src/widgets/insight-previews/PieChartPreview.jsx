import { VStack, Text } from "@chakra-ui/react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import PreviewCard from "./PreviewCard";
import { useTheme } from "@chakra-ui/react";

/**
 * 
 * @param {*} data Takes the chart's data in the format [{ name: "...", value="..."}, ...]
 *               - Values should be absolute, the component calculates the percentages itself  
 * @param {*} title Title that will rendered in the footer of the card
 * @returns Pie Chart Preview Card for the Dashboard
 */
const PieChartPreview = ({ data, title }) => {
    const theme = useTheme();

    /* TBD: Create color array based on length of data array */
    const COLORS = [
        theme.colors.blue["400"],
        theme.colors.green["400"],
        theme.colors.yellow["400"],
        theme.colors.orange["400"]
    ];

    const RADIAN = Math.PI / 180;
    const percentageLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <PreviewCard title={title}>
            <ResponsiveContainer height={220}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        label={percentageLabel}
                        labelLine={false}
                        legendType=""
                        isAnimationActive={false}
                    >
                        {data.map((e, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ zIndex: 1 }}
                        wrapperStyle={{ zIndex: 1 }}
                    />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </PreviewCard>
    );
}

export default PieChartPreview;