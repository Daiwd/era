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
  client.user.setActivity(
    `YoloCraft | ${client.guilds.get("714236135869775913").members.size}`
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
  if (command === "pw") {
    //Za to łatwo bana wyłapać :>
    if (message.author.id == "380427062390947852") {
      var members = message.guild.members;
      members.tap(member => {
        if (member.id != client.user.id && !member.user.bot) member.send(args);
        message.channel.send(
          `Wysłano podaną wiadomość do ${members.size} użytkowników`
        );
      });
    } else {
      message.channel.send("Nie masz permisji do użycia tej komendy!");
    }
  }

  //unikałbym takiej składni w przyszłości, troche tu niepoukładanie
  if (
    message.mentions.users.get(client.user.id) ||
    command === "help" ||
    command === "pomoc"
  ) {
    message.channel.send(
      "TYCH KOMEND NIE MOŻESZ UŻYWAĆ! to:\n```" +
        config.prefix +
        "pw, " +
        config.prefix +
        "powiedz, " +
        config.prefix +
        "status```\n**Permisje do używania komend ma tylko: " +
        client.users.find(user => user.id == 380427062390947852).tag +
        "!**"
    );
  } else if (
    message.content.startsWith("Cześć") ||
    message.content.startsWith("Cześć!") ||
    message.content.startsWith("Czesc")
  ) {
    message.channel.send("Cześć!");
  } else if (
    message.content.startsWith("Hej") ||
    message.content.startsWith("Hej!")
  ) {
    message.channel.send("Hej!");
  }

  if (command === "powiedz") {
    if (!message.author.id == "380427062390947852")
      return message.channel.send("Nie masz permisji do użycia tej komendy!"); //poprawiłem trochę kod by było bardziej przejrzyście
    var wiadomosc = args.slice(0).join(" ");
    if (!wiadomosc) return message.reply("Nie napisano żadnej wiadomości");
    message.channel.send(wiadomosc);
  }

  if (command === "status") {
    if (!message.author.id == "380427062390947852")
      return message.channel.send("Nie masz permisji do użycia tej komendy!");
    var wiadomosc = args.slice(0).join(" ");
    if (!wiadomosc) return message.channel.send("RONACORD");
    client.user.setActivity(
      wiadomosc +
        `| Osoby: ${client.guilds.get("714236135869775913").members.size}`
    );
    message.channel.send("Status został zmieniony");
  }
});
client.login(config.token);
