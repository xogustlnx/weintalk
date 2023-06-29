import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import styled, { css } from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import VerticalTabs from "../components/verticaltaps";
import PersonCards from "../components/personcard";
import ChattingBoxes from "../components/chattingbox";

import logo from "../info/images/로고.png";

import { persons } from "../info/information";
import Input from "../components/input";
import ChatTab from "../components/chattap";

const Back = styled.div`
  background: #ffffff;
  width: 1440px;
  height: 1024px;

  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const Logo = styled.img`
  position: absolute;
  left: 44px;
  top: 33px;
  width: 80px;
  height:80px
  cursor: pointer;
`;

const PartVerticalTabs = styled.div`
  position: absolute;
  left: 123px;
  top: 98px;
`;

const Mold = styled.div`
  width: 1086px;
  height: 891px;
  border-radius: 0px 10px 10px 10px;
  border: 2px solid #2196f3;
  position: absolute;
  left: 243px;
  top: 98px;
  display: flex;
`;

const ChatBar = styled.div`
  width: 1086px;
  height: 87px;
  position: absolute;

  top: 802px;
  left: -2px;
  border-radius: 0px 0px 10px 10px;
  border: 2px solid #2196f3;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const BackMainBtn = styled(Button)`
  position: absolute;
  height: 42px;
  width: auto;
`;

const ChattingSpace = styled.div`
  position: absolute;
  height: 784px;
  width: 1086px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const ChatContext = createContext(null);
const SetChatContext = createContext(null);

const SetNowContext = createContext(null);

export default function Main() {
  const [part, setPart] = useState(0);
  const parts = ["과학", "역사", "철학"];
  const [nowChat, setNowChat] = useState();

  const [now, setNow] = useState();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();

  const nextId = useRef(5);

  const [chats, setChats] = useState([
    {
      id: 1,
      children:
        "안녕하세요, 친구. 저는 알베르트 아인슈타인입니다. 저는 물리학자이고, 우주와 물질의 이해에 혁명을 가져온 특수 상대성 이론과 일반 상대성 이론을 발표했습니다. 저는 또한 광전효과에 대한 연구로 노벨 물리학상을 수상했습니다. 저는 어렸을 때부터 세상을 이해하는 데 관심이 많았습니다. 저는 세상이 어떻게 작동하는지, 세상이 어떻게 생겨났는지, 세상이 어떻게 끝날 것인지 알고 싶었습니다. 저는 물리학을 통해 세상을 이해할 수 있었고, 세상을 이해하는 것이 얼마나 기쁜 일인지 알게 되었습니다. 저는 여러분이 세상을 이해하는 것이 얼마나 기쁜 일인지 알게 되기를 바랍니다. 과학을 통해 세상을 이해하고, 세상을 변화시키는 사람이 되기를 바랍니다.",
    },
    { id: 2, children: "반갑습니다", me: true },
    { id: 3, children: "무엇을 물어보고 싶니" },
    { id: 4, children: "반갑습니다", me: true },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <>
      <ChatContext.Provider value={nowChat}>
        <SetChatContext.Provider value={setNowChat}>
          <SetNowContext.Provider value={setNow}>
            <Back>
              <Logo onClick={(e) => setNowChat(false)} src={logo}></Logo>
              {!nowChat && (
                <>
                  <PartVerticalTabs>
                    <VerticalTabs
                      value={part}
                      setValue={setPart}
                      list={parts}
                    ></VerticalTabs>
                  </PartVerticalTabs>
                  <Mold>
                    <PersonCards persons={persons}></PersonCards>
                  </Mold>
                </>
              )}
              {nowChat && (
                <>
                  <PartVerticalTabs>
                    <ChatTab value="채팅"></ChatTab>
                  </PartVerticalTabs>
                  <Mold>
                    <ChattingSpace>
                      <ChattingBoxes
                        chats={chats}
                        img={persons[now].proImg}
                      ></ChattingBoxes>
                      <div ref={messagesEndRef} />
                    </ChattingSpace>
                    <ChatBar>
                      <BackMainBtn
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={(e) => setNowChat(false)}
                      >
                        메뉴로 돌아가기
                      </BackMainBtn>
                      <Input
                        label={"질문"}
                        placeholder={"질문을 입력해주세요"}
                        variant="outlined"
                        length="868px"
                        setValue={setQuestion}
                        onKeyPress
                        setChats={setChats}
                        chats={chats}
                        id={nextId}
                        setAnswer={setAnswer}
                      ></Input>
                    </ChatBar>
                  </Mold>
                </>
              )}
            </Back>
          </SetNowContext.Provider>
        </SetChatContext.Provider>
      </ChatContext.Provider>
    </>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}

export function useSetChatContext() {
  return useContext(SetChatContext);
}

export function useSetNowContext() {
  return useContext(SetNowContext);
}
