import { helpEmbed } from '../utils/helpEmbed'
import { defaultEmbed } from '../utils/defaultEmbed'
import { cmd } from '../utils/cmd'

const name = 'List Commands' // User facing name of command
const description = 'Lists all available bot commands' // User facing description
const cname = ['c', 'commands'] // Command name, or array of aliases
const usage = cmd('c') // String showing usage
const examples = [cmd('c'), cmd('commands')] // String or Array of examples

export default {
    name,
    description,
    cname,
    usage,
    examples,
    helpMessage: helpEmbed({ name, description, cname, usage, examples }), // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
        let cmdEmbed = defaultEmbed(
            'Command List',
            'The following are the available commands for this bot'
        ).setAuthor('')

        const cmdTexts = msg.client.uniqueCommands.map((cmd) => {
            let cmdInfo = {}
            if (Array.isArray(cmd.cname)) {
                cmdInfo.cmdName = cmd.cname.map((c) => `\`${c}\``).join(' ')
            } else {
                cmdInfo.cmdName = `\`${cmd.cname}\``
            }

            cmdInfo.infoText = cmd.description

            return cmdInfo
        })

        const cmdString = cmdTexts
            .map((c) => `${c.cmdName} - __${c.infoText}__`)
            .join('\n')

        cmdEmbed.addField('Commands', cmdString)

        msg.channel.send(cmdEmbed)
    },
}
