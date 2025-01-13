export default function transformHours(date: string) {
    const [hours, minutes, seconds] = date.split(':');
    if (parseInt(hours) > 0) {
        return hours + ':' + minutes + (parseInt(hours) > 1 ? ' hours' : ' hour')
    } else {
        return minutes + ':' + seconds + ' minutes'
    }
}