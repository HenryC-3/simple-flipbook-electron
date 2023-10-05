import {readdir, readFile} from 'fs/promises';
import {join, extname} from 'path';

/**
 * @description 获取书页文件夹下的所有图片文件的 dataURL
 */
export async function getImages(dirPath: string) {
	// dirPath = import.meta.env.DEV ? join(__dirname, './pages') : join(__dirname, '../public/pages');
	const filePaths = await getFullPaths(dirPath);
	const images = [];

	for (const filePath of filePaths) {
		if (isImageFile(filePath)) {
			try {
				const fileContent = await readFile(filePath);
				images.push({
					path: filePath,
					content: fileContent,
				});
			} catch (err) {
				console.error('无法读取文件:', filePath, err);
			}
		}
	}
	return images.map(image => bufferToDataUrl(image.content));

	function bufferToDataUrl(buffer: Buffer) {
		const base64Str = buffer.toString('base64');
		return 'data:image/jpeg;base64,' + base64Str;
	}
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

export function isImageFile(filePath: string) {
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
	const extension = extname(filePath).toLowerCase();
	return imageExtensions.includes(extension);
}
