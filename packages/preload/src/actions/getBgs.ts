import {join} from 'path';
import {getAppConfig} from '../appConfig';
import {encodeFromFile} from '@snailycad/image-data-uri';

export async function getHomeBg() {
	return await encodeFromFile(join(__dirname, getAppConfig().homeBg));
}

export async function getBookBg() {
	return await encodeFromFile(join(__dirname, getAppConfig().bookBg));
}
