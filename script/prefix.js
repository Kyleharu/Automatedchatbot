const fs = require("fs");

module.exports.config = {
	name: "prefix",
	version: "1.0.1",
	role: 0,
	credits: "cliff",
	description: "Display the prefix of your bot",
	hasPrefix: false,
	usages: "prefix",
	cooldown: 5,
	aliases: ["prefix", "prefi"],
};

module.exports.run = function ({ api, event, prefix, admin }) {
	const { threadID, messageID, body } = event;

	if (body.toLowerCase() === `${prefix}prefix`) {
		api.sendMessage(
			"This command cannot be executed manually.",
			threadID,
			messageID
		);
		return;
	}

	const response = prefix ? `Yo, my prefix is [ 𓆩 ${prefix} 𓆪 ]` : "Yo, my prefix is [ 𓆩 i dont have prefix  𓆪 ]";
	const attachmentPath = prefix ? "/cache2/prefix.jpeg" : "/cache2/prefix_no_prefix.jpeg";

	api.sendMessage(
		{
			body: `${response}\n\n𝗦𝗢𝗠𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗧𝗛𝗔𝗧 𝗠𝗔𝗬 𝗛𝗘𝗟𝗣 𝗬𝗢𝗨:\n➥ ${prefix}help [number of page] -> see commands\n➥ ${prefix}sim [message] -> talk to bot\n➥ ${prefix}callad [message] -> report any problem encountered\n➥ ${prefix}help [command] -> information and usage of command\n\nHave fun using it, enjoy! ❤️\nBot Developer: https://www.facebook.com/${admin}`,
			attachment: fs.createReadStream(__dirname + attachmentPath)
		},
		threadID,
		(err, messageInfo) => {
			if (err) return console.error(err);

			const voiceFile = fs.readFileSync(__dirname + attachmentPath);
			api.sendMessage(
				{
					attachment: voiceFile,
					type: "audio",
					body: "Hey, listen to my prefix information!",
				},
				threadID,
				() => {}
			);
			api.setMessageReaction("🚀", messageInfo.messageID, (err) => {}, true);
		}
	);
};
