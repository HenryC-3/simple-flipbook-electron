import {countImages, getImages} from '../utils/fileSystem';
import {appConfig} from '../appConfig';
import {join} from 'path';

const dirPath = join(__dirname, appConfig.pagesDir);

export async function getBookPageImages() {
	const images = await getImages(dirPath);
	return images;
}

export async function countBookPageNum() {
	const num = await countImages(dirPath);
	return num;
}
