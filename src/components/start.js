import React, { useState } from "react";
import styled from "styled-components";
import img from "../Vector1.png";
import Button from "@mui/material/Button";
import { NativeSelect } from "@mui/material";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { TextField } from "@material-ui/core";
import SliderValueLabel from "@mui/material/Slider/SliderValueLabel";
import Input from "./input";
import MultipleSelect from "./multipleselect";

const Back = styled.div`
  background: #2196f3;
  width: 1440px;
  height: 1024px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const Logintext = styled.div`
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
  /* typography/h4 */
  font-size: 34px;
  font-family: Roboto;
  line-height: 123.5%;
  letter-spacing: 0.25px;
  white-space: pre-wrap;
  position: absolute;
  left: 246px;
  top: 250px;
`;

const NameForm = styled.div`
  position: absolute;
  left: 246px;
  top: 397px;
`;

const LNameForm = styled.div`
  position: absolute;
  left: 516px;
  top: 397px;
`;

const AgeForm = styled.div`
  position: absolute;
  left: 246px;
  top: 506px;
`;

const InterestForm = styled.div`
  position: absolute;
  left: 516px;
  top: 506px;
`;

const SubmitBtn = styled(Button)`
  && {
    position: absolute;
    left: 246px;
    top: 747px;
  }
`;

const Why = styled(TextField)`
  && {
    display: none;
  }
`;

const names = ["과학", "물리", "화학"];

function Start({ children }) {
  const title = "WE \n\nIN \n\nTALK";
  const subTitle = "역사 속 인물과의 \n가치있는 대화";
  const logintext = "가치있는 대화를 위해서는\n당신의 정보가 필요합니다.";
  const [visiblefp, setVisiblefp] = useState(true);

  const [name, setName] = useState([]);
  const [lname, setLName] = useState([]);
  const [age, setAge] = useState([]);
  const [interest, setInterest] = useState([]);

  function onSubmit(list) {
    console.log(list);
  }

  return (
    <>
      <Back>
        <FaceImage src={img}></FaceImage>
        <Why></Why>
        {visiblefp && (
          <>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            <StartBtn
              color="primary"
              variant="contained"
              size="large"
              onClick={(e) => setVisiblefp(!visiblefp)}
            >
              시작하기
            </StartBtn>
          </>
        )}
        {!visiblefp && (
          <>
            <Logintext>{logintext}</Logintext>
            <NameForm>
              <Input
                label={"이름"}
                setValue={setName}
                placeholder={"이름을 입력해주세요"}
              />
            </NameForm>
            <LNameForm>
              <Input
                label={"성"}
                setValue={setLName}
                placeholder={"성을 입력해주세요"}
              />
            </LNameForm>
            <AgeForm>
              <Input
                label={"나이"}
                setValue={setAge}
                placeholder={"나이를 입력해주세요"}
              />
            </AgeForm>
            <InterestForm>
              <MultipleSelect
                label="interest"
                names={names}
                setValue={setInterest}
              ></MultipleSelect>
            </InterestForm>

            <SubmitBtn
              color="primary"
              variant="contained"
              size="large"
              onClick={(e) => onSubmit([name, lname, age, interest])}
            >
              제출하고 시작하기
            </SubmitBtn>
          </>
        )}
      </Back>
    </>
  );
}

export default Start;
