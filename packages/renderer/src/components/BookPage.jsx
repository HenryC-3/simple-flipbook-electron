import { forwardRef } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
    background-color: rgb(255 247 237);
    border: 1px solid black;
    padding: 16px;
    display: flex;
    flex-direction: column;
`;

export const BookPage = forwardRef(({ children }, ref) => {
    return <PageContainer ref={ref}>{children}</PageContainer>;
});
