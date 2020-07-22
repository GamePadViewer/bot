import { helpEmbed } from '../utils/helpEmbed'

const name = 'Welcome Message' // User facing name of command
const description =
    'Displays a welcome/thank you message, typically after someone has been given help' // User facing description
const cname = ['w', 'welcome'] // Command name, or array of aliases
const usage = '.w `t` `@Mention1` `@Mention2` ...' // String showing usage
const examples = [
    '.w',
    '.w <@702735514884898867>',
    '.w t <@702735514884898867>',
] // String or Array of examples

export default {
    name,
    description,
    cname,
    usage,
    examples,
    helpMessage: helpEmbed({ name, description, cname, usage, examples }), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
        if (msg.mentions.users.size == 0) {
            msg.channel.send('This command requires at least 1 mention')
            return
        }

        const welcomeMsg = `${msg.author} thanks you for visiting the GamePad Viewer Discord! If you'd like to help support the future development of GPV, please feel free to become a patron at <https://patreon.com/gpv>`

        const [firstUser, ...otherUsers] = [...msg.mentions.users.values()]

        let mentions = []

        mentions.push(firstUser)

        if (otherUsers.length > 0) {
            mentions.unshift(otherUsers.join(', '))
        }

        const mentionsMsg = mentions.join(' and ')

        msg.channel.send(`${mentionsMsg}: ${welcomeMsg}`)
    },
}
