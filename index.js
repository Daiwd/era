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
// Create an event listener for new guild members
client.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(
    ch => ch.id === "720686891766120551"
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  const embedPowitalny = new Discord.RichEmbed().setDescription(
    "Witaj na serwerze zachęcamy do weryfikacji i dodanie sobie ról na #dodaj-role oraz przedstawienia się na #przedstaw-sie oraz napisanie na czacie głównym"
  );
  channel.send(`Hej ${member.toString()}`, { embed: embedPowitalny });
});
client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  // If the message content starts with "!kick"
  if (message.content.startsWith("&kick")) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick("Optional reason that will display in the audit logs")
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Użytkownik został pomyślnie wyrzucony :)`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply("I was unable to kick the member");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("Złe argumenty!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("Złe argumenty!");
    }
  }
});
// Create an event listener for messages
client.on("message", message => {
  // If the message is "ping"
  if (message.content === "siema") {
    // Send "pong" to the same channel
    message.channel.send("");
  }
});
// Create an event listener for messages
client.on("message", message => {
  // If the message is "ping"
  if (message.content === "hej") {
    // Send "pong" to the same channel
    message.channel.send("Hejka naklejka");
  }
});

// Create an event listener for messages
client.on("message", message => {
  // If the message is "ping"
  if (message.content === "pomoc") {
    // Send "pong" to the same channel
    message.channel.send("Pisz w tej sprawie do Łukanio#9515!");
  }

  // serwerinfo
  if (message.content === "serverinfo") {
    const embed = new Discord.RichEmbed()
      .setDescription(
        "Właściciel - Łukanio#9515" +
          "\n" +
          "Serwer Został stworzony - 02.06.2020" +
          "\n" +
          `Użytkowników jest: ${message.guild.members.size}` +
          "\n" +
          "Testowe: 0" +
          "\n" +
          "Głosowe: 0" +
          "\n" +
          "Region serwera - Europa"
      )
      .setTitle("Informacje o serwerze Komsndas")
      .setColor("#00ffa7");
    message.channel.send(embed);
  }

  if (message.content == "5567765") {
    message.member.addRole("720687227742584933");
    let channel = message.guild.channels.find(ch => ch.name === config.channelName);
    let channel2 = message.guild.channels.find(ch => ch.name === config.channelName2);
    if (channel == null || channel2 == null) {
      message.delete()
      return;
    } else {
      const embedPowitalny = new Discord.RichEmbed()
      .setDescription("Zostałeś zweryfikowany!")
      .setColor("#ff00ff");
      channel.send({embed: embedPowitalny});
      channel2.send({embed: embedPowitalny});
    }
  }

  if (message.content == "nie") {
    message.member.ban("Dostał wywalony ponieważ nie ma ukończone 13 lat");
  }
});

// Weryfikacja
client.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(
    ch => ch.id === "741282523815870534"
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(` ${member} Witaj na serwerze `);
});
// Create an event listener for new guild members
client.on("guildMemberRemove", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(
    ch => ch.id === "741282186350690385"
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(` ${member.user.tag} nas opuścił/a, jaka szkoda `);
});

// Logi
client.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(
    ch => ch.id === ("9741282186350690385")
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(` ${member.user.tag} Wbił na serwer ${member.guild.name}`);
});
// Logi
client.on("guildMemberRemove", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(
    ch => ch.id === "741282523815870534"
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(` ${member.user.tag} wyszedł z serwera`);
});
const embed = new Discord.RichEmbed();
client.login(config.token);
