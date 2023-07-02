import React, { useState } from "react";
import styled from "styled-components";
import img from "../info/images/face.png";
import Button from "@mui/material/Button";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { TextField } from "@material-ui/core";
import Input from "../components/input";
import MultipleSelect from "../components/multipleselect";

import { useNavigate } from "react-router-dom";

const Back = styled.div`
  background: #2196f3;
  width: 1440px;
  height: 1024px;

  position: absolute;
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

function Start({ children, setInfoApp }) {
  const title = "WE \n\nIN \n\nTALK";
  const subTitle = "역사 속 인물과의 \n가치있는 대화";
  const logintext = "가치있는 대화를 위해서는\n당신의 정보가 필요합니다.";
  const [visiblefp, setVisiblefp] = useState(true);

  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [age, setAge] = useState("");
  const [interest, setInterest] = useState([]);

  const navigate = useNavigate();

  function onSubmit(obj) {
    setInfoApp(obj);
    navigate("/main");
    console.log(obj);
  }

  function isAge(num) {
    if (
      Number.isInteger(parseInt(num)) &&
      parseInt(num) > 0 &&
      parseInt(num) < 100
    )
      return true;
    return false;
  }

  function chooseHelperText(num) {
    const plsin = "나이는 필수적으로 입력해야 합니다.";
    const plsnum = "나이에는 숫자를 입력해주세요";
    const plsrange = "나이는 1에서 100사이의 수를 입력해주세요";
    if (num === "") {
      return plsin;
    }
    if (!Number.isInteger(parseInt(num))) {
      return plsnum;
    }
    if (parseInt(num) < 0 || parseInt(num) > 100) {
      return plsrange;
    }
  }

  function hasError({ name, lname, age }) {
    if (name != "" && lname != "" && isAge(age)) return false;
    return true;
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
                error={name === "" ? true : false}
                label={"이름"}
                setValue={setName}
                placeholder={"이름을 입력해주세요"}
                helperText={"이름은 필수적으로 입력해야 합니다."}
              />
            </NameForm>
            <LNameForm>
              <Input
                error={lname === "" ? true : false}
                label={"성"}
                setValue={setLName}
                placeholder={"성을 입력해주세요"}
                helperText={"성은 필수적으로 입력해야 합니다."}
              />
            </LNameForm>
            <AgeForm>
              <Input
                error={!isAge(age)}
                label={"나이"}
                setValue={setAge}
                placeholder={"나이를 입력해주세요"}
                helperText={chooseHelperText(age)}
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
              onClick={(e) =>
                onSubmit({
                  name: name,
                  lname: lname,
                  age: age,
                  interest: interest,
                })
              }
              disabled={hasError({ name, lname, age })}
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
