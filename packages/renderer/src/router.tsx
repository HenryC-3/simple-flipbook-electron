import {createHashRouter} from 'react-router-dom';
import App from './App';
import {StartUp} from './pages/StartUp';

export const router = createHashRouter([
	{
		path: '/',
		element: <StartUp></StartUp>,
	},
	{
		path: '/book',
		element: <App></App>,
	},
]);
