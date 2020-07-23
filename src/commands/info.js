import { defaultEmbed } from '../utils/defaultEmbed'
import { helpEmbed } from '../utils/helpEmbed'
import { cmd } from '../utils/cmd'

const name = 'Info' // User facing name of command
const description = 'Displays information for a given command' // User facing description
const cname = ['i', 'info'] // Command name, or array of aliases
const usage = cmd('i `commandName`') // String showing usage
const examples = [cmd('i info'), cmd('i help')] // Array of examples

export default {
    name,
    description,
    cname,
    usage,
    examples,
    helpMessage: helpEmbed({ name, description, cname, usage, examples }), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        let [command] = args

        if (!command) command = 'i'

        msg.channel.send(msg.client.commands.get(command).helpMessage)
    },
}
