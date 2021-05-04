export const FormatDate = (timerTime, type) => {
    const date = new Date(timerTime)
        .toLocaleDateString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        })
    return (
        type === 'date' ? date.substring(0, 8) : date.substring(10)
    )
}

export const FormatDuration = (timerTime, type) => {
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return (
        type === 'start' ? '00:00:00' : `${hours}:${minutes}:${seconds}`
    )
}

export const formatNumber = (time) => {
    return Math.floor(time / 1000)
}