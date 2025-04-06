import { Flex, MenuList, MenuItemOption, MenuOptionGroup, Heading, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import {
    BAR, PIE, GRAPH, TIMELINE, TABLE, BIG_NUMBER,
    EVENTS, EVENTS_AMOUNT, SATISFACTION, SATISFACTION_AVERAGE, REVENUE, REVENUE_AVERAGE,
    PURCHASE, RETOUR, EMAIL, TALK, CALL,
    chartTypes, eventTypes, dataTypes
} from "../assets/types";
import { useDashboard } from "../context/DashboardContext";
import { translateEventNames } from "../utils";

/* Kleine Notiz an dich selber: Das Diagramm kann aktuell grad nicht ausgewählt werden,
 wahrschienlich weil die Gleichheit von String und Typ aus assets hier nicht richtig geprüft wird.
 Da warst du grade dran, großer :)
 Aber nur beim Erstellen neuer Widgets, beim Editieren von existierenden nicht... huh*/
/* Also used for editing, if a widget prop is passed */
const CreateWidgetMenu = ({ widget, addWidget, closeMenu }) => {
    const { createWidgetHere } = useDashboard();
    const toast = useToast();

    const [selectedDataType, setSelectedDataType] = useState();
    const [selectedChartType, setSelectedChartType] = useState(widget?.diagramType ?? undefined);
    const [selectedEventType, setSelectedEventType] = useState();
    const [name, setName] = useState("");

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

    const onCreate = async () => {
        const widget = await createWidgetHere(
            name,
            selectedChartType,
            (selectedDataType === EVENTS && selectedChartType === TABLE) ? translateEventNames(selectedEventType) : selectedDataType
        );

        addWidget(widget);
        closeMenu();

        toast({
            title: "Widget was created",
            duration: 2000,
            status: "success",
            isClosable: true
        });
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

                {/* EVENT SUBGROUP SELECTION */}
                {((selectedDataType === EVENTS && selectedChartType === TABLE) || selectedDataType === EVENTS_AMOUNT) ?
                    <MenuOptionGroup
                        title="Events"
                        type="radio"
                        value={selectedEventType}
                        onChange={(value) => setSelectedEventType(value)}
                        minWidth="200px"
                    >
                        {eventTypes.map((t) => (
                            <MenuItemOption key={t} value={t}>
                                {t[0].toUpperCase() + t.substring(1)}
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup> : <></>
                }
            </Flex>
            {(selectedChartType !== TABLE && selectedChartType) || (selectedEventType) ?
                <Flex
                    direction="row"
                    alignContent="center"
                    ml={6}
                    mt={2}
                    width="95%"
                    alignItems="center"
                >
                    <Heading size="sm" mr={2}>
                        Name:
                    </Heading>
                    <Input
                        size="sm"
                        mr={2}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Button
                        size="sm"
                        colorScheme="blue"
                        mr={2}
                        onClick={onCreate}
                    >
                        Create
                    </Button>
                </Flex> : <></>
            }
        </MenuList>
    );
};


export default CreateWidgetMenu;