import Router from '../routes/tickets.routes';

const { BrowserRouter } = require('react-router-dom');

const App = () => {
	return (
		<div>
			<h1>This is App. test</h1>
			<BrowserRouter>
				<Router></Router>
			</BrowserRouter>
		</div>
	);
};

export default App;
