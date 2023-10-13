import {join} from 'path';
import {appConfig} from '../appConfig';
import {getImagesDataURL} from '../utils/fileSystem';

const dirPath = join(__dirname, appConfig.bgsDir);

export async function getAppBgs() {
	return await getImagesDataURL(dirPath);
}
