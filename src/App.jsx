import { BrowserRouter } from "react-router-dom";
import Navigator from "./Navigator";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
	return (
		<BrowserRouter>
			<ChakraProvider>
				<Navigator />
			</ChakraProvider>
		</BrowserRouter>
	);
}

export default App;
