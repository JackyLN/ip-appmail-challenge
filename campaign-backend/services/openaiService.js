const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateCampaignPrompt(month, keyDates, productCatalog) {
  const prompt = `Create a dynamic series of 10 email campaigns for...` // replace with full template, use ${month}, ${keyDates}, ${productCatalog}
  
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });

  return JSON.parse(res.choices[0].message.content);
}

module.exports = { generateCampaignPrompt };
