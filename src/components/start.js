import React from "react";
import styled from "styled-components";
import img from "../Vector1.png";
import Button from "@mui/material/Button";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Back = styled.div`
  background: #2196f3;
  width: 1440px;
  height: 1024px;
  margin: 0;

  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const FaceImage = styled.img`
  width: 1062px;
  height: 1024px;
  position: absolute;
`;

const Title = styled.div`
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
  font-size: 96px;
  font-family: Roboto;
  font-weight: 700;
  line-height: 90%;
  letter-spacing: -1.5px;
  white-space: pre-wrap;
  position: absolute;
  left: 260px;
  top: 211px;
`;

const SubTitle = styled.div`
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-family: Roboto;
  line-height: 133.4%;

  position: absolute;
  left: 526px;
  top: 599px;
  white-space: pre-wrap;
`;

const StartBtn = styled(Button)`
  && {
    position: absolute;
    left: 447px;
    top: 817px;
  }
`;

function Start({ children }) {
  const title = "WE \n\nIN \n\nTALK";
  const subTitle = "역사 속 인물과의 \n가치있는 대화";
  return (
    <>
      <Back>
        <FaceImage src={img}></FaceImage>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        <StartBtn color="primary" variant="contained" size="large">
          시작하기
        </StartBtn>
      </Back>
    </>
  );
}

export default Start;
