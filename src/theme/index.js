import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        lime: {
            200: "#ebf779",
            400: "#c2e801",
        },
    },
    widget: {
        baseHeight: 310,
        baseMinWidth: 360,
    }
});

export default theme;