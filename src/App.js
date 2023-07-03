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
  }
`;

export const messages = [];

function App() {
  const { Configuration, OpenAIApi } = require("openai");
  const [info, setInfo] = useState();
  const [person, setPerson] = useState();
  const [question, setQuestion] = useState();
  const [part, setPart] = useState(0);

  const [res, setRes] = useState();
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_API_KEY,
  });
  console.log(process.env.REACT_APP_OPEN_API_KEY);
  console.log(part);
  console.log(person);
  console.log(persons[part]);

  const openai = new OpenAIApi(configuration);

  useDidMountEffect(() => {
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
  }, [person]);

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
            />
          }
        />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
