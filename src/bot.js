import './config'
import fs from 'fs'
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

bot.commands = new Discord.Collection()

const commandFiles = fs
    .readdirSync('./src/commands')
    .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    const commandDefault = require(`./commands/${file}`)
    const { default: command } = commandDefault // Gotta get rid of the named export

    if (Array.isArray(command.cname)) {
        command.cname.forEach((cmd) => {
            bot.commands.set(cmd, command)
        })
    } else {
        bot.commands.set(command.cname, command)
    }
}

bot.on('message', (msg) => {
    const commandSyntax = new RegExp(/^\.(\w+)(?:\ (\S.+)|)$/i)
    if (msg.author.bot) return
    if (!msg.content.match(commandSyntax)) return
    console.log(msg.content)

    const [, command, argStr] = msg.content.match(commandSyntax)

    msg.channel.send(`Command: ${command}\nArgs: ${argStr}`)
})

bot.login(process.env.BOT_TOKEN)
