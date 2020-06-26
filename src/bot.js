import './config'
import Discord from 'discord.js'

const bot = new Discord.Client({
    presence: {
        activity: {
            type: 'PLAYING',
            name: 'with some gamepads',
        },
    },
})

bot.once('ready', () => {})

bot.on('message', (msg) => {
    if (msg.author.bot) return
    if (msg.content == '!ping') msg.channel.send('pong!')
})

bot.login(process.env.BOT_TOKEN)
