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
import useDidMountEffect from "../hooks/useDidMountEffect";
import { useNavigate } from "react-router-dom";

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
  left: 64px;
  top: 26px;
  width: 100px;
  height:77px
  cursor: pointer;
`;

const PartVerticalTabs = styled.div`
  position: absolute;
  left: 51px;
  top: 66px;
`;

const Mold = styled.div`
  width: 1086px;
  height: 891px;
  border-radius: 0px 10px 10px 10px;
  border: 2px solid #2196f3;
  position: absolute;
  left: 171px;
  top: 66px;
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

export default function Main({
  setPersonApp,
  setQuestionApp,
  res,
  loading,
  info,
  setPartApp,
  setNowChatApp,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!info) {
      alert("정보를 입력해야 서비스를 이용할 수 있습니다.");
      navigate("/");
    }
  }, []);

  const [part, setPart] = useState(0);
  const parts = ["역사", "과학", "철학"];
  console.log(part);
  const [nowChat, setNowChat] = useState();

  const [now, setNow] = useState();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();

  useDidMountEffect(() => {
    setQuestionApp(question);
  }, [question]);

  useDidMountEffect(() => {
    setPersonApp(now);
    setChats([]);
  }, [now]);

  useDidMountEffect(() => {
    setNowChatApp(nowChat);
    setChats([]);
  }, [nowChat]);

  useDidMountEffect(() => {
    setChats([]);
  }, [part]);

  const nextId = useRef(0);

  const [chats, setChats] = useState([]);

  useDidMountEffect(() => {
    if (loading)
      setChats(chats.concat({ id: nextId.current, children: "입력중..." }));
  }, [loading]);

  useDidMountEffect(() => {
    setChats((chats) => chats.concat({ id: nextId.current, children: res }));
    setChats((chats) => chats.filter((chat) => chat.children !== "입력중..."));
    nextId.current += 1;
  }, [res]);

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
              {!nowChat && (
                <>
                  <PartVerticalTabs>
                    <VerticalTabs
                      value={part}
                      setValue={setPart}
                      list={parts}
                      setPartApp={setPartApp}
                    ></VerticalTabs>
                  </PartVerticalTabs>
                  <Mold>
                    <PersonCards persons={persons[part]}></PersonCards>
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
                        img={persons[part][now].proImg}
                      ></ChattingBoxes>
                      <div ref={messagesEndRef} />
                    </ChattingSpace>
                    <ChatBar>
                      <BackMainBtn
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={(e) => setNowChat(false)}
                        disabled={loading ? true : false}
                      >
                        메뉴로 돌아가기
                      </BackMainBtn>
                      <Input
                        label={"질문"}
                        placeholder={"질문을 입력해주세요"}
                        variant="outlined"
                        length="868px"
                        setQuestion={setQuestion}
                        onKeyPress
                        setChats={setChats}
                        chats={chats}
                        id={nextId}
                        setAnswer={setAnswer}
                        loading={loading}
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
