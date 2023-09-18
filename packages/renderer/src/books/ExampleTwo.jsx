import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import styled from "styled-components";
import { forwardRef } from "react";

const StyledFlipBook = styled(HTMLFlipBook)`
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
`;

// const BookCover = styled.div`
//     box-shadow: inset 0 0 30px 0 rgba(36, 10, 3, 0.5),
//         -2px 0 5px 2px rgba(0, 0, 0, 0.4);
//     background-color: gray;
// `;

// NOTE 只有 div 才能应用 shadow，img 不可以
const BookPageLeft = styled.div`
    border-right: 0;
    &::after {
        box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
        content: "";
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
        content: "";
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

export const ExampleBookTwo = forwardRef(
    ({ flippingTime, width = 480 * 1.75, height = 540 * 1.75 }, ref) => {
        // TODO 使用 Mock Data 替换

        const [pages] = useState([
            "./mock/images/01.jpg",
            "./mock/images/02.jpg",
            "./mock/images/03.jpg",
            "./mock/images/04.jpg",
            "./mock/images/05.jpg",
            "./mock/images/06.jpg",
            "./mock/images/07.jpg",
            "./mock/images/08.jpg",
            "./mock/images/09.jpg",
            "./mock/images/10.jpg",
            "./mock/images/11.jpg",
            "./mock/images/12.jpg",
            "./mock/images/13.jpg",
            "./mock/images/14.jpg",
            "./mock/images/15.jpg",
            "./mock/images/16.jpg",
        ]);

        return (
            <StyledFlipBook
                width={width}
                height={height}
                flippingTime={flippingTime}
                // showCover={true}
                ref={ref}>
                {/* BookCover */}
                {/* BookContent */}
                {pages.map((page, index) => {
                    const isOdd = (index + 1) % 2 !== 0;
                    if (isOdd) {
                        return (
                            <BookPageLeft key={page}>
                                <BookContent src={page} alt="" />
                            </BookPageLeft>
                        );
                    } else {
                        return (
                            <BookPageRight key={page}>
                                <BookContent src={page} alt="" />
                            </BookPageRight>
                        );
                    }
                })}
            </StyledFlipBook>
        );
    }
);
