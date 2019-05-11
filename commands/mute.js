const fs      = require('fs')
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
module.exports = {
  name: 'mute',
  description: 'Zmutuj wybranego użytkownika na czas nieokreślony. Nie wymaga podania powodu zmutowania. (wymaga ustawienia `mute` w configu)',
  usage: '<użytkownik>, [powód]',
  module: 'Administracyjne',
   errors: {},
   admin: true,
   mod: true,
    dev: false,
  pomocnik: true,
  execute(message, client, guildConf, args, config, MessageAttachment, MessageEmbed, Discord) {
    var muterole = message.guild.roles.find(role => role.name === guildConf.mute || role.id === guildConf.mute)
    let member = message.mentions.members.first()
    let reason = args.slice(1).join(" ");
       
    if(message.mentions.members.size === 1){
      if(!reason){
        if(member.roles.find(role => role.id === muterole.id)) return message.channel.send({
          embed: {
            "title": `Ajć...` ,
            "footer": {
              "icon_url": client.user.avatarURL(),
              "text": `Wersja | ${config.wersja}`
            },
            "color": 16187673,
            "description": 'Ten użytkownik jest już zmutowany. Aby go odmutować użyj `v!unmute`'  
          }
        })
        member.roles.add(muterole)
        message.channel.send(`${member} został zmutowany, powód nie został podany`)
      }else{
        if(member.roles.find(role => role.id === muterole.id)) return message.channel.send({
          embed: {
            "title": `Ajć...` ,
            "footer": {
              "icon_url": client.user.avatarURL(),
              "text": `Wersja | ${config.wersja}`
            },
            "color": 16187673,
            "description": 'Ten użytkownik jest już zmutowany. Aby go odmutować użyj `v!unmute`'  
          }
        })
        member.roles.add(muterole)
        message.channel.send(`${member} został zmutowany, powód: ${reason}`)
      }
    }else if(message.mentions.members.size > 1){
      message.channel.send({
      embed: {
                "title": `Ajć...` ,
                "footer": {
                  "icon_url": client.user.avatarURL(),
                  "text": `Wersja | ${config.wersja}`
              },
                "color": 16187673,
                "description": `Nie można zmutować więcej niż jedną osobę na raz`  
              }
    })
    }else{
    message.channel.send({
      embed: {
                "title": `Ajć...` ,
                "footer": {
                  "icon_url": client.user.avatarURL(),
                  "text": `Wersja | ${config.wersja}`
              },
                "color": 16187673,
                "description": `Nie podano żadnych użytkowników do zmutowania`  
              }
    })
    }
  }
}