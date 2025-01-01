const axios = require("axios");
const fs = require('fs');

const baseApiUrl = async () => {
	const base = await axios.get(
`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
	);
	return base.data.api;
};

module.exports = {
	config: {
		name: "ytb",
		version: "1.1.4",
		aliases: ['youtube'],
		author: "dipto",
		countDown: 5,
		role: 0,
		description: {
			en: "Download video, audio, and info from YouTube"
		},
		category: "media",
		guide: {
			en: "  {pn} [video|-v] [<video name>|<video link>]: use to download video from YouTube."
				+ "\n   {pn} [audio|-a] [<video name>|<video link>]: use to download audio from YouTube"
				+ "\n   {pn} [info|-i] [<video name>|<video link>]: use to view video information from YouTube"
				+ "\n   Example:"
				+ "\n {pn} -v chipi chipi chapa chapa"
				+ "\n {pn} -a chipi chipi chapa chapa"
				+ "\n {pn} -i chipi chipi chapa chapa"
		}
	},
	onStart: async ({ api, args, event, commandName }) => {
		const action = args[0].toLowerCase();
		
					const checkurl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
    const urlYtb = checkurl.test(args[1]);
		let videoID
  if(urlYtb){
		if (action === '-v' || action === '-a') {
			try {
				const format = action === '-v' ? 'mp4' : 'mp3';
				const path = `ytb_${format}_${videoID}.${format}`;
	  
	const match = args[1].match(checkurl);
  videoID = match ? match[1] : null;
				const { data: { title, downloadLink, quality } } = await axios.get(`${await baseApiUrl()}/ytDl3?link=${videoID}&format=${format}&quality=3`);
await api.sendMessage({
					body: `• ✅𝗛𝗲𝗿𝗲 𝘆𝗼𝘂𝗿 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗜𝘁𝗲𝗺 ➣\n𝗧𝗶𝘁𝗹𝗲: ${title}\n• 𝗤𝘂𝗮𝗹𝗶𝘁𝘆: ${quality}`,
					attachment: await dipto(downloadLink, path)
				}, event.threadID, () => fs.unlinkSync(path), event.messageID);
			} catch (e) {
				console.error(e);
				return api.sendMessage('❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐭𝐡𝐞 𝐯𝐢𝐝𝐞𝐨/𝐚𝐮𝐝𝐢𝐨. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫.', event.threadID, event.messageID);
			}
		} }
		args.shift();
		let keyWord = args.join(" ");
		const maxResults = 6;
		let result;
		try {
			result = (await axios.get(`${await baseApiUrl()}/ytFullSearch?songName=${keyWord}`)).data.slice(0, maxResults);
		} catch (err) {
			return api.sendMessage("❌ 𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝: " + err.message, event.threadID, event.messageID);
		}

		if (result.length === 0) {
			return api.sendMessage("⭕ 𝐍𝐨 𝐬𝐞𝐚𝐫𝐜𝐡 𝐫𝐞𝐬𝐮𝐥𝐭𝐬 𝐦𝐚𝐭𝐜𝐡 𝐭𝐡𝐞 𝐤𝐞𝐲𝐰𝐨𝐫𝐝: " + keyWord, event.threadID, event.messageID);
		}

		let msg = "";
		let i = 1;
		const thumbnails = [];
		for (const info of result) {
			thumbnails.push(diptoSt(info.thumbnail, `thumbnail.jpg`));
			msg += `${i++}. ${info.title}\nTime: ${info.time}\nChannel: ${info.channel.name}\n\n`;
		}

		api.sendMessage({
			body: msg + "Reply to this message with a number to choose",
			attachment: await Promise.all(thumbnails)
		}, event.threadID, (err, info) => {		global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				author: event.senderID,
				result,
				action
			});
		}, event.messageID);
	},

	onReply: async ({ event, api, Reply }) => {
		const { result, action } = Reply;
		const choice = parseInt(event.body);

		if (isNaN(choice) || choice <= 0 || choice > result.length) {
			return api.sendMessage('❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐜𝐡𝐨𝐢𝐜𝐞. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐰𝐢𝐭𝐡 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐧𝐮𝐦𝐛𝐞𝐫.', event.threadID, event.messageID);
		}

		const selectedVideo = result[choice - 1];
		const videoID = selectedVideo.id;

		if (action === '-v' || action === 'video' || action === 'mp4' || action === '-a'  || action === 'audio' || action === 'mp3' || action === 'music') {
			try {
				let format = ['-a', 'audio', 'mp3', 'music'].includes(action) ? 'mp3' : 'mp4';
				const path = `ytb_${format}_${videoID}.${format}`;
				const { data: { title, downloadLink, quality } } = await axios.get(`${await baseApiUrl()}/ytDl3?link=${videoID}&format=${format}&quality=3`);

				api.unsendMessage(Reply.messageID);
				await api.sendMessage({
					body: `✅𝗛𝗲𝗿𝗲 𝘆𝗼𝘂𝗿 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗜𝘁𝗲𝗺 ➣\n• 𝗧𝗶𝘁𝗹𝗲: ${title}\n• 𝗤𝘂𝗮𝗹𝗶𝘁𝘆: ${quality}`,
					attachment: await dipto(downloadLink, path)
				}, event.threadID, () => fs.unlinkSync(path), event.messageID);
			} catch (e) {
				console.error(e);
				return api.sendMessage('❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐭𝐡𝐞 𝐯𝐢𝐝𝐞𝐨/𝐚𝐮𝐝𝐢𝐨. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫.', event.threadID, event.messageID);
			}
		}

	if (action === '-i' || action === 'info') {
			try {
				const { data } = await axios.get(`${await baseApiUrl()}/ytfullinfo?videoID=${videoID}`);
				api.unsendMessage(Reply.messageID);
				await api.sendMessage({
					body: `✨ | 𝚃𝚒𝚝𝚕𝚎: ${data.title}\n⏳ | 𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗: ${data.duration / 60} minutes\n𝚁𝚎𝚜𝚘𝚕𝚞𝚝𝚒𝚘𝚗: ${data.resolution}\n👀 | 𝚅𝚒𝚎𝚠 𝙲𝚘𝚞𝚗𝚝: ${data.view_count}\n👍🏻 | 𝙻𝚒𝚔𝚎𝚜: ${data.like_count}\n📬 | 𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜: ${data.comment_count}\n♻️ | 𝙲𝚊𝚝𝚎𝚐𝚘𝚛𝚒𝚎𝚜: ${data.categories[0]}\n🌐 | 𝙲𝚑𝚊𝚗𝚗𝚎𝚕: ${data.channel}\n🧍🏻‍♂️ | 𝚄𝚙𝚕𝚘𝚊𝚍𝚎𝚛 𝙸𝚍: ${data.uploader_id}\n👥 | 𝚂𝚞𝚋𝚜𝚌𝚛𝚒𝚋𝚎𝚛𝚜: ${data.channel_follower_count}\n🔗 | 𝙲𝚑𝚊𝚗𝚗𝚎𝚕 𝚄𝚛𝚕: ${data.channel_url}\n🔗 | 𝚅𝚒𝚍𝚎𝚘 𝚄𝚛𝚕: ${data.webpage_url}`,
					attachment: await diptoSt(data.thumbnail, 'info_thumb.jpg')
				}, event.threadID, event.messageID);
			} catch (e) {
				console.error(e);
				return api.sendMessage('❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐫𝐞𝐭𝐫𝐢𝐞𝐯𝐞 𝐯𝐢𝐝𝐞𝐨 𝐢𝐧𝐟𝐨. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫.', event.threadID, event.messageID);
			}
		}
	}
};
async function dipto(url,pathName) {
	try {
		const response = (await axios.get(url,{
			responseType: "arraybuffer"
		})).data;

		fs.writeFileSync(pathName, Buffer.from(response));
		return fs.createReadStream(pathName);
	}
	catch (err) {
		throw err;
	}
}
async function diptoSt(url,pathName) {
	try {
		const response = await axios.get(url,{
			responseType: "stream"
		});
		response.data.path = pathName;
		return response.data;
	}
	catch (err) {
		throw err;
	}
}
