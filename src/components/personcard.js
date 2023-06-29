import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  useChatContext,
  useSetChatContext,
  useSetNowContext,
} from "../pages/main";

const Card = styled.div`
  display: flex;
  width: 330px;
  height: 405px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  border-radius: 4px;
  background: var(--background-paper-elevation-1, #fff);
  /* elevation/1 */
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  position: relative;
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  align-items: center;
  top: 350px;
  width: 330px;
`;

const PersonImage = styled.img`
  width: 330px;
  height: 159px;
  border-radius: 4px 4px 0px 0px;
`;

const PersonName = styled.div`
  color: #000;
  font-size: 20px;
  font-family: Roboto;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 15px 0;
  padding-left: 15px;
`;

const PersonNickname = styled.div`
  color: #000;
  font-size: 13px;
  font-family: Roboto;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding-left: 15px;
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  color: rgba(0, 0, 0, 0.6);
  font-size: 11px;
  font-family: Roboto;
  font-weight: 300;
  line-height: 18px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding-right: 15px;
  padding-left: 0px;
`;

const PersonMoreInfo = styled.div`
  margin-top: 15px;
  color: #000;
  font-size: 10px;
  font-family: Roboto;
  text-transform: uppercase;
  white-space: pre-wrap;
  align-self: center;
  padding: 10px;
`;

const MoreBtn = styled(Button)`
  && {
    font-size: 13px;
    font-family: Roboto;
    font-weight: 500;
    letter-spacing: 0.46px;
    text-transform: uppercase;
  }
`;

const ChatBtn = styled(Button)`
  && {
    font-size: 13px;
    font-family: Roboto;
    font-weight: 500;
    letter-spacing: 0.46px;
    text-transform: uppercase;
  }
`;

const Ul = styled.ul`
  padding-left: 30px;
`;

const SmallIcon = styled(ArrowForwardIosIcon)`
  && {
    width: 18px;
    height: 12px;
  }
`;

const SmallIcon2 = styled(ArrowBackIosIcon)`
  && {
    width: 18px;
    height: 12px;
  }
`;

const Empha = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

function PersonCard({ id, link, name, nickname, info, moreInfo, disabled }) {
  const [open, setOpen] = useState(false);

  const setChat = useSetChatContext();
  const setNow = useSetNowContext();
  const chat = useChatContext();

  function Chat() {
    setChat(true);
    setNow(id);
  }

  const handleSubmit = async (target, e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const response = await fetch("../api/prompting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person: name }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <Card>
        {!open && (
          <>
            <PersonImage src={link}></PersonImage>
            <PersonName>{name}</PersonName>
            <PersonNickname>{nickname}</PersonNickname>
            <PersonInfo>
              <Ul>
                {info.map((element) => (
                  <li>{element}</li>
                ))}
              </Ul>
            </PersonInfo>
            <BtnWrap>
              <MoreBtn
                endIcon={<SmallIcon />}
                onClick={(e) => setOpen(!open)}
                disabled={disabled}
              >
                더 알아보기
              </MoreBtn>
              <ChatBtn disabled={disabled} onClick={(e) => Chat()}>
                채팅하기
              </ChatBtn>
            </BtnWrap>
          </>
        )}
        {open && (
          <>
            <PersonMoreInfo>
              <Empha>{name}</Empha>
              {moreInfo}
            </PersonMoreInfo>
            <BtnWrap>
              <MoreBtn
                startIcon={<SmallIcon2 />}
                onClick={(e) => setOpen(!open)}
                disabled={disabled}
              >
                더 알아보기
              </MoreBtn>
              <ChatBtn disabled={disabled} onClick={(e) => Chat()}>
                채팅하기
              </ChatBtn>
            </BtnWrap>
          </>
        )}
      </Card>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  width: 1086px;
  height: 891px;
`;

export default function PersonCards({ persons }) {
  return (
    <>
      <Container>
        {persons.map((person, i) => (
          <PersonCard
            id={i}
            link={person.link}
            name={person.name}
            nickname={person.nickname}
            info={person.info}
            moreInfo={person.moreInfo}
            disabled={person.disabled}
          ></PersonCard>
        ))}
      </Container>
    </>
  );
}
