const axios = require('axios');
const fs = require('fs');

module.exports = {
    config: {
        name: "movieclips",
        aliases: ["clips"],
        version: "1.0",
        author: "Samir Œ",
        countDown: 5,
        role: 2,
        shortDescription: "clips videos",
        longDescription: "get clips videos",
        category: "clips",
        guide: {
            en: "{pn} "
        }
    },
    onStart: async function ({ event, message, getLang, threadsData, api, args }) {
        global.api = {
            samirApi: "https://apis-samir.onrender.com"
        };

        const query = args.join(" ");
        if (!query) {
            message.reply("Please provide a query for the clip video.");
            return;
        }

        const BASE_URL = `${global.api.samirApi}/clips?text=${encodeURIComponent(query)}`;
        const searchingMessage = await message.reply("🔎searching your clip 🐍");

        try {
            let res = await axios.get(BASE_URL);
            if (res.status === 200) {
                const apiResponse = res.data;
                if (apiResponse.length > 0) {
                    const randomIndex = Math.floor(Math.random() * apiResponse.length);
                    const randomClip = apiResponse[randomIndex];
                    const vidUrl = randomClip.src;
                    const title = randomClip.title;

                    const response = await axios.get(vidUrl, { responseType: 'stream' });
                    const videoStream = fs.createWriteStream('clip.mp4');
                    response.data.pipe(videoStream);

                    await new Promise((resolve, reject) => {
                        videoStream.on('finish', resolve);
                        videoStream.on('error', reject);
                    });

                    await api.sendMessage({ attachment: fs.createReadStream('clip.mp4'), body: `Title: ${title}` }, event.threadID);
                    fs.unlinkSync('clip.mp4');
                } else {
                    message.reply("No clips found.");
                }
            } else {
                message.reply("API Request Failed with Status Code:", res.status);
                message.reply("Something went wrong while fetching the video.");
            }
        } catch (e) {
            message.reply("Error during API request:", e);
        } finally {
            api.unsendMessage(searchingMessage.messageID);
        }
    }
}
