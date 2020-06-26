import { defaultEmbed } from './defaultEmbed'

export const helpEmbed = (info) => {
    const { name, description, cname, usage, examples } = info

    return defaultEmbed(name, description)
        .addField(
            'Command(s)',
            `${cname.map?.((c) => `\`${c}\``).join(' ') || `\`${cname}\``}`
        )
        .addField('Usage', usage)
        .addField('Examples', examples.join?.('\n') || examples)
}
