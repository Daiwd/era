const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.on("ready", () => {
console.log(`${client.user.tag} gotowy do pracy na ${client.guilds.size} serwerach przy ${client.users.size} użytkownikach!`);
})
client.on("message", (message) => {
const prefix = config.prefix;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
  if (command === "pw" && message.author.id == "403666583177920532" || message.author.id == "558380095870468169") {
     let pwmessage = args.slice(0).join(" ");
    message.guild.members.forEach((member, members) => {
      if (member.id != client.user.id && !member.user.bot) member.send(pwmessage);
      message.channel.send(`Wysłano do ${members.size}`)
    });
  }
});
client.login(config.token)