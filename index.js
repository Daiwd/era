//glitch.com
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//bot
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(
    `${client.user.tag} gotowy do pracy na ${
      client.guilds.size
    } serwerach przy ${
      client.users.filter(user => !user.bot).size
    } użytkownikach!`
  );
});
client.on("message", message => {
  if (message.author.bot) return;
  const prefix = config.prefix;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "powiedz") {
    if (!message.content.startsWith(prefix)) return;
    if (!message.author.id == "735201542554124340")
      return message.channel.send("Oj Oj nie możesz użyć komendy");
    var wiadomosc = args.slice(0).join(" ");
    if (!wiadomosc) return message.reply("Wpisz jaką wiadomość mam wysłać");
    const embed = new Discord.RichEmbed()
      .setColor("#25c059")
      .setDescription(wiadomosc);
    message.channel.send(embed);
  }
});
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('your token here');