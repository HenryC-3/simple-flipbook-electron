interface AppConfig {
	booksDir: string;
	homeBg: string;
	bookBg: string;
	configDir: string;
}
const devConfig: AppConfig = {
	booksDir: './config/books',
	// TODO: 识别 bg 文件夹下包含 home 的文件
	homeBg: './config/bgs/home.png',
	bookBg: './config/bgs/book.jpg',
	configDir: './config/config.json',
};

export function getAppConfig(): AppConfig {
	if (import.meta.env.DEV) {
		return devConfig;
	}

	return Object.keys(devConfig).reduce((acc, key) => {
		acc[key as keyof AppConfig] = '../../../.' + devConfig[key as keyof AppConfig];
		return acc;
	}, {} as AppConfig);
}
