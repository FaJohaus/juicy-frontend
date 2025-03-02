import { BrowserRouter } from "react-router-dom";
import Navigator from "./Navigator";
import { ChakraProvider } from '@chakra-ui/react'
import theme from "./theme";
import { UserProvider } from "./context/UserContext";

function App() {
	return (
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<UserProvider>
					<Navigator />
				</UserProvider>
			</ChakraProvider>
		</BrowserRouter>
	);
}

export default App;
