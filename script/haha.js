const fs = require("axios");
module.exports = {
	config: {
			name: "haha",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "hahaha") return message.reply("sanaol happy chat mo owner ko si churchill eto fblink nia https://www.facebook.com/profile.php?id=100087212564100 sasaya ka lalo sa kanya HAHA");
}
};