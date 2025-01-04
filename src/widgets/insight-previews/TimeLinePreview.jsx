import { useEffect } from 'react';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import PreviewCard from "./PreviewCard";
import { MailNode, CallNode, PurchaseNode, RetourNode, VisitNode } from '../../components/timeline/CustomTimelineNode';
import CustomTimelineEdge from '../../components/timeline/CustomTimelineEdge';
import { transformTimeLineData as transformData } from '../../utils/timeline';

/* Je nach Tiefe des Baums vllt. auch doubleheight-widget draus machen? */
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

    useEffect(() => {
        const { nodes, edges } = transformData(data);

        setNodes(nodes);
        setEdges(edges);
    }, [data]);

    return (
        <PreviewCard title={title} doubleWidth doubleHeight>
            <Box
                width="100vw"
                minWidth={widget.baseMinWidth * 2 - 10}
                height={widget.baseHeight * 2 - 80}
                mt={-2}
                mx={-3}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    proOptions={{ hideAttribution: true }}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
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
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </Box>
        </PreviewCard>
    );
}

export default TimeLinePreview;