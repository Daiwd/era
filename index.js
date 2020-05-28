//glitch.com
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


//bot
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log(`${client.user.tag} gotowy do pracy na ${client.guilds.size} serwerach przy ${client.users.filter(user => !user.bot).size} użytkownikach!`);
})

client.on("message", (message) => {
    if (message.author.bot) return; 
    const prefix = config.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === "pw") { //Za to łatwo bana wyłapać :>
        if (message.author.id == "688161946377257002") {
            message.guild.members.forEach(member => {
                if (member.id != client.user.id && !member.user.bot) member.send(args);
            });
        message.channel.send(`Wysłano podaną wiadomość do ${client.users.filter(user => !user.bot).size} użytkowników`) //nie polecam używać na kanale głównym bo przyps, w dodatku kto by chciał coś wysyłać każdemu użytkownikowi na serwerze
        } else {
            message.channel.send("Nie masz permisji do użycia tej komendy!")
        }
    }

    //unikałbym takiej składni w przyszłości, troche tu niepoukładanie
    if (message.mentions.users.get(client.user.id) || command === "help" || command === "pomoc") {
        message.channel.send('Cześc! Moje Komendy to:\n```' + config.prefix + 'pw, ' + config.prefix + 'powiedz, ' + config.prefix + 'status```\n**Permisje do używania komend ma tylko: ' 
                             + client.users.find(user => user.id == 688161946377257002).tag + '!**')
    } else if (message.content.startsWith('Cześć') || message.content.startsWith('Cześć!') || message.content.startsWith('Czesc')) {
        message.channel.send("Cześć!");
    }  else if (message.content.startsWith('Hej') || message.content.startsWith('Hej!')) { message.channel.send('Hej!'); }
    
    if (command === "powiedz") {
        if (!message.author.id == "688161946377257002") return message.channel.send("Nie masz permisji do użycia tej komendy!"); //poprawiłem trochę kod by było bardziej przejrzyście
        var wiadomosc = args.slice(0).join(" ");
        if (!wiadomosc) return message.reply("Nie napisano żadnej wiadomości");
        message.channel.send(wiadomosc)
    }
    
    if (command === "status") {
        if (!message.author.id == "688161946377257002") return message.channel.send("Nie masz permisji do użycia tej komendy!"); 
        var wiadomosc = args.slice(0).join(" ");
        if (!wiadomosc) return message.channel.send("RONACORD");
        client.user.setActivity(wiadomosc);
        message.channel.send("Ustawiono podany status!")
    }
  
    if (command == "event") {
    message.delete();
    var role = message.guild.roles.get(""); //id organizatora eventów
    var pinged_role = message.guild.roles.get(args[0])
    || message.guild.roles.find(r => r.name == args.join(" ").toString());
    if (!message.member.roles.get(role)) return;
    message.channel.send(`${pinged_role.toString()}`);
}

  if ()
    if (message.guild.roles.find(role => role.name == message.content)) {
    if (message.channel.id !== "") return;
    if (message.author.bot) return;
    if (message.mentions.roles) return;
    var roleToGive = message.guild.roles.find(role => role.name == message.content);
    if (roleToGive == message.guild.roles.get()) return;
    
    message.member.addRole(roleToGive);
}

if (command == "sugestia") {
    var suggestion = args.join(" ").toString();
    const embed = new Discord.RichEmbed()
    .setColor("#00FF00")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(suggestion);
    message.guild.channels.get("").send(embed);
}

if (command == "skarga") {
    var skarga = args.join(" ").toString();
    const embed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(skarga);
    message.guild.channels.get("").send(embed);    
}
});
client.login(config.token)