import {join} from 'path';
import {appConfig} from '../appConfig';
import {getImages} from '../utils/fileSystem';

const dirPath = join(__dirname, appConfig.bgsDir);

export async function getBookBg() {
	return await getImages(dirPath);
}
