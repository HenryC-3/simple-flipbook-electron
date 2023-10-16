import {
	countImages,
	getFirstImageDataURL,
	getFullPaths,
	getImagesDataURL,
} from '../utils/fileSystem';
import {getAppConfig} from '../appConfig';
import {basename, join} from 'path';
import {lstatSync} from 'fs';

const dirPath = join(__dirname, getAppConfig().booksDir);

export async function getBooksInfo() {
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
			const cover = await getFirstImageDataURL(path); // 使用第一张图片作为书籍封面
			return {
				id: Number(id),
				name,
				path,
				cover,
			};
		});
	return Promise.all(res);
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
