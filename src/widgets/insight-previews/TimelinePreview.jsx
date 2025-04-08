import { useEffect, useState, useRef } from 'react';
import { ReactFlow, useNodesState, useEdgesState, useReactFlow, ReactFlowProvider, PanOnScrollMode, useViewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, Slider, SliderTrack, SliderThumb, Center } from '@chakra-ui/react';
import { useTheme, Select } from '@chakra-ui/react';
import PreviewCard from "./PreviewCard";
import { MailNode, CallNode, PurchaseNode, RetourNode, VisitNode } from '../../components/timeline/CustomTimelineNode';
import CustomTimelineEdge from '../../components/timeline/CustomTimelineEdge';
import { transformTimeLineData as transformData } from '../../utils/timeline';
import { useDashboard } from '../../context/DashboardContext';

/* TBD:
    - Entscheiden, ob es immer doubleheight, vllt. sogar triplewidth sein soll oder erst dynamisch wenn Graph zu groß wird
    - Wenn komplette Graoh in view passt immer fitView, wenn zu groß die Scrollbar einblenden und horizontal scroll aktivieren
    - Datum in Timeline irgendwo zentraler genau rendern. villeicht immer so "Steps" für die Main Events
    - y: 20 noch iwie setzen, damit man die Labels der Main Nodes sieht

    Wenn der Baum maximal Teife 4 hat macht doubleHeight eigentlich keinen Sinn...
*/
const TimelinePreview = ({ title, data, customer, setCustomer }) => {
    const { widget } = useTheme();
    const { dashboardCustomers } = useDashboard();

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const nodeTypes = {
        "mail": MailNode,
        "call": CallNode,
        "purchase": PurchaseNode,
        "retour": RetourNode,
        "visit": VisitNode
    };

    const edgeTypes = {
        stepBro: CustomTimelineEdge
    }

    const fitViewOptions = {
        minZoom: 1,
    };

    useEffect(() => {
        const { nodes, edges } = transformData(data);

        setNodes(nodes);
        setEdges(edges);
    }, [data]);

    const ScrollableFlow = (props) => {
        const { fitView, setViewport, getNodesBounds, getNodes } = useReactFlow();
        const { x } = useViewport();

        const [slider, setSlider] = useState(x);
        const [containerWidth, setContainerWidth] = useState(0);

        const containerRef = useRef(null);

        const { width } = getNodesBounds(getNodes());

        const PADDINGX = 30;

        const rightBound = -(width - containerWidth + PADDINGX);

        useEffect(() => {
            const observer = new ResizeObserver(e => {
                setContainerWidth(e[0].contentRect.width);
            });

            observer.observe(containerRef?.current);

            return () => observer.disconnect();
        }, []);

        // To adjust the slider when the user scrolls the viewport
        useEffect(() => {
            if (x > PADDINGX) {
                if (x !== PADDINGX) setViewport({ x: PADDINGX });
            } else if (x < rightBound) {
                if (x !== rightBound) setViewport({ x: rightBound });
            } else {
                setSlider(x);
            }
        }, [x]);

        return (
            <>
                <ReactFlow {...props} ref={containerRef} panOnScroll={width + 50 > containerWidth} />
                {(width + 50 > containerWidth) && (
                    <Center>
                        <Slider
                            focusThumbOnChange={false}
                            value={slider}
                            variant="ghost"
                            onChange={(val) => setViewport({ x: val })}
                            isReversed
                            min={rightBound}
                            max={PADDINGX}
                            width={400}
                        >
                            <SliderTrack backgroundColor="gray.300" />
                            <SliderThumb backgroundColor="gray.500" />
                        </Slider>
                    </Center>
                )}
            </>
        );
    };

    const getCustomerDropdown = () => {
        return (
            <Select
                size="sm"
                width="300px"
                mr={2}
                variant="filled"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
            >
                {dashboardCustomers.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </Select>
        );
    }

    return (
        <PreviewCard title={title} doubleWidth additionalFooter={getCustomerDropdown}>
            <Box
                width="100vw"
                minWidth={widget.baseMinWidth * 2}
                height={widget.baseHeight - 80}
                m={-4}
            >
                <ReactFlowProvider>
                    <ScrollableFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        proOptions={{ hideAttribution: true }}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        fitView
                        fitViewOptions={fitViewOptions}
                        /* ------------------ */
                        panOnScrollMode={PanOnScrollMode.Horizontal}
                        panOnDrag={false}
                        zoomOnScroll={false}
                        zoomOnPinch={false}
                        zoomOnDoubleClick={false}
                        elementsSelectable={false}
                        edgesFocusable={false}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        nodesFocusable={false}
                        draggable={false}
                    />
                </ReactFlowProvider>
            </Box>
        </PreviewCard>
    );
}

export default TimelinePreview;