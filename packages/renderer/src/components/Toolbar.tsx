/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import {countBookPageNum, quiteApp} from '#preload';
import {useStore} from '../store/index';
import {Link} from 'react-router-dom';

interface ToolbarOptions {
	flipBookRef: React.MutableRefObject<any>;
	autoFlipTime: number;
	nextButtonClick: () => void;
	prevButtonClick: () => void;
	className?: string;
}

const ToolbarContainer = styled.div<{isOpen: boolean}>`
	/* background-color: #334942; */
	/* inner layout */
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;

	transform: ${props => (props.isOpen ? 'translateY(0%)' : `translateY(65%)`)};
	transition: all 0.3s ease-in-out;
`;
const Dragger = styled.div`
	width: 10rem;
	height: 3rem;
	background: #373737;
	border: 2px solid dark;
	border-radius: 40% 40%;
	transform: translateY(40%);
`;

const ButtonGroup = styled.div`
	background-color: #373737;
	padding: 20px 40px;
	display: flex;
	gap: 0.5rem;
	border-radius: 20px 20px 0px 0px;
`;

const PrettoSlider = styled(Slider)({
	marginRight: 20,
	color: '#1A81CE',
	height: 8,
	width: 400,
	'& .MuiSlider-track': {
		border: 'none',
	},
	'& .MuiSlider-rail': {
		opacity: 1,
		backgroundColor: 'white',
	},
	'& .MuiSlider-thumb': {
		height: 24,
		width: 24,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
			boxShadow: 'inherit',
		},
		'&:before': {
			display: 'none',
		},
	},
	'& .MuiSlider-valueLabel': {
		lineHeight: 1.2,
		fontSize: 12,
		background: 'unset',
		padding: 0,
		width: 32,
		height: 32,
		borderRadius: '50% 50% 50% 0',
		backgroundColor: '#1A81CE',
		transformOrigin: 'bottom left',
		transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
		'&:before': {display: 'none'},
		'&.MuiSlider-valueLabelOpen': {
			transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
		},
		'& > *': {
			transform: 'rotate(45deg)',
		},
	},
});

export default function Toolbar({
	flipBookRef,
	autoFlipTime,
	nextButtonClick,
	prevButtonClick,
	className,
}: ToolbarOptions) {
	const [sliderNumber, setSliderNumber] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const {currentBookPath} = useStore(state => state);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const getData = async () => {
			const data = await countBookPageNum(currentBookPath);
			setPageCount(data);
		};
		getData();
	}, [currentBookPath]);

	const flipToPage = () => {
		// 自动翻页，翻过单张执行的速度 = 翻页动画速度
		// NOTE: 通过 getCurrentPageIndex 只会获取到偶数位的 pageNumber，即 1246
		const pageNumber = flipBookRef.current.pageFlip().getCurrentPageIndex() + 1;
		let timerId: any;

		const {count, swipeRight} = getFlipCount(pageNumber, sliderNumber);

		autoSwipe(count, swipeRight, autoFlipTime, {right: nextButtonClick, left: prevButtonClick});
		/**
		 * @description 返回一个对象，包含翻页的次数，翻页的方向
		 */
		function getFlipCount(currentNum: number, targetNum: number) {
			// NOTE 处理往回翻页，即目标页数小于当前页数的情况
			let swipeRight;
			if (targetNum < currentNum) {
				swipeRight = false;
			} else {
				swipeRight = true;
			}

			const isOdd = sliderNumber % 2;
			if (isOdd) {
				return {
					count: Math.abs(targetNum - 1 - currentNum) / 2,
					swipeRight,
				};
			} else {
				return {
					count:
						targetNum == 2 && currentNum == 1
							? 1
							: Math.abs(targetNum - currentNum) / 2,
					swipeRight,
				};
			}
		}

		/**
		 * @description 根据方向(direction)，自动执行翻页(action)若干次(count), 每次间隔 time ms
		 */
		function autoSwipe(
			count: number,
			direction: boolean,
			time: number,
			actions: {right: () => void; left: () => void},
		) {
			let action: () => void;
			const {right, left} = actions;
			if (direction) {
				action = right;
			} else {
				action = left;
			}

			let n = count;
			timerId = setInterval(() => {
				n <= 0 ? clearInterval(timerId) : action();
				n = n - 1;
			}, time);
		}
	};
	function handleQuite() {
		quiteApp();
	}

	return (
		<ToolbarContainer
			isOpen={isOpen}
			className={className}
		>
			<Dragger
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			></Dragger>
			<ButtonGroup>
				<PrettoSlider
					aria-label="Default"
					max={pageCount}
					valueLabelDisplay="auto"
					value={sliderNumber}
					onChange={e => {
						setSliderNumber(
							Number(e.target ? (e.target as HTMLInputElement).value : 0),
						);
					}}
				/>
				<Button
					variant="contained"
					onClick={flipToPage}
				>
					跳转
				</Button>
				<Button
					variant="contained"
					onClick={prevButtonClick}
				>
					上一页
				</Button>
				<Button
					variant="contained"
					onClick={nextButtonClick}
				>
					下一页
				</Button>
				<Button
					variant="contained"
					onClick={nextButtonClick}
				>
					<Link to={'/'}>返回首页</Link>
				</Button>
				<Button
					variant="contained"
					onClick={handleQuite}
				>
					退出程序
				</Button>
			</ButtonGroup>
		</ToolbarContainer>
	);
}
