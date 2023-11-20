// TODO: 移动该页面到 main process，通过 ipc 从 main 获取配置信息
import {join} from 'path';

interface PathConfig {
	booksDir: string;
	bgDir: string;
	homeBg: string;
	bookBg: string;
	configDir: string;
}

interface BehaviorConfig {
	flippingTime?: number;
	flipActionGap?: number;
	toolbar?: boolean;
	toolbarTranslateY?: number;
}

const devPathConfig: PathConfig = {
	booksDir: './config/books',
	bgDir: './config/bgs',
	homeBg: './config/bgs/home.png',
	bookBg: './config/bgs/book.jpg',
	configDir: './config/config.json',
};

export function getAppPathConfig(): PathConfig {
	if (import.meta.env.DEV) {
		return devPathConfig;
	}

	const prodPathConfig = Object.keys(devPathConfig).reduce((acc, key) => {
		acc[key as keyof PathConfig] = '../../../.' + devPathConfig[key as keyof PathConfig];
		return acc;
	}, {} as PathConfig);

	return prodPathConfig;
}

export function getAppBehaviorConfig(): BehaviorConfig {
	const {configDir} = getAppPathConfig();
	return require(join(__dirname, configDir)) as BehaviorConfig;
}
