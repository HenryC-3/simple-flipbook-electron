import {create} from 'zustand';
import {getBooksPath, getBgsPath, getAppBehaviorConfig, countBookPageNum} from '#preload';
type Timer = string | NodeJS.Timer;

const currentBookPaths = await getBooksPath();
const currentBookPageCount = await countBookPageNum(currentBookPaths[0]);
const bgPaths = await getBgsPath();
const appConfig = await getAppBehaviorConfig();

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
	// 是否自动翻阅翻到了最后一页
	isFlipToLastPage: boolean;
	// currentBookPageCount: number;
	// 翻页动画持续时间
	flippingTime: number;
	// 自动翻页间隔
	flipActionGap: number;
	// 关闭自动翻页
	autoSwipeTimer: Timer;
	currentBookHeight: number;
	currentBookWidth: number;
	updateIsFlipToLastPage: (status: boolean) => void;
	updateAutoSwipeTimer: (timer: Timer) => void;
	updateAutoPlayMode: (enable: boolean) => void;
	updateCurrentBookPath: (path: string) => void;
	updateHeight: (height: number) => void;
	updateWidth: (height: number) => void;
	updateFlag: () => void;
}

export const useStore = create<Store>()((set, get) => ({
	autoSwipeTimer: '',
	isFlipToLastPage: false,
	flippingTime: 1000,
	flipActionGap: 2000,
	bookPaths: currentBookPaths,
	bgPaths: bgPaths,
	currentBookPath: currentBookPaths[0],
	currentBookHeight: 1080 * 0.9,
	currentBookWidth: 1920 * 0.9,
	reRenderFlag: false,
	autoPlayMode: false,
	updateIsFlipToLastPage(status) {
		clearInterval(get().autoSwipeTimer);
		set(state => {
			return {isFlipToLastPage: status};
		});
	},
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
	updateCurrentBookPath: (path: string) => {
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
