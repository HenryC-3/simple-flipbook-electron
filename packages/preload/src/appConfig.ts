export const appConfig = {
	booksDir: import.meta.env.DEV ? './config/books' : '../../../../config/books',
	bgsDir: import.meta.env.DEV ? './config/bgs' : '../../../../config/bgs',
	configDir: import.meta.env.DEV ? './config/config.json' : '../../../../config/.',
};
