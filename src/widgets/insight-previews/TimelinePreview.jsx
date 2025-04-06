import { useEffect, useState, useRef } from 'react';
import { ReactFlow, useNodesState, useEdgesState, useReactFlow, ReactFlowProvider, PanOnScrollMode, useViewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, Slider, SliderTrack, SliderThumb, Center } from '@chakra-ui/react';
import { useTheme, Select } from '@chakra-ui/react';
import PreviewCard from "./PreviewCard";
import { MailNode, CallNode, PurchaseNode, RetourNode, VisitNode } from '../../components/timeline/CustomTimelineNode';
import CustomTimelineEdge from '../../components/timeline/CustomTimelineEdge';
import { transformTimeLineData as transformData } from '../../utils/timeline';

/* TBD:
    - Entscheiden, ob es immer doubleheight, vllt. sogar triplewidth sein soll oder erst dynamisch wenn Graph zu groß wird
    - Wenn komplette Graoh in view passt immer fitView, wenn zu groß die Scrollbar einblenden und horizontal scroll aktivieren
    - Datum in Timeline irgendwo zentraler genau rendern. villeicht immer so "Steps" für die Main Events
    - y: 20 noch iwie setzen, damit man die Labels der Main Nodes sieht

    Wenn der Baum maximal Teife 4 hat macht doubleHeight eigentlich keinen Sinn...
*/
const TimelinePreview = ({ title, data }) => {
    const { widget } = useTheme();

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

        /* useEffect(() => {
            const onResize = () => fitView(fitViewOptions);

            window.addEventListener('resize', onResize);

            return () => window.removeEventListener('resize', onResize);
        }, []); */


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
                <ReactFlow {...props} ref={containerRef} panOnScroll={width > containerWidth} />
                {(width > containerWidth) && (
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
    /* TBD: Set Bounds for horizontal scroll */

    return (
        <PreviewCard title={title} doubleWidth /* doubleHeight */>
            <Box
                width="100vw"
                minWidth={widget.baseMinWidth * 2}
                height={widget.baseHeight /* * 2  */ - 80}
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
                {/* <Box position="relative" overflow="visible">
                    <Select
                        size="sm"
                        width="300px"
                        mr={2}
                        variant="filled"
                        zIndex={10}
                        position="absolute"
                    ></Select>
                </Box> */}
            </Box>
        </PreviewCard>
    );
}

export default TimelinePreview;