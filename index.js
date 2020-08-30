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
  if (command === "powiedz") {
    if (!message.content.startsWith(prefix)) return;
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
    if (!message.content.startsWith(prefix)) return;
    if (!message.author.id == "688161946377257002")
      return message.channel.send("Nie masz permisji do użycia tej komendy!");
    message.delete();
    var wiadomosc = args.slice(0).join(" ");
    if (!wiadomosc) return message.channel.send("RONACORD");
    client.user.setActivity(wiadomosc);
    message.channel.send("Ustawiono");
  }
  if (command == "mute") {
    if (!message.content.startsWith(prefix)) return;
    if (
      !message.member.roles.get(config.admID) &&
      !message.member.roles.get(config.admID2)
    )
      return console.log("nie działa");
    let muteRole = message.guild.roles.get("715512265620848681");
    let powod = args
      .slice(2)
      .join(" ")
      .toString();
    let member = message.mentions.members.first();
    let cooldown = parseInt(args[1]);
    console.log(
      muteRole.name + " " + powod + " " + member.user.tag + " " + cooldown
    );
    if (member.roles.get(muteRole.id)) return;
    member.addRole(muteRole.id).then(muted => {
      console.log("muted");
      const embed = new Discord.RichEmbed()
        .setDescription(
          `Użytkownik ${muted.user.tag} został zmutowany przez ${message.author.tag} za \`${powod}\` na ${cooldown} sekund`
        )
        .setColor("#fffff0");
      message.channel.send(embed);
      member.send(embed.setDescription(`Zostałeś zmutowany przez ${message.author.tag} za \`${powod}\` na ${cooldown} sekund`)
                 .setFooter(member.user.avatarURL));
      setTimeout(function() {
        muted.removeRole(muteRole);
      }, cooldown * 1000);
    });
  }
});
client.login(config.token);
