import { truncateText } from ".";

/**
 * Transforms the data for the timeline widget and insight for reactflow
 * Expects a sorted array, where each event is followed by all it's subevents and then it's nextevents 
 * If the Array is not sorted, just sort it beforehand :)
 * @param {*} data initial data
 * @returns the transforemd nodes and edges for reactflow
 */
export const transformTimeLineData = (data) => {
    let x = 0;
    let y = 0;

    const edges = [];
    const nodes = [];

    const translateNames = (name) => {
        switch (name) {
            case "TalkEvent":
                return "visit"
            case "EmailEvent":
                return "mail"
            case "CallEvent":
                return "call"
            case "KaufEvent":
            case "Kauf":
                return "purchase"
            case "RetourEvent":
                return "retour"
            case "StornoEvent":
                return "retour"
            default:
                return null
        }
    }

    data.forEach(n => {
        nodes.push({
            id: n._id,
            position: {
                x: x,
                y: y
            },
            data: {
                label: `Rating: ${n.rating ?? "?"}`,
                date: n.Date.substring(0, 10),
                hasNext: !!n.nextevent,
                hasPrev: !!n.previousevent,
                hasSub: !!n.subevent,
                hasMain: !!y
            },
            type: translateNames(n.__t),
        });

        if (n.subevent) {
            edges.push({
                id: n._id + n.subevent,
                source: n._id,
                target: n.subevent,
                type: 'stepBro',
                sourceHandle: 'bottom',
                targetHandle: 'left',
                markerEnd: {
                    type: "arrow",
                    strokeWidth: 2,
                    color: "black"
                },
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
                markerEnd: {
                    type: "arrow",
                    strokeWidth: 2,
                    color: "black"
                },
                style: {
                    strokeWidth: 2,
                    stroke: "black"
                }
            });
        };

        x += n.subevent ? 35 : 80;
        y = n.subevent ? y + 60 : 0;
    });

    return { nodes, edges };
};