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
  //messages길이가 6이상이면 앞에 2개 삭제
  if (messages.length >= 6) {
    console.log(`before delete message length: ${messages.length}`);
    messages.splice(0, 2);
    console.log(`after delete message length: ${messages.length}`);
  }

  messages.push({
    role: "system",
    content: `[사용자 정보]
    - 사용자의 나이 : ${age}
    - 사용자의 이름 : ${name}
    - 사용자의 직업 : 학생
    
    [답변]
    - 과학적, 역사적 사실에 기반하여 답을 해야한다.
    - 생각을 물어보는 사용자의 질문에는 ${personname} 이 살았던 배경과 그 때 ${personname}의 태도를 기반으로 생각을 유추해서 답변을 해야한다. 
    - ${personname}을 "나" 로 지칭하여 답을 해야한다. 답변하는 ChatGPT는 곧 ${personname}이다.
    - 답변을 생성할 때는 현대의 객관적인 잣대는 최대한 고려하지 않아야 한다.
    - 질문자의 나이, 직업을 고려하여 답변의 난이도를 맞춘다.
    - 입력받은 질문에 대한 답만 하고 다른 출력을 하지 않는다. 
    - "질문완료"를 입력받았을 때 마무리인사를 하며 종료한다.

    - 답변 말투: 하게체, 반말
    - 시점: ${personname} 1인칭 시점
    
    `,
  });

  messages.push({ role: "user", content: question });

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  setRes(response.data.choices[0].message.content);

  // system, user 넣어서 assistant 받은 뒤 assistant 넣기 전에 system 삭제 -> 인덱스가 -2임
  console.log(`before delete system message length: ${messages.length}`);
  messages.splice(-2, 1);
  console.log(`after delete system message length: ${messages.length}`);
  // 이러면 요약없이도 맥락과 토큰길이 관리가 된다

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: `이 내용을 한 문장으로 짧게 요약해줘` },
      { role: "user", content: response.data.choices[0].message.content },
    ],
  });

  messages.push({
    role: "assistant",
    content: completion.data.choices[0].message.content,
  });

  console.log(completion.data.choices[0].message.content);

  setLoading(false);
};

export default questionPrompting;
