// 使用 material drawer 组件重构当前页面
import styled from '@emotion/styled';
import {getBookShelfConfig} from '../configs';
import {useState} from 'react';
import {getBooksInfo} from '#preload';

const booksInfo = await getBooksInfo();

interface BookShelfProps {
	className?: string;
}

const bookShelfConfig = getBookShelfConfig();
const {shelfDraggerBackground, shelfFrameBackground} = bookShelfConfig.theme.steel;
const {shelfMinWidth, shelfMaxWidth, shelfHeight, bookHeight, bookWidth} =
	bookShelfConfig.parameters;

const Wrapper = styled.div<{isOpen: boolean}>`
	transform: ${props => (props.isOpen ? 'translateX(0)' : `translateX(-102%)`)};
	transition: all 0.5s ease-in-out;
`;

const BookshelfContainer = styled.div`
	height: 100vh;
	overflow-x: hidden;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
`;

const ShelfDragger = styled.div`
	height: 10rem;
	width: 5rem;
	background-color: ${shelfDraggerBackground};
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateX(100%) translateY(-50%);
	border-radius: 0 50% 50% 0;
`;

const BookshelfFrame = styled.div`
	min-width: ${shelfMinWidth + 'vw'};
	max-width: ${shelfMaxWidth + 'vw'};
	min-height: ${shelfHeight + 'vh'};
	background: ${() => shelfFrameBackground};
	background-size: auto, 10px 300px;
	border-left: 10px solid ${shelfDraggerBackground};
	border-right: 10px solid ${shelfDraggerBackground};

	/* flex layout */
	display: flex;
	flex-wrap: wrap;
	align-content: start;
	column-gap: 2rem;
`;

const BookWrapper = styled.div`
	width: ${bookWidth + 'px'};
	height: ${bookHeight + 'px'};
	position: relative;
	margin: 10px 0;
	max-width: 100%;
`;

const BookImage = styled.img`
	height: auto;
	width: auto;
	border-radius: 4px;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	max-height: 100%;
	max-width: 100%;

	/* 书籍厚度效果 */
	box-shadow: 5px -2px 0px 2px #bab2b2;
	border-right: 1px solid dark;
`;

function Bookshelf({className}: BookShelfProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Wrapper
			className={className}
			isOpen={isOpen}
		>
			<BookshelfContainer>
				<ShelfDragger
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				></ShelfDragger>
				<BookshelfFrame>
					{booksInfo.map(book => {
						return (
							<BookWrapper key={book.id}>
								<BookImage
									src={book.cover}
									alt={book.name}
								/>
							</BookWrapper>
						);
					})}
					{/* <BookWrapper>
						<BookImage src="https://via.placeholder.com/500x500?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/300x500?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/500x300?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/300x500?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/500x500?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/500x300?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/500x500?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/300x500?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/500x300?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/300x500?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/500x500?text=book" />
					</BookWrapper>
					<BookWrapper>
						<BookImage src="https://via.placeholder.com/500x300?text=book" />
					</BookWrapper> */}
				</BookshelfFrame>
			</BookshelfContainer>
		</Wrapper>
	);
}

export default Bookshelf;
