import {create} from 'zustand';
import {getBooksPath, getBgsPath, getAppBehaviorConfig} from '#preload';

const bookPaths = await getBooksPath();
const bgPaths = await getBgsPath();
const appConfig = await getAppBehaviorConfig();
type Timer = string | NodeJS.Timer;

interface Store {
	// 存储所有书籍的文件夹
	bookPaths: string[];
	// 背景文件所在路径
	bgPaths: string[];
	// 重渲染
	reRenderFlag: boolean;
	// 自动翻页模式
	autoPlayMode: boolean;
	// 当前书籍所在文件夹
	currentBookPath: string;
	// 翻页动画持续时间
	flippingTime: number;
	// 自动翻页间隔
	flipActionGap: number;
	// 关闭自动翻页
	autoSwipeTimer: Timer;
	currentBookHeight: number;
	currentBookWidth: number;
	updateAutoSwipeTimer: (timer: Timer) => void;
	updateAutoPlayMode: (enable: boolean) => void;
	updatePath: (path: string) => void;
	updateHeight: (height: number) => void;
	updateWidth: (height: number) => void;
	updateFlag: () => void;
}

export const useStore = create<Store>()(set => ({
	autoSwipeTimer: '',
	flippingTime: 1000,
	flipActionGap: 80000,
	bookPaths: bookPaths,
	bgPaths: bgPaths,
	currentBookPath: bookPaths[0],
	currentBookHeight: 1080 * 0.9,
	currentBookWidth: 1920 * 0.9,
	reRenderFlag: false,
	autoPlayMode: false,
	updateAutoSwipeTimer: (timer: Timer) => {
		set(state => {
			return {autoSwipeTimer: timer};
		});
	},
	updateAutoPlayMode: enable => {
		set(state => {
			return {autoPlayMode: enable};
		});
	},
	updatePath: (path: string) => {
		set(state => {
			// console.log('--------------state----------------');
			// console.log('previous state path', state.currentBookPath);
			// console.log('current state path', path);
			// console.log('--------------state----------------');
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
			// console.log('--------------state----------------');
			// console.log('previous state flag', state.reRenderFlag);
			// console.log('current state flag', !state.reRenderFlag);
			// console.log('--------------state----------------');
			return {
				reRenderFlag: !state.reRenderFlag,
			};
		});
	},
}));
