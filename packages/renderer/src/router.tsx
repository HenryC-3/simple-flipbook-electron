import {createHashRouter} from 'react-router-dom';
import ReadBook from './pages/ReadBook';
import {StartUp} from './pages/StartUp';

export const router = createHashRouter([
	{
		path: '/',
		element: <StartUp></StartUp>,
	},
	{
		path: '/book',
		element: <ReadBook></ReadBook>,
	},
]);
