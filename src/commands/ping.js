import { defaultEmbed } from '../utils/defaultEmbed'
import { helpEmbed } from '../utils/helpEmbed'

const name = 'Ping' // User facing name of command
const description = 'Pings the bot and return the time it took to respond' // User facing description
const cname = 'ping' // Command name, or array of aliases
const usage = '.ping' // String showing usage
const examples = '.ping' // String or Array of examples

export default {
    name,
    description,
    cname,
    usage,
    examples,
    helpMessage: helpEmbed({ name, description, cname, usage, examples }), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
        const ping = Date.now() - msg.createdTimestamp + ' ms'
        const response = defaultEmbed('🏓 Pong', `⏲ ${ping}`)
            .setAuthor('')
            .setColor('RANDOM')

        msg.channel.send(response)
    },
}
