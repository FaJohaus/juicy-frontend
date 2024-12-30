import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import PreviewCard from "./PreviewCard";
import { Box } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';

/* Je nach Tiefe des Baums vllt. auch doubleheight-widget draus machen? */
const TimeLinePreview = ({ title }) => {
    const { widget } = useTheme();

    const nodes = [
        { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
        { id: '2', position: { x: 20, y: 100 }, data: { label: '2' } },
    ];
    const edges = [
        { id: 'e1-2', source: '1', target: '2' }
    ];

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
                    panOnDrag={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    panOnScroll={false}
                    elementsSelectable={false}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </Box>
        </PreviewCard>
    );
}

export default TimeLinePreview;