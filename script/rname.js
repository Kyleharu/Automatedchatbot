
module.exports.config = {
	name: "rname",
  role: 0,
	version: "1.0.1",
  hasPrefix: false,
	credits: "Mirai Team",
	description: "Random biệt danh tiếng NHẬT 🤔",
	commandCategory: "other",
	cooldowns: 5,
	dependencies: {
		"request": ""
	},
	envConfig: {
		"APIKEY": "mi451266190"
	}
};

module.exports.run = async ({ api, event }) => {
	return global.nodemodule["request"](`https://www.behindthename.com/api/random.json?usage=jap&gender=f&key=${global.configModule[this.config.name].APIKEY}`, (err, response, body) => {
		const data = JSON.parse(body);
		api.changeNickname(`${data.names[0]} ${data.names[1]}`, event.threadID, event.senderID);
	});
}
