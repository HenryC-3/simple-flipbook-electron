import styled from '@emotion/styled';
import {getHomeBg, getBgsPath} from '#preload';
import {Link} from 'react-router-dom';
import BackHandIcon from '@mui/icons-material/BackHand';

// const bg = await getHomeBg();
const paths = (await getBgsPath()).filter(path => {
	return path.includes('home');
});

const AppWrapper = styled.div`
	background: dark;
	width: 100vw;
	height: 100vh;
	background-image: url(${paths[1]});
	background-size: cover;

	/* layout */
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledIcon = styled(BackHandIcon)`
	color: rgba(148, 176, 199, 0.7);
	height: 5rem;
	width: 5rem;
	z-index: 99;
	position: absolute;
	bottom: 1rem;
`;

const StyledButton = styled.div`
	position: relative;
	width: 16rem;
	height: 16rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		font-size: 2rem;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.05);
		box-shadow: 0 15px 15px rgba(0, 0, 0, 0.3);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		padding: 10px;
		letter-spacing: 1px;
		text-decoration: none;
		overflow: hidden;
		color: #fff;
		text-decoration: dotted;
		z-index: 1;
		transition: 0.5s;
		backdrop-filter: blur(15px);
	}

	&:hover a {
		letter-spacing: 0.2rem;
		font-size: larger;
	}

	a::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 50%;
		height: 100%;
		background: linear-gradient(to left, rgba(255, 255, 255, 0.15), transparent);
		transform: skewX(45deg) translate(0);
		transition: 0.5s;
		filter: blur(0px);
	}

	&:hover a::before {
		transform: skewX(45deg) translate(200px);
	}
`;

export function StartUp() {
	return (
		<AppWrapper>
			<StyledButton>
				<StyledIcon></StyledIcon>
				<Link to={'/book'}>进入互动翻书</Link>
			</StyledButton>
			<video
				playsInline
				autoPlay
				muted
				loop
				style={{
					objectFit: 'cover',
					width: '100vw',
					height: '100vh',
					position: 'fixed',
					top: 0,
					left: 0,
				}}
			>
				<source
					src={paths[1]}
					type="video/mp4"
				/>
			</video>
		</AppWrapper>
	);
}
