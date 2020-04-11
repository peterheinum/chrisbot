require('dotenv').config()
const Discord = require('discord.io')
const auth = process.env.DISCORDTOKEN

// Initialize Discord Bot
const bot = new Discord.Client({
  token: auth,
  autorun: true
})

const keys = obj => Object.keys(obj)
const toArray = obj => keys(obj).map(key => obj[key])

/* THIS BOT IS MEANT TO REPLACE CHRIS */
bot.on('ready', event => {
  const { servers } = bot
  const boiz = toArray(servers).find(({ name }) => name === 'Boiz')
  const boizId = boiz.id

  const chatRoom = toArray(bot.channels).find(x => x.guild_id === boizId)

  const to = chatRoom['id']
  let msgSent = false
  setInterval(() => {
    const now = new Date()
    const [hours, minutes] = [now.getHours(), now.getMinutes()]
    const message = `${hours}:${minutes}`
  
    if(message === '13:37' && !msgSent) {
      bot.sendMessage({ to, message })
      msgSent = true
    }

    msgSent = false
  }, 30000)

})

