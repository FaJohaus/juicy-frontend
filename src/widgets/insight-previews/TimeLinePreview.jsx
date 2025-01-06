import { useEffect, useState } from 'react';
import { ReactFlow, useNodesState, useEdgesState, useReactFlow, ReactFlowProvider, PanOnScrollMode, useViewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, Slider, SliderTrack, SliderThumb, Center } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import PreviewCard from "./PreviewCard";
import { MailNode, CallNode, PurchaseNode, RetourNode, VisitNode } from '../../components/timeline/CustomTimelineNode';
import CustomTimelineEdge from '../../components/timeline/CustomTimelineEdge';
import { transformTimeLineData as transformData } from '../../utils/timeline';

/* TBD:
    - Minimale Zoomstufe definieren, wo ab da einfach das Ding entweder horizontal scrollbar wird oder nur das Ende der Timeline anzeigt
    - Entscheiden, ob es immer doubleheight, vllt. sogar triplewidth sein soll oder erst dynamisch wenn Graph zu groß wird
    - Wenn Graph sehr klein zoome etwas raus, um die Lables der oberen Reihe zu sehen
    => Vieles sollte sehr entspannt über die fitViewOptions gehen :)

    Kannst vllt. versuchen mit setViewport und getViewportForBounds ne eigene horizontale Scrollbar zu bauen
    Oder setze das ganze einfach als child von ner unsichbaren Box mit overflowX="auto"
    und setze dann die größe des ReactFlows auf "volles Brett"

    Wenn der Baum maximal Teife 4 hat macht doubleHeight eigentlich keinen Sinn...
*/
const TimeLinePreview = ({ title, data }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { widget } = useTheme();

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

        /* useEffect(() => {
            const onResize = () => fitView(fitViewOptions);

            window.addEventListener('resize', onResize);

            return () => window.removeEventListener('resize', onResize);
        }, []); */

        const { width } = getNodesBounds(getNodes());

        // To adjust the slider when the user scrolls the viewport
        useEffect(() => {
            setSlider(x);
            console.log(x);
        }, [x])

        return (
            <>
                <ReactFlow {...props} />
                <Center>
                    <Slider
                        focusThumbOnChange={false}
                        value={slider}
                        variant="ghost"
                        onChange={(val) => setViewport({ x: val })}
                        isReversed
                        min={-(width - widget.baseMinWidth * 2)}
                        max={10}
                        width={400}
                    >
                        <SliderTrack />
                        <SliderThumb />
                    </Slider>
                </Center>
            </>
        );
    };
    /* TBD: Set Bounds for horizontal scroll */

    return (
        <PreviewCard title={title} doubleWidth /* doubleHeight */>
            <Box
                width="100vw"
                minWidth={widget.baseMinWidth * 2}
                height={widget.baseHeight /* * 2 */ - 80}
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
                        panOnScroll={true}
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

export default TimeLinePreview;