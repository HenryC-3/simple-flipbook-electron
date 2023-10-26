import {join} from 'path';
import {getAppPathConfig} from '../appConfig';
import {encodeFromFile} from '@snailycad/image-data-uri';
import {getFullPaths} from '../utils/fileSystem';

export async function getHomeBg() {
	return await encodeFromFile(join(__dirname, getAppPathConfig().homeBg));
}

export async function getBookBg() {
	return await encodeFromFile(join(__dirname, getAppPathConfig().bookBg));
}

export async function getBgsPath() {
	const paths = await getFullPaths(join(__dirname, getAppPathConfig().bgDir));
	return paths.map(path => {
		return 'item://' + path;
	});
}
