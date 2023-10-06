import {ReactNode, forwardRef} from 'react';
import styled from '@emotion/styled';

const PageContainer = styled.div`
	background-color: rgb(255 247 237);
	border: 1px solid black;
	padding: 16px;
	display: flex;
	flex-direction: column;
`;

export const BookPage = forwardRef<HTMLDivElement, {children: ReactNode}>(({children}, ref) => {
	return <PageContainer ref={ref}>{children}</PageContainer>;
});
