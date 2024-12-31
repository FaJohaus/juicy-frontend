import { useState, useEffect } from 'react';
import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import PreviewCard from "./PreviewCard";
import { MailNode, CallNode, PurchaseNode, RetourNode, VisitNode } from '../CustomTimelineNode';

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

    /* const nodes = [
        { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: "mail" },
        { id: '2', position: { x: 75, y: 0 }, data: { label: '2' }, type: "call" },
        { id: '3', position: { x: 20, y: 50 }, data: { label: '3' }, type: "purchase" },
        { id: '4', position: { x: 150, y: 0 }, data: { label: '3' }, type: "retour" },
        { id: '5', position: { x: 50, y: 100 }, data: { label: '3' }, type: "visit" },
    ];

    const edges = [
        { id: 'e1-2', source: '1', target: '2', type: 'straight' },
        { id: 'someshitidk', source: '1', target: '3', type: 'straight' }
    ]; */

    /* Expects a sorted array, where each event is followed by all it's subevents and than it's nextevents
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
                    type: 'straight'
                });
            };

            if (n.nextevent) {
                edges.push({
                    id: n._id + n.nextevent,
                    source: n._id,
                    target: n.nextevent,
                    type: 'straight'
                });
            };


            x += 60;
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
                </ReactFlow>
            </Box>
        </PreviewCard>
    );
}

export default TimeLinePreview;