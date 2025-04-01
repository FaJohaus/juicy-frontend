import { Flex, MenuList, MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const chartTypes = [
    "Bar",
    "Pie",
    "Graph",
    "Timeline",
    "Table",
    "Big number",
];

const dataTypes = [
    "Events",
    "Satisfaction",
    "Revenue"
];

const eventTypes = [
    "Purchase",
    "Retour",
    "E-Mail",
    "Talk",
    "Call"
];

const CreateWidgetMenu = () => {
    const [selectedDataType, setSelectedDataType] = useState();
    const [selectedChartType, setSelectedChartType] = useState();
    const [selectedEventTypes, setSelectedEventTypes] = useState(eventTypes);

    return (
        <MenuList>
            <Flex direction="row" gap={4} px={2}>
                {/* DATA SELECTION */}
                <MenuOptionGroup
                    title="Data"
                    type="radio"
                    value={selectedDataType}
                    onChange={(value) => setSelectedDataType(value)}
                    minWidth="200px"
                >
                    {dataTypes.map((t) => (
                        <MenuItemOption key={t} value={t}>
                            {t}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>

                {/* EVENT SUBGROUP SELECTION */}
                {selectedDataType === "Events" ?
                    <MenuOptionGroup
                        title="Events"
                        type="checkbox"
                        value={selectedEventTypes}
                        onChange={(value) => setSelectedEventTypes(value)}
                        minWidth="200px"
                    >
                        {eventTypes.map((t) => (
                            <MenuItemOption key={t} value={t}>
                                {t}
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup> : <></>
                }

                {/* CHART SELECTION */}
                {selectedDataType ?
                    <MenuOptionGroup
                        title="Chart"
                        type="radio"
                        value={selectedChartType}
                        onChange={(value) => setSelectedChartType(value)}
                        minWidth="200px"
                    >
                        {chartTypes.map((t) => (
                            <MenuItemOption key={t} value={t}>
                                {t}
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup> : <></>
                }
            </Flex>
        </MenuList>
    );
};


export default CreateWidgetMenu;