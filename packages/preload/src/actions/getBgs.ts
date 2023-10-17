import {join} from 'path';
import {getAppConfig} from '../appConfig';
import {encodeFromFile} from '@snailycad/image-data-uri';
import {getFullPaths} from '../utils/fileSystem';

export async function getHomeBg() {
	return await encodeFromFile(join(__dirname, getAppConfig().homeBg));
}

export async function getBookBg() {
	return await encodeFromFile(join(__dirname, getAppConfig().bookBg));
}

export async function getBgsPath() {
	const paths = await getFullPaths(join(__dirname, getAppConfig().bgDir));
	return paths.map(path => {
		console.log(path);
		return 'item://' + path;
	});
}
