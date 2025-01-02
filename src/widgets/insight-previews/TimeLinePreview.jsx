import { useState, useEffect } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import PreviewCard from "./PreviewCard";
import { MailNode, CallNode, PurchaseNode, RetourNode, VisitNode } from '../CustomTimelineNode';
import CustomTimelineEdge from '../CustomTimelineEdge';

/* Je nach Tiefe des Baums vllt. auch doubleheight-widget draus machen? */
const TimeLinePreview = ({ title, data }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

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

    /* Expects a sorted array, where each event is followed by all it's subevents and then it's nextevents
    If the Array is not sorted, just sort it beforehand
    */
    const transformData = () => {
        let x = 0;
        let y = 0;

        const edges = [];
        const nodes = data.map(n => {
            const node = {
                id: n._id,
                position: {
                    x: x,
                    y: y
                },
                data: { label: n._id },
                type: n.type,
            };

            if (n.subevent) {
                edges.push({
                    id: n._id + n.subevent,
                    source: n._id,
                    target: n.subevent,
                    type: 'stepBro',
                    sourceHandle: 'bottom',
                    targetHandle: 'top',
                    style: {
                        strokeWidth: 2,
                        stroke: "black"
                    }
                });
            };

            if (n.nextevent) {
                edges.push({
                    id: n._id + n.nextevent,
                    source: n._id,
                    target: n.nextevent,
                    type: 'straight',
                    sourceHandle: 'right',
                    targetHandle: 'left',
                    style: {
                        strokeWidth: 2,
                        stroke: "black"
                    }
                });
            };


            x += n.subevent ? 25 : 60;
            y = n.subevent ? y + 50 : 0;

            return node;
        });

        setNodes(nodes);
        setEdges(edges);
    };

    useEffect(() => {
        transformData();
    }, []);

    return (
        <PreviewCard title={title} doubleWidth>
            <Box
                width="100vw"
                minWidth={widget.baseMinWidth * 2 - 10}
                height={widget.baseHeight - 80}
                mt={-2}
                mx={-3}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    proOptions={{ hideAttribution: true }}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    /* fitView */
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