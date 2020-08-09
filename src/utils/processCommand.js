import { argParser } from './argParser'

export const processCommand = (msg) => {
    const escPrefix = process.env.PREFIX.split('')
        .map((c) => `\\${c}`)
        .join('')

    const regexStr = `^${escPrefix}(\\w+)(?:\\ (\\S.*)|)$`

    const commandSyntax = new RegExp(regexStr, 'i')
    if (msg.author.bot) return
    if (!msg.content.match(commandSyntax)) return

    const [, command, argStr] = msg.content.match(commandSyntax)
    const args = argParser(argStr)

    // Show message when no command found
    if (!msg.client.commands.has(command)) {
        msg.channel.send(`Command '${command}' not found 😬`)
        return
    }

    try {
        msg.client.commands.get(command).execute(msg, args)
    } catch (e) {
        console.log(e)
        msg.channel.send(`There was a problem trying to run '${command}'`)
    }
}
