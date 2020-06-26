import { helpEmbed } from '../utils/helpEmbed'

const name = 'Link' // User facing name of command
const description = 'Sends a link to a specific page' // User facing description
const cname = ['l', 'link'] // Command name, or array of aliases
const usage = '.l `linkName` `@Mention1` `@Mention2`...' // String showing usage
const examples = ['.l obs', '.l slobs <@702735514884898867>'] // String or Array of examples

export default {
    name,
    description,
    cname,
    usage,
    examples,
    helpMessage: helpEmbed({ name, description, cname, usage, examples }), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
    },
}
