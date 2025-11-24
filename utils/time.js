export const formatTime = (time) => {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedMinutes = minutes < 10 ? `0${parseInt(minutes, 10)}` : minutes
  
  return `${hours}:${formattedMinutes}`
}

export const formatDateToDay = (time) => {
  return Intl.DateTimeFormat(undefined, { weekday: 'long'}).format(new Date(time))
}

export const getRelativeTime = (referenceTime, time) => {
  if(!referenceTime || !time) return

  const referenceHour = new Date(referenceTime).getHours()
  const timeHour = new Date(time).getHours()

  if(referenceHour > timeHour) return 'past'
  if(referenceHour === timeHour) return 'present'
  return 'future'
}

export const getRelativeDay = (referenceTime, time) => {
  if(!referenceTime || !time) return
  
  const referenceDay = new Date(referenceTime).getDate()
  const timeDay = new Date(time).getDate()
  console.table({referenceTime, time, referenceDay, timeDay})

  if(referenceDay > timeDay) return 'past'
  if(referenceDay === timeDay) return 'present'
  return 'future'
}