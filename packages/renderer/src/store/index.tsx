import {create} from 'zustand';
import {getBooksPath} from '#preload';

const paths = await getBooksPath();
interface Store {
	bookPaths: string[];
	currentBookPath: string;
	updatePath: (path: string) => void;
}

export const useStore = create<Store>()(set => ({
	bookPaths: paths,
	currentBookPath: paths[0],
	updatePath: (path: string) => {
		set(state => {
			return {
				currentBookPath: path,
			};
		});
	},
}));
