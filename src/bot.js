import './config'
import fs from 'fs'
import Discord from 'discord.js'
import { argParser } from './utils/argParser'
import dedent from 'dedent'
import { cmd } from './utils/cmd'
import { welcomeTemplate } from './data/templates'
import Format from 'string-format'

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
    const escPrefix = process.env.PREFIX.split('')
        .map((c) => `\\${c}`)
        .join('')

    const regexStr = `^${escPrefix}(\\w+)(?:\\ (\\S.*)|)$`

    const commandSyntax = new RegExp(regexStr, 'i')
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

bot.on('guildMemberAdd', async (member) => {
    const welcomeChannel = await bot.channels.fetch(
        process.env.WELCOME_CHANNEL,
        true
    )

    const msgParams = {
        userMention: member.toString(),
        lobbyChannel: '<#554461581266649089>',
        skinsChannel: '<#572203187927252993>',
        supportChannel: '<#82712913701244928>',
        updatesChannel: '<#199470788733173760>',
        botChannel: '<#171753564476014592>',
        botCommand: cmd('c'),
    }

    const welcomeMsg = Format(welcomeTemplate, msgParams)

    welcomeChannel.send(welcomeMsg)
})

bot.login(process.env.BOT_TOKEN)
