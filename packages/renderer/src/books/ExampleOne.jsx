import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import backgroundImg from "../assets/background.jpg";
import styled from "styled-components";
import { BookPage } from "../components/BookPage";
import { forwardRef } from "react";

const StyledFlipBook = styled(HTMLFlipBook)`
    background: url(${backgroundImg});
    box-shadow: 10px;
`;

const PageFooter = styled.div`
    color: red;
`;

export const ExampleBookOne = forwardRef(({ flippingTime }, ref) => {
    // TODO 使用 Mock Data 替换
    const [pages] = useState(Object.keys(Array.from({ length: 50 })));

    return (
        <StyledFlipBook
            width={460}
            height={480}
            flippingTime={flippingTime}
            showCover={true}
            ref={ref}>
            {pages.map((page) => {
                return (
                    <BookPage key={page}>
                        <h2>沁园春·长沙</h2>
                        <p>毛泽东〔近现代〕</p>
                        <p>
                            独立寒秋，湘江北去，橘子洲头。
                            看万山红遍，层林尽染；漫江碧透，百舸争流。
                            鹰击长空，鱼翔浅底，万类霜天竞自由。
                            怅寥廓，问苍茫大地，谁主沉浮？
                            携来百侣曾游。忆往昔峥嵘岁月稠。
                            恰同学少年，风华正茂；书生意气，挥斥方遒。
                            指点江山，激扬文字，粪土当年万户侯。
                            曾记否，到中流击水，浪遏飞舟？
                        </p>
                        <PageFooter>第 {Number(page) + 1} 页</PageFooter>
                    </BookPage>
                );
            })}
        </StyledFlipBook>
    );
});
