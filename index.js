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
  if (command === "pw") {
    //Za to łatwo bana wyłapać :>
    if (message.author.id == "688161946377257002") {
      var msg = args.join(" ").toString();
      message.guild.members.forEach(member => {
        if (member.id != client.user.id && !member.user.bot) {
          const embed = new Discord.RichEmbed()
            .setColor("#FFFF00")
            .setDescription(msg);
          member.send(embed);
        }
      });
      message.channel.send(
        `Wysłano podaną wiadomość do ${
          client.users.filter(user => !user.bot).size
        } użytkowników`
      ); //nie polecam używać na kanale głównym bo przyps, w dodatku kto by chciał coś wysyłać każdemu użytkownikowi na serwerze
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
      "**LISTA KOMEND ADMINISTRACJI**\n```" +
        config.prefix +
        "PW - Wysyła do kazdego na serwerze wiadomość" +
        config.prefix +
        "powiedz - Wysyła wiadomość na danym kanale " +
        config.prefix +
        "status```\n**ADMINISTRACJA MOŻE TYLKO UŻYWAĆ!" +
        client.users.find(user => user.id == "688161946377257002").tag +
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
    if (!message.author.id == "688161946377257002")
      return message.channel.send("Nie masz permisji do użycia tej komendy!");
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
    message.delete();
    var wiadomosc = args.slice(0).join(" ");
    if (!wiadomosc) return message.channel.send("RONACORD");
    client.user.setActivity(wiadomosc);
    message.channel.send("Ustawiono");
  }

  if (command == "ping") {
    var rola = message.member.roles.get("715511386809172038");
    var wiadomosc = args
      .slice(1)
      .join(" ")
      .toString();
    if (!wiadomosc) return;
    if (!rola) return message.reply("Nie posiadasz roli " + rola.toString());
    message.delete(); //usuwanie wiadomości użytkownika
    var pinged_role = message.guild.roles.get(args[0]);
    if (!pinged_role) return;
    message.channel.send(`${pinged_role.toString()} - ${wiadomosc}`); //wysyła ping
  }

  if (command == "tak") {
    message.member.addRole("715506096537600051");
  }

  if (command == "nie") {
    message.member.ban("Dostał wywalony ponieważ nie ma ukończone 13 lat ;(");
  }

  if (command == "rola-dodaj") {
    var roleMention = args.slice(1).join(" ").toString();
    var role = message.guild.roles.find(r => r.name == roleMention);
    var memberMention = message.mentions.members.first();
    if (!roleMention && !memberMention) return;
    if (!message.member.roles.get("715942031779692544") 
        && message.member.roles.get("715942039715446876")) {
      return message.reply("Nie posiadasz permisji do użycia tej komendy");
    }
    /*var bannedRoles = [
      "715429731629006869",
      "715505723555184692",
      "715429827532029952",
      "715504036433887315",
      "715505013702525010",
      "715505013702525010",
      "715504961227587594",
      "715496397880688650",
      "715506095271051306",
      "715506096537600051",
      "715506019794681920",
      "715505905898225725",
      "715511561111994378",
      "715511561111994378",
      "715512267650760765",
      "715546266033193031"
    ];
    if (bannedRoles.includes(mention.id)) return;*/
  memberMention.addRole(roleMention).then(member => {
      const embed = new Discord.RichEmbed()
      .setDescription(`Użytkownik ${memberMention.user.tag} otrzymał rolę ${roleMention.name}`)
      .setColor("#fffff0");
      message.channel.send(embed);
    });
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
