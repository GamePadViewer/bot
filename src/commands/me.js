import { cmd } from '../utils/cmd'
import { helpEmbed } from '../utils/helpEmbed'
import { defaultEmbed } from '../utils/defaultEmbed'
import moment from 'moment'
import { Message } from 'discord.js'
import { isWeekOldOrMore } from '../utils/isWeekOldOrMore'

const name = 'About Me (userinfo)' // User facing name of command
const description = 'Get information about yourself from the bot' // User facing description
const cname = 'me' // Command name, or array of aliases
const usage = cmd('me') // String showing usage
const examples = cmd('me') // String or Array of examples

export default {
    name,
    description,
    cname,
    usage,
    examples,
    helpMessage: helpEmbed({ name, description, cname, usage, examples }), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
        const userInfo = defaultEmbed()
        const info = []

        userInfo.setThumbnail(msg.author.avatarURL())
        userInfo.setTitle(`About ${msg.author.username}`)
        userInfo.setAuthor('')
        if (msg.member.roles.color) {
            userInfo.setColor(msg.member.roles.color.color)
        } else {
            userInfo.setColor('DEFAULT')
        }

        info.push(`**Username:** ${msg.author.tag}`)

        if (msg.member.nickname) {
            info.push(`**Nickname:** ${msg.member.nickname}`)
        }

        info.push(
            `**Joined At:** ${moment(msg.member.joinedAt).format(
                'MMM Do, YYYY'
            )} *(${moment(msg.member.joinedAt).fromNow()})*`
        )

        if (msg.member.roles.cache.size > 0) {
            info.push(`**Roles:** ${msg.member.roles.cache.array().join(' ')}`)
        }

        userInfo.setDescription(info.join('\n'))
        msg.reply(userInfo)
    },
}
