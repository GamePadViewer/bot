export default {
    name: 'Help', // User facing name of command
    description: 'Provides help through several help articles', // User facing description
    cname: ['h', 'help'], // Command name, or array of aliases
    usage: '.h `articleName` `@Mention1` `@Mention2`...', // String showing usage
    examples: ['.h cs <@702735514884898867>', '.h dualpc'], // String or Array of examples
    helpMessage: '', // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
        msg.channel.send('Test')
    },
}
