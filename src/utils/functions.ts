export const formattedDate = (dateString: string) =>
    new Date(dateString).toLocaleString('ru-RU', { day: 'numeric', month: 'long' })

export const generateTimeSlots = (opening: string, closing: string): string[] => {
    const slots: string[] = []

    let openTotalMinutes = parseTimeToMinutes(opening)
    const closeTotalMinutes = parseTimeToMinutes(closing)

    while (openTotalMinutes <= closeTotalMinutes) {
        const hour = Math.floor(openTotalMinutes / 60)
        const minute = openTotalMinutes % 60

        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push(timeString)

        openTotalMinutes += 30
    }

    const [lastHour, lastMinute] = slots[slots.length - 1].split(':').map(Number)
    const lastTotalMinutes = lastHour * 60 + lastMinute
    if (lastTotalMinutes % 30 !== 0) {
        slots.pop()
    }

    return slots
}

export const extractHoursAndMinutes = (isoString: string) => {
    const timePart = isoString.split('T')[1]
    const [hours, minutes] = timePart.split(':')

    return `${hours}:${minutes}`
}

export const parseISOTimeToMinutes = (iso: string) =>
    parseTimeToMinutes(extractHoursAndMinutes(iso))

export const parseTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}

export const getDayLabel = (index: number, date: string) => {
    if (index === 0) return 'сегодня'
    else if (index === 1) return 'завтра'
    else return new Date(date).toLocaleDateString('ru-RU', { weekday: 'long' })
}

export const minutesDiff = (a: string, b: string) =>
    Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 1000 / 60
