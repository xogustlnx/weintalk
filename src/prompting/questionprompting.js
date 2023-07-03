import { messages } from "../App";

const questionPrompting = async (
  openai,
  name,
  age,
  interest,
  personname,
  setRes,
  setLoading,
  res,
  question
) => {
  setLoading(true);
  messages.push({
    role: "system",
    content: `[사용자 정보]
    - 사용자의 나이 : ${age}
    - 사용자의 이름 : ${name}
    - 사용자의 직업 : 학생
    
    [답변]
    - 과학적, 역사적 사실에 기반하여 답을 해야한다.
    - 생각을 물어보는  질문에는 ${personname} 이 살았던 배경과 그 때 ${personname}의 태도를 기반으로 생각을 유추해서 답을 해야한다. 현대의 객관적인 잣대는 최대한 고려하지 않아야 한다.
    - 질문자의 나이, 직업을 고려하여 대답의 난이도를 맞춘다.
    - 입력받은 질문에 대한 답만 하고 다른 출력을 하지 않는다. 
    - "질문완료"를 입력받았을 때 마무리인사를 하며 종료한다.
    - 대답할 말투: 하게체
    - 시점: ${personname} 1인칭 시점
    -  ${personname}을 "나" 로 지칭하여 답을 해야한다.
    `,
  });

  messages.push({ role: "user", content: question });

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  setRes(response.data.choices[0].message.content);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: `이 내용을 한국어 한 문장으로 요약해줘` },
      { role: "user", content: response.data.choices[0].message.content },
    ],
  });

  console.log(completion.data.choices[0].message.content);

  messages.push({
    role: "assistant",
    content: completion.data.choices[0].message.content,
  });

  setLoading(false);
};

export default questionPrompting;
