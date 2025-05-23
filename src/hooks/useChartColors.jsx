import { useTheme } from "@chakra-ui/react";
import { useMemo } from "react";

/**
 *  Custom hook to create up to 36 distinguishable colors for the charts
 * @param {*} amount Amount of colors to create 
 * @returns Array of color codes to be used by recharts components
 */
const useChartColors = (amount) => {
    const theme = useTheme();

    const baseColors = ["blue", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan"];

    return [...Array(amount)].map((_, i) => {
        if (amount <= baseColors.length) return theme.colors[baseColors[i]][500];

        return theme.colors[baseColors[i % baseColors.length]][Math.ceil(i / baseColors.length) * 200 + 100];
    });
};

export default useChartColors;