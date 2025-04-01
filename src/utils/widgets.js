import { FaChartPie, FaChartBar, FaProjectDiagram } from "react-icons/fa";
import { FaTableList, FaChartLine } from "react-icons/fa6";
import { MdOutlineNumbers } from "react-icons/md";

export const getWidgetIcon = (widget) => {
    switch (widget.diagramType) {
        case "bar":
            return FaChartBar;
        case "pie":
            return FaChartPie;
        case "graph":
            return FaChartLine;
        case "timeline":
            return FaProjectDiagram;
        case "table":
            return FaTableList;
        case "big number":
            return MdOutlineNumbers;
        default:
            return null;
    }
}