module.exports = {
  config: {
    name: "yesorno",
    version: "1.0",
    author: "Hassan",
    role: 0,
    shortDescription: "Get a random yes or no",
    longDescription: "This command will give you a random yes or no answer with a spinning animation.",
    category: "Fun 🎉",
  },

  async onStart({ message }) {
    const spinningMessage = "𝐏𝐫𝐞𝐝𝐢𝐜𝐭𝐢𝐧𝐠 𝐨𝐩𝐭𝐢𝐨𝐧... 👀";
    await message.reply(spinningMessage);

    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = ["Yes", "No"];
        const randomIndex = Math.floor(Math.random() * responses.length);
        const response = responses[randomIndex];

        resolve(response);
      }, 2000);
    })
    .then((response) => {
      message.reply(response);
    });
  }
};