import { Flex, MenuList, MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    BAR, PIE, GRAPH, TIMELINE, TABLE, BIG_NUMBER,
    EVENTS, EVENTS_AMOUNT, SATISFACTION, SATISFACTION_AVERAGE, REVENUE, REVENUE_AVERAGE,
    PURCHASE, RETOUR, EMAIL, TALK, CALL,
    chartTypes, eventTypes, dataTypes
} from "../assets/types";

/* Kleine Notiz an dich selber: Das Diagramm kann aktuell grad nicht ausgewählt werden,
 wahrschienlich weil die Gleichheit von String und Typ aus assets hier nicht richtig geprüft wird.
 Da warst du grade dran, großer :)
 Aber nur beim Erstellen neuer Widgets, beim Editieren von existierenden nicht... huh*/
/* Also used for editing, if a widget prop is passed */
const CreateWidgetMenu = ({ widget }) => {
    const [selectedDataType, setSelectedDataType] = useState();
    const [selectedChartType, setSelectedChartType] = useState(widget?.diagramType ?? null);
    const [selectedEventTypes, setSelectedEventTypes] = useState(eventTypes);

    /* TBD: Different data and charts available when 1 customer vs. multiple customers */
    const combinations = (dataType) => {
        if (dataType === EVENTS)
            return [TIMELINE, TABLE];
        if (dataType === EVENTS_AMOUNT)
            return [GRAPH, BAR, BIG_NUMBER];
        if (dataType === SATISFACTION)
            return [GRAPH, BAR, BIG_NUMBER];
        if (dataType === SATISFACTION_AVERAGE)
            return [GRAPH, BAR, BIG_NUMBER];
        if (dataType === REVENUE)
            return [PIE];
        if (dataType === REVENUE_AVERAGE)
            return [GRAPH, BAR, BIG_NUMBER];
    }

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
                            {t[0].toUpperCase() + t.substring(1)}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>

                {/* EVENT SUBGROUP SELECTION */}
                {(selectedDataType === EVENTS || selectedDataType === EVENTS_AMOUNT) ?
                    <MenuOptionGroup
                        title="Events"
                        type="checkbox"
                        value={selectedEventTypes}
                        onChange={(value) => setSelectedEventTypes(value)}
                        minWidth="200px"
                    >
                        {eventTypes.map((t) => (
                            <MenuItemOption key={t} value={t}>
                                {t[0].toUpperCase() + t.substring(1)}
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
                        {combinations(selectedDataType).map((t) => (
                            <MenuItemOption key={t} value={t}>
                                {t[0].toUpperCase() + t.substring(1)}
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup> : <></>
                }
            </Flex>
        </MenuList>
    );
};


export default CreateWidgetMenu;