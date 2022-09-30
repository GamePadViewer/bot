import './config'
import fs from 'fs'
import Discord from 'discord.js'
import { cmd } from './utils/cmd'
import { endMessages, welcomeTemplate } from './data/templates'
import Format from 'string-format'
import { processCommand } from './utils/processCommand'
import { isWeekOldOrMore } from './utils/isWeekOldOrMore'
import dedent from 'dedent'

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
    processCommand(msg)
})

bot.on('guildMemberAdd', async (member) => {
    const welcomeChannel = await bot.channels.fetch(
        process.env.WELCOME_CHANNEL,
        true
    )

    const msgParams = {
        userMention: member.toString(),
        lobbyChannel: '<#554461581266649089>',
        introChannel: '<#1024040820686458900>',
        skinsChannel: '<#572203187927252993>',
        supportChannel: '<#1023793423205027850>',
        feedbackChannel: '<#1023844890267885568>',
        updatesChannel: '<#199470788733173760>',
        promoChannel: '<#175941538545664000>',
        botChannel: '<#171753564476014592>',
        botCommand: cmd('c'),
        endMessage: dedent(
            endMessages[(endMessages.length * Math.random()) | 0]
        ), // Get a random end message
    }

    const welcomeMsg = Format(welcomeTemplate, msgParams)

    welcomeChannel.send(welcomeMsg)
})

bot.login(process.env.BOT_TOKEN)
