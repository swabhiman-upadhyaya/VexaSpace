import { Router } from "express";
import agent from "../agents/code.agent.js"

const agentRouter = Router();

agentRouter.post("/invoke", async (req, res) => {
  try {
    const { message } = req.body;

    // BY AI START
    const response = await agent.invoke({ messages: [message] })
    // BY AI END
    
    res.json({ response });
  }
  catch (error) {
    console.log("Error invoking agent: ", error);
    res.status(500).json({ error: "Failed to invoke agent" })
  }
})

export default agentRouter;