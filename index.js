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
  if (command === "powiedz") {
    if (!message.author.id == "688161946377257002")
      return message.channel.send("Nie masz permisji do użycia tej komendy!"); //poprawiłem trochę kod by było bardziej przejrzyście
    var wiadomosc = args.slice(0).join(" ");
    if (!wiadomosc) return message.reply("Nie napisano żadnej wiadomości");
    const embed = new Discord.RichEmbed()
      .setColor("#ffff45")
      .setDescription(wiadomosc);
    message.channel.send(embed);
  }

  if (command === "status") {
    if (!message.author.id == "688161946377257002")
      return message.channel.send("Nie masz permisji do użycia tej komendy!");
    var wiadomosc = args.slice(0).join(" ");
    if (!wiadomosc) return message.channel.send("RONACORD");
    client.user.setActivity(wiadomosc);
    message.channel.send("Ustawiono");
  }
  if (command == "tak") {
    message.members.addRole("715506096537600051");
  }

  if (command == "nie") {
    message.member.ban("Dostał wywalony ponieważ nie ma ukończone 13 lat ;(");
  }
  if (command == "propozycja") {
    var suggestion = args.join(" ").toString();
    const embed = new Discord.RichEmbed()
      .setColor("#00ff00")
      .setAuthor(message.author.tag)
      .setDescription(suggestion);
    message.guild.channels
      .get("715520608502546463")
      .send(embed)
      .then(sentMessage => {
        sentMessage.react("👍");
        sentMessage.react("👎");
      });
  }

  if (command == "skarga") {
    var skarga = args.join(" ").toString();
    const embed = new Discord.RichEmbed()
      .setColor("#ff4d4d")
      .setAuthor(message.author.tag)
      .setDescription(skarga);
    message.guild.channels
      .get("715520630849667114")
      .send(embed)
      .then(sentMessage => {
        sentMessage.react("👍");
        sentMessage.react("👎");
      });
  }
});
client.login(config.token);
