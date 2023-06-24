import "./App.css";
import { createGlobalStyle } from "styled-components";
import Start from "./pages/start";
import Main from "./pages/main";
import { Route, Routes } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
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
