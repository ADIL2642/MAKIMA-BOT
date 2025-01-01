module.exports = {
  config: {
    name: "rule",
    aliases: ["gcrule"],
    author: "ADIL HASAN",
    version: 1.0,
    role: 0,
    shortDescription: {
      en: "Says rule to the user."
    },
    longDescription: {
      en: "Responds with a to the user invoking the command."
    },
    category: "general",
    guide: {
      en: "Just use the command and the bot will say rule you!"
    }
  },
  event: null,
  onStart: async function ({ api, event }) {
    api.sendMessage("𝔾𝕣𝕠𝕦𝕡 ℝ𝕦𝕝𝕖𝕤: \n" +
                    "1𝕤𝕥 𝕣𝕦𝕝𝕖: ৩০ দিন online 🟢 না থাকলে, গ্রুপ থেকে Remove❌ দেওয়া হবে।\n" +
                    "2𝕟𝕕 𝕣𝕦𝕝𝕖: কোনো গ্রুপের link 🔗 allow না🚫.\n" +
                    "3𝕣𝕕 𝕣𝕦𝕝𝕖: Spam করলে Remove❌ দেওয়া হবে। \n" +
                    "4𝕥𝕙 𝕣𝕦𝕝𝕖: সবাই সবাইকে Respect 🫡 করবে।\n" +
                    "5𝕥𝕙 𝕣𝕦𝕝𝕖: 18+ কিছু দেওয়া বা করা যাবে না ❌।\n" +
                    "এর পর আরও Rules add➕ or remove❌ হতে পারে।", event.threadID);
  },
  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase() === "gcrule" || event.body.toLowerCase() === "rule")) {
      message.reply("𝔾𝕣𝕠𝕦𝕡 ℝ𝕦𝕝𝕖𝕤: \n" +
                    "1𝕤𝕥 𝕣𝕦𝕝𝕖: ৩০ দিন online 🟢 না থাকলে, গ্রুপ থেকে Remove❌ দেওয়া হবে।\n" +
                    "2𝕟𝕕 𝕣𝕦𝕝𝕖: কোনো গ্রুপের link 🔗 allow না🚫.\n" +
                    "3𝕣𝕕 𝕣𝕦𝕝𝕖: Spam করলে Remove❌ দেওয়া হবে। \n" +
                    "4𝕥𝕙 𝕣𝕦𝕝𝕖: সবাই সবাইকে Respect 🫡 করবে।\n" +
                    "5𝕥𝕙 𝕣𝕦𝕝𝕖: 18+ কিছু দেওয়া বা করা যাবে না ❌।\n" +
                    "এর পর আরও Rules add➕ or remove❌ হতে পারে।");
    }
  }
};