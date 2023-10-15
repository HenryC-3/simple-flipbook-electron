import styled from '@emotion/styled';
import {getHomeBg} from '#preload';

const bg = await getHomeBg();

const AppWrapper = styled.div`
	background: darkblue;
	width: 100vw;
	height: 100vh;
	background: url(${bg});
`;

export function StartUp() {
	return (
		<AppWrapper>
			<a href="./book">url</a>
		</AppWrapper>
	);
}
