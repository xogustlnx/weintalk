import "./App.css";
import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Start from "./pages/start";
import Main from "./pages/main";
import { Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import useDidMountEffect from "./hooks/useDidMountEffect";
import { persons } from "../src/info/information";
import infoPrompting from "./prompting/infoprompting";
import questionPrompting from "./prompting/questionprompting";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
    font-family: Roboto;
    @media screen and (max-width: 500px) {
      max-width: 100%;
overflow-x: hidden;
  }
  }
`;

export const messages = [];

function App() {
  const { Configuration, OpenAIApi } = require("openai");
  const [info, setInfo] = useState();
  const [person, setPerson] = useState();
  const [question, setQuestion] = useState();
  const [part, setPart] = useState(0);
  const [nowchat, setNowChat] = useState(false);

  const [res, setRes] = useState();
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  useDidMountEffect(() => {
    if (nowchat) {
      messages.length = 0;
      infoPrompting(
        openai,
        info.name,
        info.age,
        info.interest,
        persons[part][person].name,
        setRes,
        setLoading
      );
    }
  }, [nowchat]);

  useDidMountEffect(() => {
    questionPrompting(
      openai,
      info.name,
      info.age,
      info.interest,
      persons[part][person].name,
      setRes,
      setLoading,
      res,
      question
    );
  }, [question]);

  return (
    <>
      <GlobalStyle />
      {/* <BrowserRouter basename="https://xogustlnx.github.io/weintalk/"> */}
      <Routes>
        <Route exact path="/" element={<Start setInfoApp={setInfo} />} />
        <Route
          exact
          path="/main"
          element={
            <Main
              setPersonApp={setPerson}
              setQuestionApp={setQuestion}
              res={res}
              loading={loading}
              info={info}
              setPartApp={setPart}
              setNowChatApp={setNowChat}
            />
          }
        />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
