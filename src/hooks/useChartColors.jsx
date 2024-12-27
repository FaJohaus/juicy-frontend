import { useTheme } from "@chakra-ui/react";
import { useMemo } from "react";

/**
 *  Custom hook to create up to 36 distinguishable colors for the charts
 * @param {*} amount Amount of colors to create 
 * @returns Array of color codes to be used by recharts components
 */
const useChartColors = (amount) => {
    const theme = useTheme();

    const baseColors = ["blue", "red", "green", "yellow", "orange", "purple", "teal", "pink", "cyan"];

    return useMemo(() => {
        return [...Array(amount)].map((_, i) => {
            if (amount <= baseColors.length) return theme.colors[baseColors[i]][400];

            return theme.colors[baseColors[i % baseColors.length]][(((Math.floor(i / baseColors.length) + 1) * 2) + 1) * 100];
        });
    }, [amount]);
};

export default useChartColors;