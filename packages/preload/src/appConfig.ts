export const appConfig = {
	pagesDir: import.meta.env.DEV ? './config/pages' : '../../../../config/pages',
	bgsDir: import.meta.env.DEV ? './config/bgs' : '../../../../config/bgs',
	configDir: import.meta.env.DEV ? './config/config.json' : '../../../../config/.',
};
