export const argParser = (argString) => {
    if (!argString) return []

    let lookup = `("|'')(.*?)\\1`

    let matches = argString.match(new RegExp(lookup, 'g'))
    let matchedDict = {}

    if (matches !== null) {
        matches.forEach((arg, i) => {
            let token = `{arg#${i}}`
            argString = argString.replace(new RegExp(lookup), token)
            matchedDict[token] = arg.match(new RegExp(lookup))[2]
        })
    }

    let argsList = argString.split(' ')
    argsList = argsList.map((arg) => {
        if (matchedDict[arg] !== undefined) return matchedDict[arg]
        else return arg
    })

    return argsList
}
