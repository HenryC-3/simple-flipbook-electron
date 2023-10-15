interface AppConfig {
	booksDir: string;
	homeBg: string;
	bookBg: string;
	configDir: string;
}
const devConfig: AppConfig = {
	booksDir: './config/books',
	homeBg: './config/bgs/home.jpg',
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
