const fs = require('fs');
module.exports = {
  config: {
    name: "women",
    version: "1.0",
    author: "mhm",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "women") {
      return message.reply({
        body: "𝐖𝐨𝐦𝐞𝐧 ☕",
        attachment: fs.createReadStream("women.mp3"),
      });
    }
  }
};