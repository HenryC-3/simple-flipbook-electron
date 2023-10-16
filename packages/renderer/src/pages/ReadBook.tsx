import HTMLFlipBook from 'react-pageflip';
import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {forwardRef} from 'react';
import {getBookPageImages} from '#preload';
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
const BookContent = styled.img`
	height: 100%;
	width: 100%;
`;

export const ExampleBookTwo = forwardRef<
	HTMLElement,
	{flippingTime?: number; width?: number; height?: number}
>(({flippingTime = 1000, width = 395 * 1.75, height = 540 * 1.75}, ref) => {
	const [pages, setPages] = useState<string[]>();
	const {currentBookPath} = useStore(state => state);

	useEffect(() => {
		const getData = async () => {
			const data = await getBookPageImages(currentBookPath);
			setPages(data);
		};
		getData();
	}, [currentBookPath]);

	return (
		// BUG: React Router caught the following error during render DOMException: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.
		// TODO 移除 ts-ignore
		// @ts-ignore

		<StyledFlipBook
			// NOTE 当书籍路径发生变化时，强迫翻书部分渲染
			key={currentBookPath}
			width={width}
			height={height}
			flippingTime={flippingTime}
			showCover={false}
			ref={ref}
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
	);
});
