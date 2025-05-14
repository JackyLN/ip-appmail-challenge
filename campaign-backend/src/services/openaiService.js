const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function loadPromptTemplate(filePath) {
  return fs.readFileSync(path.resolve(__dirname, '../prompts', filePath), 'utf-8');
}

function injectVariables(template, variables) {
  return template
    .replace(/{{\s*Month\s*}}/g, variables.month)
    .replace(/{{\s*Key_marketing_dates\s*}}/g, variables.keyMarketingDates)
    .replace(/{{\s*Product_catalog\s*}}/g, variables.productCatalog);
}

async function generateCampaignPrompt(monthYear, keyMarketingDates, productCatalog) {
  const template = loadPromptTemplate('campaign_prompt.txt');

  const prompt = injectVariables(template, {
    month: monthYear,
    keyMarketingDates,
    productCatalog
  });

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });

  return JSON.parse(res.choices[0].message.content);
}

module.exports = { generateCampaignPrompt };
