export default {
    name: 'Link', // User facing name of command
    description: 'Sends a link to a specific page', // User facing description
    cname: ['l', 'link'], // Command name, or array of aliases
    usage: '.l `linkName` `@Mention1` `@Mention2`...', // String showing usage
    examples: ['.l obs', '.l slobs <@702735514884898867>'], // String or Array of examples
    helpMessage: '', // Message that bot responds with when either no args are passed, or invoked via info command
    execute: (msg, args) => {
        // The function executed by the command
    },
}
