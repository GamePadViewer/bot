import './config'
import fs from 'fs'
import Discord from 'discord.js'
import { cmd } from './utils/cmd'
import { welcomeTemplate } from './data/templates'
import Format from 'string-format'
import { processCommand } from './utils/processCommand'
import { isWeekOldOrMore } from './utils/isWeekOldOrMore'

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

bot.on('message', async (msg) => {
    if (
        msg.channel.id === '175941538545664000' &&
        !isWeekOldOrMore(msg.member)
    ) {
        await msg.delete({
            reason: 'User has not been a member for more than a week',
        })
    } else processCommand(msg)
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
