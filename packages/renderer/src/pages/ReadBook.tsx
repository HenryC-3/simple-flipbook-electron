import {useRef} from 'react';
import Toolbar from '../components/Toolbar';
import BookShelf from '../components/BookShelf';
import styled from '@emotion/styled';
import {FlipBook} from '../components/FlipBook';
import {getBookBg, remoteTrigger} from '#preload';
import {useStore} from '../store';

const bookBg = await getBookBg();

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	gap: 20px;
	overflow: hidden;
	background: url(${bookBg});
`;

const StyledBookShelf = styled(BookShelf)`
	z-index: 100;
	position: absolute;
	left: 0;
`;

// TODO 解决滚动条问题
const StyledToolbar = styled(Toolbar)`
	z-index: 99;
	position: absolute;
	bottom: 0;
`;

const StyledFlipBook = styled(FlipBook)`
	height: 100vh;
`;

function ReadBook() {
	const {flippingTime} = useStore(state => state);
	// TODO 移除 reactPageFlip 中的 any
	const flipBookRef = useRef<any>(null);
	const nextButtonClick = () => {
		if (flipBookRef.current) flipBookRef.current.pageFlip().flipNext();
	};

	const prevButtonClick = () => {
		if (flipBookRef.current) flipBookRef.current.pageFlip().flipPrev();
	};

	remoteTrigger(message => {
		const {action, data} = JSON.parse(message);
		if (action === '上一页') prevButtonClick();
		if (action === '下一页') nextButtonClick();
	});

	return (
		<AppWrapper>
			<StyledBookShelf></StyledBookShelf>
			<FlipBook
				ref={flipBookRef}
				flippingTime={flippingTime}
			></FlipBook>
			{flipBookRef ? (
				<StyledToolbar
					flipBookRef={flipBookRef}
					nextButtonClick={nextButtonClick}
					prevButtonClick={prevButtonClick}
				></StyledToolbar>
			) : (
				''
			)}
		</AppWrapper>
	);
}

export default ReadBook;
