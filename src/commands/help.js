import { helpEmbed } from '../utils/helpEmbed'
import helpData from '../data/helpInfo.json'
import creatorData from '../data/creatorInfo.json'
import { removeUserMentions } from '../utils/removeUserMentions'
import { shuffleArray } from '../utils/shuffleArray'
import { defaultEmbed } from '../utils/defaultEmbed'
import { commandOverview } from '../utils/commandOverview'

const name = 'Help' // User facing name of command
const description = 'Provides help through several help articles' // User facing description
const cname = ['h', 'help'] // Command name, or array of aliases
const usage = '.h `articleName` `@Mention1` `@Mention2`...' // String showing usage
const examples = ['.h cs <@702735514884898867>', '.h dualpc'] // String or Array of examples

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
    }).addField('Help Articles', commandOverview(helpData)), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: async (msg, args) => {
        args = removeUserMentions(args)
        const [article] = args
        // The function executed by the command
        if (!article) {
            msg.client.commands.get('i').execute(msg, ['h'])
            return
        }

        let info = helpData[article]
        const reply = {}

        if (!info) {
            bot.reply(message, `Couldn't find help article '${article}'`)
            return
        }

        if (article == 'cs') {
            info = JSON.parse(JSON.stringify(info))
            let creatorRole = await msg.guild.roles.fetch('722632169196879884')
            let creators = Array.from(creatorRole.members.values())

            shuffleArray(creators)

            info.fields.push({
                name: 'Creator (Price)',
                value: creators
                    .map(
                        (c) =>
                            `<@${c.user.id}> (${
                                creatorData[c.user.id]?.price
                                    ? creatorData[c.user.id].price
                                    : '_Ask Creator_'
                            })${
                                creatorData[c.user.id]?.portfolio
                                    ? ` - [Samples](${
                                          creatorData[c.user.id].portfolio
                                      })`
                                    : ''
                            }`
                    )
                    .join('\n'),
            })
        }

        const embed = defaultEmbed(info.title, info.message)

        if (info.fields) {
            info.fields.forEach((f) => {
                const { name = '', value = '', inline = false } = f
                embed.addField(name, value, inline)
            })
        }

        if (info.image) {
            embed.setImage(info.image)
        }

        if (msg.mentions.users.size > 0) {
            reply.content = msg.mentions.users
                .map((u) => `<@!${u.id}>`)
                .join(' ')
        }

        reply.embed = embed

        msg.channel.send(reply)
    },
}
