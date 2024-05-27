const axios = require('axios');

module.exports.config = {
  name: 'ai3',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['automated', 'ai3'],
  description: "An AI command powered by Snowflakes AI",
  usage: "automated [prompt]",
  credits: 'Kyle',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  
  if (!input) {
    api.sendMessage(`𝙃𝙚𝙡𝙡𝙤 𝙄 𝙖𝙢 𝘼𝙪𝙩𝙤𝙢𝙖𝙩𝙚𝙙 𝘽𝙤𝙩

━━━━━━━━━━━━━━━

 𝑷𝑳𝑬𝑨𝑺𝑬 𝑷𝑹𝑶𝑽𝑰𝑫𝑬 𝑨 𝑸𝑼𝑬𝑺𝑻𝑰𝑶𝑵/𝑸𝑼𝑬𝑹𝒀`, event.threadID, event.messageID);
    return;
  }
  
  api.sendMessage(`🔍Searching for Automated AI response....`, event.threadID, event.messageID);
  
  try {
    const { data } = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(input)}`);
    if (data.response) {
      api.sendMessage(data.response + "\n\n𝙘𝙧𝙚𝙙𝙞𝙩𝙨: https://www.facebook.com/itssmekylebaitit", event.threadID, event.messageID);
    } else {
      api.sendMessage('No response found.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
