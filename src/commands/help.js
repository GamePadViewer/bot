import { helpEmbed } from '../utils/helpEmbed'

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
    helpMessage: helpEmbed({ name, description, cname, usage, examples }), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
        if (!args.length) {
            msg.client.commands.get('i').execute(msg, ['h'])
            return
        }
    },
}
