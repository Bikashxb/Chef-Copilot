import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { HfInference } from '@huggingface/inference';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

app.use(express.json());  // To parse JSON requests

app.use(cors({
    origin: "*"
  }));
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe...
`;

app.post('/get-recipe', async (req, res) => {
        const { ingredients } = req.body;
        const ingredientsString = ingredients.join(", ");

        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe with its name` },
            ],
            max_tokens: 1024,
        });

        res.json({ recipe: response.choices[0].message.content });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
