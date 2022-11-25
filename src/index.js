const Discord = require("discord.js")
const client = new Discord.Client()
require('dotenv').config()

client.on("ready", () => {
  console.log('We have logged in as ${client.user.tag}', Date.now(), 'UTC')
})

client.on("message", msg => {
  if (msg.content === "$test") {
    msg.reply("It works!");
  }
})

client.login(process.env.TOKEN)