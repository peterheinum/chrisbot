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
 
  schedule.scheduleJob({hour: 11, minute: 37}, () => {
    bot.sendMessage({ to, message: '13:37' })
  })

  const funFacts = [
    'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.',
    'Octopuses have three hearts, nine brains, and blue blood.',
    'Bananas are berries, but strawberries are not.',
    'A group of flamingos is called a "flamboyance".',
    'Sharks existed before trees.',
    'The Eiffel Tower can grow more than 15 cm taller during the summer due to thermal expansion.',
    'Wombat poop is cube-shaped.',
    'There are more possible games of chess than atoms in the observable universe.'
  ]

  schedule.scheduleJob({hour: 7, minute: 0}, () => {
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)]
    bot.sendMessage({ to, message: `Fun fact: ${fact}` })
  })
})