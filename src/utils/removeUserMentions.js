export const removeUserMentions = (args) => {
    const mention = new RegExp(/<@!?[0-9]+>/)
    return args.filter((arg) => !mention.test(arg))
}
