import "./App.css";
import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import { createGlobalStyle } from "styled-components";
import Start from "./pages/start";
import Main from "./pages/main";
import { Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Prompting from "./pages/api/prompting";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
    font-family: Roboto;
  }
`;

function App() {
  const { Configuration, OpenAIApi } = require("openai");
  const [info, setInfo] = useState();
  const [person, setPerson] = useState();
  const [question, setQuestion] = useState();

  const InfoContext = createContext(null);
  const SetChatContext = createContext(null);

  const SetNowContext = createContext(null);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route exact path="/main" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
