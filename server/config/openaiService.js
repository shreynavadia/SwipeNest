const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const generateMessage = async (inputKeywords) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate a message regarding ${inputKeywords}`,
    max_tokens: 50
  });
  return completion.data.choices[0].text;
};

module.exports = { generateMessage };
