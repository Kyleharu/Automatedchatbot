const axios = require("axios");

module.exports.config = {
	name: "cookie",
	version: "5.8",
	hasPrefix: false,
	credits: "Hazeyy",
	description: "( 𝙲𝚘𝚘𝚔𝚒𝚎𝚜 )",
	usage: "( 𝙴𝚡𝚝𝚛𝚊𝚌𝚝 𝙲𝚘𝚘𝚔𝚒𝚎𝚜 )",
	cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
	if (!(event.body.includes("cookie") || event.body.includes("Cookie"))) return;

	const commandArgs = event.body.split(/\s+/);
	commandArgs.shift();

	if (commandArgs.length !== 2) {
		return api.sendMessage("🍪 𝙲𝚘𝚘𝚔𝚒𝚎 𝙶𝚎𝚝𝚝𝚎𝚛\n\n𝚄𝚜𝚊𝚐𝚎: 𝚌𝚘𝚘𝚔𝚒𝚎 >𝚎𝚖𝚊𝚒𝚕< >𝚙𝚊𝚜𝚜𝚠𝚘𝚛𝚍<", event.threadID, event.messageID);
	}

	const [email, password] = commandArgs.map(arg => arg.trim());

	await api.sendMessage("🍪 | 𝙴𝚡𝚝𝚛𝚊𝚌𝚝𝚒𝚗𝚐 𝙲𝚘𝚘𝚔𝚒𝚎𝚜...", event.threadID);

	try {
		const res = await axios.get(`https://hiroshi-api-hub.replit.app/tool/fbtoken?username=${email}&password=${password}`);

		const userData = res.data;

		setTimeout(async () => {
			await api.sendMessage("🍪 𝐇𝐞𝐫𝐞'𝐬 𝐲𝐨𝐮𝐫 𝐜𝐨𝐨𝐤𝐢𝐞𝐬\n\n" + userData, event.threadID, event.messageID);
		}, 6000); 
	} catch (error) {
		console.error("🤖 𝙴𝚛𝚛𝚘𝚛:", error);
		setTimeout(async () => {
			await api.sendMessage("🤖 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚌𝚘𝚘𝚔𝚒𝚎𝚜", event.threadID, event.messageID);
		}, 6000); 
	}
}
