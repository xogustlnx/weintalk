import React, { useState } from "react";
import styled, { css } from "styled-components";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const ChattingBlock = styled.div`
  width: auto;
  max-width: 800px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0px 10px 10px 10px;
  align-self: flex-start;
  padding: 9px 18px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: #000;
  font-size: 12px;
  font-family: Roboto;
  line-height: 150%;
  white-space: pre-wrap;

  ${(props) =>
    props.me &&
    css`
      border-radius: 10px 0px 10px 10px;
      align-self: flex-end;
      margin-left: 0;
      margin-right: 20px;
      background-color: #2196f3;
      color: white;
    `}
`;

const WithProfile = styled.div`
  display: flex;
  align-self: flex-start;
  margin-left: 20px;
`;

const Profile = styled.img`
  width: 93px;
  height: 93px;
  align-self: flex-start;
`;

function ChattingBox({ me, children, img }) {
  return (
    <>
      {me && (
        <>
          <ChattingBlock me={me}>{children}</ChattingBlock>
        </>
      )}

      {!me && (
        <>
          <WithProfile>
            <Profile src={img}></Profile>
            <ChattingBlock>{children}</ChattingBlock>
          </WithProfile>
        </>
      )}
    </>
  );
}

export default function ChattingBoxes({ chats, img }) {
  return (
    <>
      {chats && chats.map((chat) => (
        <ChattingBox
          me={chat.me}
          children={chat.children}
          img={img}
        ></ChattingBox>
      ))}
    </>
  );
}
