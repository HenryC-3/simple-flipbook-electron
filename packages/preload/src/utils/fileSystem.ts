import {encodeFromFile} from '@snailycad/image-data-uri';
import {readdir} from 'fs/promises';
import {join, extname} from 'path';
import sizeOf from 'image-size';

/**
 * @description 获取书页文件夹下的所有图片文件的 dataURL
 */
export async function getImagesDataURL(dirPath: string) {
	// dirPath = import.meta.env.DEV ? join(__dirname, './pages') : join(__dirname, '../public/pages');
	const filePaths = await getFullPaths(dirPath);
	const imageDataURLs = [];

	for (const filePath of filePaths) {
		if (isImageFile(filePath)) {
			try {
				const url = await encodeFromFile(filePath);
				imageDataURLs.push(url);
			} catch (err) {
				console.error('无法读取文件:', filePath, err);
			}
		}
	}
	return imageDataURLs;
}

/**
 * @description 获取书页文件夹下的图片数量
 */
export async function countImages(dirPath: string) {
	const filePaths = (await getFullPaths(dirPath)).filter(isImageFile);
	return filePaths.length;
}

export async function getFullPaths(dirPath: string) {
	const files = await readdir(dirPath);
	const filePaths = files.map(file => join(dirPath, file));
	return filePaths;
}

export async function getFirstImageURL(dirPath: string) {
	const filePaths = (await getFullPaths(dirPath)).filter(isImageFile);
	return filePaths[0] ? 'item://' + filePaths[0] : undefined;
}

export async function getFirstImageWH(dirPath: string) {
	const filePaths = (await getFullPaths(dirPath)).filter(isImageFile);
	return sizeOf(filePaths[1]);
}

export function isImageFile(filePath: string) {
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
	const extension = extname(filePath).toLowerCase();
	return imageExtensions.includes(extension);
}
