import {create} from 'zustand';
import {getBooksPath, getBgsPath} from '#preload';

const bookPaths = await getBooksPath();
const bgPaths = await getBgsPath();

interface Store {
	bookPaths: string[];
	bgPaths: string[];
	currentBookPath: string;
	currentBookHeight: number;
	currentBookWidth: number;
	updatePath: (path: string) => void;
	updateHeight: (height: number) => void;
	updateWidth: (height: number) => void;
}

export const useStore = create<Store>()(set => ({
	bookPaths: bookPaths,
	bgPaths: bgPaths,
	currentBookPath: bookPaths[0],
	currentBookHeight: 1080 * 0.92,
	currentBookWidth: (1920 * 0.92) / 2,
	updatePath: (path: string) => {
		set(state => {
			return {
				currentBookPath: path,
			};
		});
	},
	updateHeight: (height: number) => {
		set(state => {
			return {
				currentBookHeight: height,
			};
		});
	},
	updateWidth: (width: number) => {
		set(state => {
			return {
				currentBookWidth: width,
			};
		});
	},
}));
