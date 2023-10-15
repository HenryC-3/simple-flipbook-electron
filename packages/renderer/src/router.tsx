import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import {StartUp} from './pages/StartUp';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <StartUp></StartUp>,
	},
	{
		path: '/book',
		element: <App></App>,
	},
]);
