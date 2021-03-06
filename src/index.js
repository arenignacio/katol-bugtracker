import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//#components
import App from './App';
import Dashboard from './views/Dashboard';
import MyProfile from './views/MyProfile';
import Projects from './views/Projects';
import Tickets from './views/Tickets';
import Settings from './views/Settings';
import './index.css';
import Modal from './components/Modal';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Dashboard />} />
					<Route path="projects" element={<Projects />} />
					<Route
						path="projects/new-project"
						element={
							<Modal
								options={{ saveHandler: () => {} }}
								mode="New Project"
							/>
						}
					/>
					<Route path="projects/:id" element={<Projects />} />
					<Route path="projects/:id/tickets/:tid" element={<Projects />} />
					<Route path="profile" element={<MyProfile />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="tickets" element={<Tickets />} />
					<Route path="settings" element={<Settings />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
