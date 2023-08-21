import { DateTime } from 'luxon'
import { defaultEmbed } from '../utils/defaultEmbed'
import { cmd } from '../utils/cmd'
import { helpEmbed } from '../utils/helpEmbed'

const name = 'Stats' // User facing name of command
const description = 'Shows bot stats' // User facing description
const cname = ['stats'] // Command name, or array of aliases
const usage = cmd('stats') // String showing usage
const examples = [cmd('stats')] // String or Array of examples

export default {
    name,
    description,
    cname,
    usage,
    examples,
    helpMessage: helpEmbed({ name, description, cname, usage, examples }), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
        let statsEmbed = defaultEmbed('Stats').setAuthor('')

        const start = DateTime.fromJSDate(
            msg.client.onlineSince
        ).toUnixInteger()

        statsEmbed.addField('Uptime', `<t:${start}:R>`)

        msg.channel.send(statsEmbed)
    },
}
