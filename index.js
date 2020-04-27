require('dotenv').config()
const Discord = require('discord.io')
const schedule = require('node-schedule');

/* Koa server for waking up the bot */
const Koa = require('koa')
const app = new Koa()
const PORT = process.env.PORT || 3000

app.use(ctx => {
  ctx.body = 'https://www.youtube.com/watch?v=I_izvAbhExY'
})

app.listen(PORT)
console.log(`Koa open on ${PORT}`)

// Initialize Discord Bot
const bot = new Discord.Client({
  token: process.env.DISCORDTOKEN,
  autorun: true
})

const keys = obj => Object.keys(obj)
const toArray = obj => keys(obj).map(key => obj[key])

/* THIS BOT IS MEANT TO REPLACE CHRIS */
bot.on('ready', event => {
  console.log('Connected to Discord')
  const { servers } = bot
  const boiz = toArray(servers).find(({ name }) => name === 'Boiz')
  const boizId = boiz.id

  const chatRoom = toArray(bot.channels).find(x => x.guild_id === boizId)
  const to = chatRoom['id']
 
  schedule.scheduleJob({hour: 13, minute: 37}, function(){
    bot.sendMessage({ to, message: '13:37' })
  })
})