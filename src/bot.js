import './config'
import fs from 'fs'
import Discord from 'discord.js'
import { argParser } from './utils/argParser'

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

bot.uniqueCommands = [...new Set(bot.commands.array())]

bot.on('message', (msg) => {
    const commandSyntax = new RegExp(/^\.(\w+)(?:\ (\S.*)|)$/i)
    if (msg.author.bot) return
    if (!msg.content.match(commandSyntax)) return

    const [, command, argStr] = msg.content.match(commandSyntax)
    const args = argParser(argStr)

    // Show message when no command found
    if (!bot.commands.has(command)) {
        msg.channel.send(`Command '${command}' not found 😬`)
        return
    }

    try {
        bot.commands.get(command).execute(msg, args)
    } catch (e) {
        console.log(e)
        msg.channel.send(`There was a problem trying to run '${command}'`)
    }
})

bot.login(process.env.BOT_TOKEN)
