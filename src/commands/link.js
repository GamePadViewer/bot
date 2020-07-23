import { helpEmbed } from '../utils/helpEmbed'
import data from '../data/linkInfo.json'
import { defaultEmbed } from '../utils/defaultEmbed'
import { removeUserMentions } from '../utils/removeUserMentions'
import { commandOverview } from '../utils/commandOverview'
import { cmd } from '../utils/cmd'

const name = 'Link' // User facing name of command
const description = 'Sends a link to a specific page' // User facing description
const cname = ['l', 'link'] // Command name, or array of aliases
const usage = cmd('l `linkName` `@Mention1` `@Mention2`...') // String showing usage
const examples = [cmd('l obs'), cmd('l slobs <@702735514884898867>')] // String or Array of examples

export default {
    name,
    description,
    cname,
    usage,
    examples,
    helpMessage: helpEmbed({
        name,
        description,
        cname,
        usage,
        examples,
    }).addField('Available Links', commandOverview(data)), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
        args = removeUserMentions(args)
        const [link] = args
        const reply = {}

        if (!link) {
            msg.client.commands.get('i').execute(msg, ['l'])
            return
        }

        const info = data[link]

        if (!info) {
            msg.channel.send(`Couldn't find link '${link}'`)
            return
        }

        const embed = defaultEmbed(info.title)

        embed.setURL(info.url)
        embed.setAuthor('')

        if (info.fields) {
            info.fields.forEach((f) => {
                const { name = '', value = '', inline = false } = f
                embed.addField(name, value, inline)
            })
        }

        if (info.image) {
            embed.setImage(info.image)
        }

        reply.embed = embed
        let mentions

        if (msg.mentions.users.size > 0) {
            mentions = msg.mentions.users.map((u) => `<@!${u.id}>`).join(' ')
        }

        reply.content = mentions
        msg.channel.send(reply)
    },
}
