import {useState} from 'react';
import {useRef} from 'react';
import Toolbar from './components/Toolbar';
import BookShelf from './components/BookShelf';
import styled from '@emotion/styled';
import {ExampleBookTwo} from './books/ExampleTwo';
import {getAppBgs} from '#preload';

const bookBg = await getAppBgs();

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	gap: 20px;
	overflow: hidden;
	background: url(${bookBg[0]});
`;

const StyledBookShelf = styled(BookShelf)`
	z-index: 99;
	position: absolute;
	left: 0;
`;

function App() {
	const [flippingTime] = useState(1000);
	// TODO 移除 reactPageFlip 中的 any
	const flipBookRef = useRef<any>(null);
	const nextButtonClick = () => {
		if (flipBookRef.current) flipBookRef.current.pageFlip().flipNext();
	};

	const prevButtonClick = () => {
		flipBookRef.current.pageFlip().flipPrev();
	};

	return (
		<AppWrapper>
			<StyledBookShelf></StyledBookShelf>
			<ExampleBookTwo
				ref={flipBookRef}
				flippingTime={flippingTime}
			></ExampleBookTwo>
			{flipBookRef ? (
				<Toolbar
					flipBookRef={flipBookRef}
					autoFlipTime={flippingTime}
					nextButtonClick={nextButtonClick}
					prevButtonClick={prevButtonClick}
				></Toolbar>
			) : (
				<></>
			)}
		</AppWrapper>
	);
}

export default App;
