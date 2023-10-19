import {create} from 'zustand';
import {getBooksPath, getBgsPath} from '#preload';

const bookPaths = await getBooksPath();
const bgPaths = await getBgsPath();

interface Store {
	bookPaths: string[];
	bgPaths: string[];
	reRenderFlag: boolean;
	currentBookPath: string;
	currentBookHeight: number;
	currentBookWidth: number;
	updatePath: (path: string) => void;
	updateHeight: (height: number) => void;
	updateWidth: (height: number) => void;
	updateFlag: () => void;
}

export const useStore = create<Store>()(set => ({
	bookPaths: bookPaths,
	bgPaths: bgPaths,
	currentBookPath: bookPaths[0],
	currentBookHeight: 1080 * 0.9,
	currentBookWidth: 1920 * 0.9,
	reRenderFlag: false,
	updatePath: (path: string) => {
		set(state => {
			console.log('--------------state----------------');
			console.log('previous state path', state.currentBookPath);
			console.log('current state path', path);
			console.log('--------------state----------------');
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
	updateFlag: () => {
		set(state => {
			console.log('--------------state----------------');
			console.log('previous state flag', state.reRenderFlag);
			console.log('current state flag', !state.reRenderFlag);
			console.log('--------------state----------------');
			return {
				reRenderFlag: !state.reRenderFlag,
			};
		});
	},
}));
