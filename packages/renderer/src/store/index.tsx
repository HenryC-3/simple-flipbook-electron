import {create} from 'zustand';
import {getBooksPath, getBgsPath} from '#preload';

const bookPaths = await getBooksPath();
const bgPaths = await getBgsPath();
interface Store {
	bookPaths: string[];
	bgPaths: string[];
	currentBookPath: string;
	updatePath: (path: string) => void;
}

export const useStore = create<Store>()(set => ({
	bookPaths: bookPaths,
	bgPaths: bgPaths,
	currentBookPath: bookPaths[0],
	updatePath: (path: string) => {
		set(state => {
			return {
				currentBookPath: path,
			};
		});
	},
}));
