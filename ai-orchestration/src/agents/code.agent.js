import "dotenv/config"; 
import { ChatMistralAI } from "@langchain/mistralai";
import {listFiles, readFiles, updateFiles} from "./tools.js";
import { createAgent } from "langchain";

const model = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: process.env.MISTRALAI_API_KEY,
  "temperature": 0.2,
});

const agent = createAgent({
  model,
  tools: [listFiles, readFiles, updateFiles],
})

agent.invoke({
  messages: [
    {
      role: "user",
      content: "Make a simple button in HTML and CSS that says 'Click Me' and is centered on the page and after clicking it, it should show Hello world with a nice animation and another thing no need to create any new files just update the src/app.jsx",
    }
  ]
})