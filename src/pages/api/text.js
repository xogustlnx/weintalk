import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config({ path: __dirname + "/.env" });

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

var Person = "아인슈타인";
var Fname = "채현";
var Lname = "신";
var Age = "22";
var Interest = "학생";

export default async function (req, res) {
  var response;
	
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }
	
	
  if(require.info) {
	  Lname = require.info.Lname;
	  Fname = require.info.Fname;
	  Interest = require.info.Interest;
	  Age = require.info.Interest;
	  return;
	  // 초기화, 정보에 따른 프롬프팅, 출력 x
   }

	
  if(require.person) {
	Person = require.info.Person;
	response = await openai.createCompletion({
	model: "text-davinci-003",
	prompt: formatPrompt(),
	temperature: 0,
	max_tokens: 100,
	});
    res.status(200).json({ result: response.data.choices[0].text });
    return;  // 프롬프팅, 인사말 출력
  }

	
  if(require.question) {
	var prompt = "";
	if(require.question.num > 5){  // 질문이 5번 넘어가면 초기화를 해준다
		response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: formatPrompt(),
		temperature: 0,
		max_tokens: 100,
		}); // 답변을 프론트 단으로 보내진 않는다
	}
	  
	response = await openai.createCompletion({ // 질문에 대한 답변
	model: "text-davinci-003",
	prompt: require.question.prompt,
	temperature: 0,
	max_tokens: 100,
	});
	res.status(200).json({ result: response.data.choices[0].text }); // 답변 보내기
    return; // 질문 입력에 따른 answer 출력
  }
  
	return;
}


function readText(filename){
	const fs = require('fs');
	const filePath = filename;
	var data = ""
	try {
	  const data = fs.readFileSync(filePath, 'utf8');
	  return data;
	} catch (err) {
	  console.error('파일을 읽어오는 도중 에러가 발생했습니다:', err);
	  return "Error";
	}
}

function formatPrompt() {
	var prompt = readText("prompt.txt");
	prompt = prompt.replace("{0}", Person);
	prompt = prompt.replace("{1}", Age);
	prompt = prompt.replace("{2}", Lname + Fname);
	prompt = prompt.replace("{3}", Interest);
	console.log(prompt);
    return prompt;
}