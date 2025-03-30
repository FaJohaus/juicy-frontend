import PreviewCard from "./PreviewCard";
import { getWidget } from "../../actions/widgets";
import { useEffect, useState } from "react";

/**
 * Takes a widget id, fetches its data and renders the right preview componenet based on its widget-type
 */
const PreviewWrapper = ({ id }) => {
    const [widget, setWidget] = useState();

    useEffect(() => {
        const fetchWidget = async () => {
            try {
                const data = await getWidget(id);

                setWidget(data);
            } catch (e) {
                console.error(`Error fetching widget ${id}:`, e);
            }
        }

        fetchWidget();
    }, [id]);

    return (
        <PreviewCard title={widget?.name ?? ""}>
            <div>
                {!widget ? "loading..." : widget?.diagramType}
            </div>
        </PreviewCard>
    );
}

export default PreviewWrapper;