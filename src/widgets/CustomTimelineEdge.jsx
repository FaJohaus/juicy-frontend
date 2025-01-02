const CustomTimelineEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style = {},
    markerEnd,
}) => {
    const verticalMid = (sourceY + targetY) / 2;

    const edgePath = `
    M ${sourceX},${sourceY} 
    L ${sourceX},${verticalMid} 
    L ${targetX},${verticalMid} 
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
