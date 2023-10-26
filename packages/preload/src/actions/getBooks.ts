import {
	countImages,
	getFirstImageURL,
	getFirstImageWH,
	getFullPaths,
	getImagesDataURL,
	isImageFile,
} from '../utils/fileSystem';
import {getAppPathConfig} from '../appConfig';
import {basename, join} from 'path';
import {lstatSync, existsSync} from 'fs';
import type {BooksInfo} from '../types';

const dirPath = join(__dirname, getAppPathConfig().booksDir);

export async function getBooksInfo(): Promise<BooksInfo[]> {
	const booksPath = await getBooksPath();
	const res = booksPath
		.filter(path => {
			// 过滤不符合命名规范的文件夹
			const [id, name] = basename(path).split('-');
			if (Number(id) && name) {
				return true;
			}
			// TODO 使用弹窗提示用户
			console.log(`文件夹 ${path}\n未按照要求命名，命名规范为：数字-书籍名`);
		})
		.map(async path => {
			const [id, name] = basename(path).split('-');
			const cover = await getCover(path);
			const dimension = await getFirstImageWH(path);
			return {
				id: Number(id),
				name,
				path,
				cover,
				dimension,
			};
		});
	return Promise.all(res);

	async function getCover(path: string) {
		const cover = await getFirstImageURL(path); // 使用第一张图片作为书籍封面
		const coverInFolder = existsSync(join(path, './cover'))
			? await getFirstImageURL(join(path, './cover'))
			: '';

		console.log('coverInFolder', coverInFolder);
		console.log('cover', cover);

		return coverInFolder ? coverInFolder : cover;
	}
}

export async function getBooksPath() {
	const paths = await getFullPaths(dirPath);
	const bookPaths = paths.filter(path => {
		const info = lstatSync(path);
		return !path.includes('.DS_Store') || info.isDirectory();
	});
	return bookPaths;
}

export async function getBookPageImages(dirPath: string) {
	const images = await getImagesDataURL(dirPath);
	return images;
}

// TODO: 重构合并入 getBookInfo 里
export async function countBookPageNum(dirPath: string) {
	const num = await countImages(dirPath);
	return num;
}

export async function getImagePaths(dirPath: string) {
	// dirPath = import.meta.env.DEV ? join(__dirname, './pages') : join(__dirname, '../public/pages');
	const filePaths = await getFullPaths(dirPath);
	return filePaths.filter(isImageFile).map(path => {
		return 'item://' + path;
	});
}
