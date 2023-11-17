import HTMLFlipBook from 'react-pageflip';
import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {forwardRef} from 'react';
import {getImagePaths, getFirstImageWH} from '#preload';
import {useStore} from '../store';

const StyledFlipBook = styled(HTMLFlipBook)`
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
`;

// NOTE 只有 div 才能应用 shadow，img 不可以
const BookPageLeft = styled.div`
	border-right: 0;
	&::after {
		box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
		content: '';
		display: block;
		height: 100%;
		position: absolute;
		top: 0;
		width: 100%;
	}
`;

const BookPageRight = styled.div`
	&::after {
		box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);
		content: '';
		display: block;
		height: 100%;
		position: absolute;
		top: 0;
		width: 100%;
	}
`;
// TODO 设置图片宽高
const BookContent = styled.img<{width?: number; height?: number}>`
	height: 100%;
	width: 100%;
`;

const Modal = styled.div`
	position: absolute;
	/* background-color: red; */
	z-index: 98;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
`;

export const FlipBook = forwardRef<
	HTMLElement,
	{flippingTime?: number; width?: number; height?: number}
>(({}, ref) => {
	const [pages, setPages] = useState<string[]>();
	const {
		autoPlayMode,
		flippingTime,
		currentBookPath,
		currentBookHeight,
		currentBookWidth,
		reRenderFlag,
		updateWidth,
		updateFlag,
	} = useStore(state => state);
	// console.log('--------------component----------------');
	// console.log('FlipBook component');
	// console.log('reRenderFlag', reRenderFlag);
	// console.log('currentBookHeight', currentBookHeight);
	// console.log('currentBookWidth', currentBookWidth);
	// console.log('--------------component----------------');

	useEffect(() => {
		const getData = async () => {
			const pages = await getImagePaths(currentBookPath);
			const {height, width} = await getFirstImageWH(currentBookPath);
			setPages(pages);
			if (height && width) {
				updateWidth(((1080 * 0.9) / height) * width);
				// NOTE: 改变 width 之后必须强迫 reactPageFLip.HTMLFlipBook 重新渲染，否则数值不会生效
				updateFlag();
			}
			// console.log('--------------useEffect--------------------');
			// console.log('currentBookPath', currentBookPath);
			// console.log(`(${height} / 1080 / 0.9) * ${width}`);
			// //@ts-ignore
			// console.log('width', ((1080 * 0.9) / height) * width);
			// console.log('height', currentBookHeight);
			// console.log('--------------useEffect--------------------');
		};
		getData();
	}, [currentBookPath]);

	return currentBookWidth && currentBookHeight ? (
		// TODO 移除 ts-ignore
		// @ts-ignore
		<>
			{autoPlayMode ? <Modal></Modal> : ''}
			{autoPlayMode}
			<StyledFlipBook
				// NOTE 当书籍路径发生变化时，强迫翻书部分渲染
				key={reRenderFlag}
				width={currentBookWidth}
				height={currentBookHeight}
				// minHeight={currentBookHeight}
				// minWidth={currentBookWidth}
				// maxHeight={currentBookHeight * 2}
				// maxWidth={currentBookWidth * 2}
				flippingTime={flippingTime}
				showCover={false}
				ref={ref}
				// NOTE：设置为 stretch 后，书籍会自动填满容器
				size="stretch"
			>
				{/* BookContent */}
				{pages
					? pages.map((page, index) => {
							const isOdd = (index + 1) % 2 !== 0;
							if (isOdd) {
								return (
									// NOTE 规避 https://bobbyhafdz.com/blog/javascript-failed-to-execute-remove-child-on-node
									// NOTE 不能给 div 添加 key，给 dev 添加 key 后会立刻报错
									<div>
										<BookPageLeft>
											<BookContent
												src={page}
												alt=""
											/>
										</BookPageLeft>
									</div>
								);
							} else {
								return (
									<div>
										<BookPageRight>
											<BookContent
												src={page}
												alt=""
											/>
										</BookPageRight>
									</div>
								);
							}
					  })
					: ''}
			</StyledFlipBook>
		</>
	) : (
		''
	);
});
