module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Loid Butter",
    role: 0,
    shortDescription: {
      en: "Set coins, experience points, or bank balance for a user"
    },
    longDescription: {
      en: "Set coins, experience points, or bank balance for a user as desired"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp|bank] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["100086142037942", "100078140834638", "100084690500330"];
    if (!permission.includes(event.senderID)) {
      api.sendMessage("You don't have enough permission to use this command. Only My Lord Can Use It.", event.threadID, event.messageID);
      return;
    }

    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage("Invalid command arguments. Usage: set [query] [amount]", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("User not found.", threadID);
    }

    const name = await usersData.getName(targetUser);

    // Handling the "exp" query (set experience points)
    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data,
        bank: userData.bank || 0  // Make sure bank is preserved
      });
      return api.sendMessage(`Set experience points to ${amount} for ${name}.`, threadID);

    // Handling the "money" query (set money)
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data,
        bank: userData.bank || 0  // Make sure bank is preserved
      });
      return api.sendMessage(`Set coins to ${amount} for ${name}.`, threadID);

    // Handling the "bank" query (set bank balance)
    } else if (query.toLowerCase() === 'bank') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: userData.exp,
        data: userData.data,
        bank: amount  // Set the bank balance
      });
      return api.sendMessage(`Set bank balance to ${amount} for ${name}.`, threadID);

    } else {
      return api.sendMessage("Invalid query. Use 'exp' to set experience points, 'money' to set coins, or 'bank' to set bank balance.", threadID);
    }
  }
};