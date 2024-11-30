import { BrowserRouter } from "react-router-dom";
import Navigator from "./Navigator";
import { ChakraProvider } from '@chakra-ui/react'
import theme from "./theme";

function App() {
	return (
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<Navigator />
			</ChakraProvider>
		</BrowserRouter>
	);
}

export default App;
