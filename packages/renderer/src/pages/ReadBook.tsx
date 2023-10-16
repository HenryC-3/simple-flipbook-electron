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
		console.log('book start update');
		console.log('currentBookPath', currentBookPath);
		const getData = async () => {
			const data = await getBookPageImages(currentBookPath);
			console.log('data', data);
			setPages(data);
		};
		getData();
	}, [currentBookPath]);

	return (
		// BUG: React Router caught the following error during render DOMException: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.
		// TODO 移除 ts-ignore
		// @ts-ignore
		<HTMLFlipBook
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
								<BookPageLeft key={index}>
									<BookContent
										src={page}
										alt=""
									/>
								</BookPageLeft>
							);
						} else {
							return (
								<BookPageRight key={page}>
									<BookContent
										src={page}
										alt=""
									/>
								</BookPageRight>
							);
						}
				  })
				: ''}
		</HTMLFlipBook>
	);
});
