import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        lime: {
            200: "#ebf779",
            400: "#c2e801",
        },
    },
    widgets: {
        baseHeight: 300,
        baseMinWidth: 360,
    }
});

export default theme;