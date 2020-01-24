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
console.log(`${client.user.tag} gotowy do pracy na ${client.guilds.size} serwerach przy ${client.users.filter(user => !user.bot).size} użytkownikach!`);
})
client.on("message", (message) => {
const prefix = config.prefix;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
  if (command === "pw") {
 if (message.author.id == "558380095870468169") {
    message.guild.members.forEach(member => {
      if (member.id != client.user.id && !member.user.bot) member.send(args);
    });
  message.channel.send(`Wysłano podaną wiadomość do ${client.users.filter(user => !user.bot).size} użytkowników`)
  } else {
message.channel.send("Nie masz permisji do użycia tej komendy!")
  }
}
if (message.content.startsWith('<@574225325731348490>') || command === "help" || command === "pomoc") {
message.channel.send('Cześc! Moje Komendy to:\n```' + config.prefix + 'pw, ' + config.prefix + 'powiedz```\n **Permisje do używania komend ma tylko: <@574225325731348490>!**')
} else if (message.content.startsWith('Cześć') || message.content.startsWith('Cześć!') || message.content.startsWith('Czesc')) { message.channel.send("Cześć!"); }
  else if (message.content.startsWith('Hej') || message.content.startsWith('Hej!')) { message.channel.send('Hej!'); }
if (command === "powiedz") {
if (message.author.id == "657230340032823326") {
let wiadomosc = args.slice(0).join(" ");
if (wiadomosc) {
message.channel.send(wiadomosc);
} else { message.channel.send("Wpisz co mam powiedzieć!") }
} else {
message.channel.send("Nie masz permisji do użycia tej komendy!")
  }}
if (command === "status") {
if (message.author.id == "55838009587046816") 
    let wiadomosc = args.slice(0).join(" ");
if (wiadomosc) {
client.user.setActivity(wiadomosc);
message.channel.send("Ustawiono podany status!")
} else { message.channel.send("Wpisz co mam powiedzieć!") }
} else {
message.channel.send("Nie masz permisji do użycia tej komendy!")
  }}
});
client.login(config.token)