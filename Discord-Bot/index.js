const { Client, Events, GatewayIntentBits, Message, InteractionCallback } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if( message.content.startsWith("create")){
    const Url = message.content.split("create")[1]
    return message.reply({
      content: "Generating short ID for:" + Url
    })
  }
  message.reply({
    content: "Hi From Bot",
  });
});

client.on("interactionCreate", (interaction) =>{
  interaction.reply("Pong!")
})
