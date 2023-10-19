import type {ISizeCalculationResult} from 'image-size/dist/types/interface';

export interface BooksInfo {
	id: number;
	name: string;
	path: string;
	cover: string | undefined;
	dimension: ISizeCalculationResult;
}
