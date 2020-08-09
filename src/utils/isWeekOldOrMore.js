import moment from 'moment'

export const isWeekOldOrMore = (member) => {
    return moment(member.joinedAt).isSameOrBefore(moment().subtract(1, 'week'))
}
