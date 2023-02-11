import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import data from './animation/BGLeftBottom.json';

const AniImg = styled.div`
    position: absolute;
    bottom : 0px;
    z-index : -1;
    max-height: initial;
    width: 100%;
`;

const Wrapper = styled.div`
    width: 50%;
    height: 50%;
    left : 0px;
    bottom : 0px;
    overflow: hidden;
    z-index : -1;
    position: absolute;
`;

function BGLeftBottomAnimation(){
    const aniBox = useRef();

    useEffect(()=>{
        lottie.loadAnimation({
            container : aniBox.current,
            renderer : 'svg',
            loop: true,
            autoplay : true,
            animationData : data,
        })

    },[]);

    return(
        <Wrapper>
            <AniImg ref={aniBox}></AniImg>
        </Wrapper>
    );
};

export default BGLeftBottomAnimation;