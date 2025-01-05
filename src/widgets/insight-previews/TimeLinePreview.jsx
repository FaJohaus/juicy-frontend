import { useEffect } from 'react';
import { ReactFlow, useNodesState, useEdgesState, useReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import PreviewCard from "./PreviewCard";
import { MailNode, CallNode, PurchaseNode, RetourNode, VisitNode } from '../../components/timeline/CustomTimelineNode';
import CustomTimelineEdge from '../../components/timeline/CustomTimelineEdge';
import { transformTimeLineData as transformData } from '../../utils/timeline';

/* TBD:
    - Minimale Zoomstufe definieren, wo ab da einfach das Ding entweder horizontal scrollbar wird oder nur das Ende der Timeline anzeigt
    - Entscheiden, ob es immer doubleheight, vllt. sogar triplewidth sein soll oder erst dynamisch wenn Graoh zu groß wird
    - Wenn Graph sehr klein zoome etwas raus, um die Lables der oberen Reihe zu sehen
    => Vieles sollte sehr entspannt über die fitViewOptions gehen :)
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
        minZoom: 1
    };

    useEffect(() => {
        const { nodes, edges } = transformData(data);

        setNodes(nodes);
        setEdges(edges);
    }, [data]);

    const Flow = (props) => {
        const reactFlow = useReactFlow();

        useEffect(() => {
            const onResize = () => reactFlow.fitView(fitViewOptions);

            window.addEventListener('resize', onResize);

            return () => window.removeEventListener('resize', onResize);
        }, []);

        return <ReactFlow {...props} />;
    };


    return (
        <PreviewCard title={title} doubleWidth /* doubleHeight */>
            <Box
                width="100vw"
                minWidth={widget.baseMinWidth * 2 - 10}
                height={widget.baseHeight /* * 2 */ - 80}
                mt={-2}
                mx={-3}
            >
                <ReactFlowProvider>
                    <Flow
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
                        panOnDrag={false}
                        zoomOnScroll={false}
                        zoomOnPinch={false}
                        zoomOnDoubleClick={false}
                        panOnScroll={false}
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