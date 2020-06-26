import Discord from 'discord.js'

export const defaultEmbed = (title = '', description = '') => {
    return new Discord.MessageEmbed({
        color: 'GREEN',
        author: {
            name: 'GPV Support Archives',
        },
        title,
        description,
    })
}
