export const commandOverview = (commandMap) => {
    let commands = []

    for (let i in commandMap) {
        commands.push(`\`${i}\` - __${commandMap[i].title}__`)
    }

    return commands.join('\n')
}
