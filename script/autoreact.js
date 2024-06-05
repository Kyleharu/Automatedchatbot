const axios = require('axios');

const onMAIN = async ({ api, event }) => {
    api.sendMessage('Auto React will automatically react to a user\'s message.', event.threadID);
};

const onChat = async (context) => { 
    const { api, event } = context;

    // Probability of 40%
    if (Math.random() < 0.9) {
        const response = await axios.get(`https://lianeapi.onrender.com/autoreact?query=${encodeURIComponent(event.body)}`);
        const emoji = response.data.message;
        api.setMessageReaction(emoji, event.messageID, () => {}, true);
    }
};

module.exports = {
    config: {
        name: "autoreact",
        version: "1.0",
        credits: "Kyle Bait-it",
        commandCategory: "Noprefix",
        description: "Auto react your message",
        hasPermission: 2,
        usePrefix: false,
        cooldown: 5,
    },
    onMAIN,
    onStart: async (context) => {
        await onMAIN(context); 
    },
    run: async (context) => {
        await onMAIN(context); 
    },
    onChat,
    handleEvent: onChat,
};
