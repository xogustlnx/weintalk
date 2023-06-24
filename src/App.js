import "./App.css";
import { createGlobalStyle } from "styled-components";
import Start from "./components/start";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Start></Start>
    </>
  );
}

export default App;
