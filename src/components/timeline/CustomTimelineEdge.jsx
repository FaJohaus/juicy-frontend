const CustomTimelineEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style = {},
    markerEnd,
}) => {
    const edgePath = `
    M ${sourceX},${sourceY} 
    L ${sourceX},${targetY} 
    L ${targetX},${targetY}
  `;

    return (
        <g className="react-flow__edge">
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
        </g>
    );
};

export default CustomTimelineEdge;
