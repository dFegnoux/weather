export const formatTime = (time) => {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedMinutes = minutes < 10 ? `0${parseInt(minutes, 10)}` : minutes
  
  return `${hours}:${formattedMinutes}`
}

export const getRelativeTime = (referenceTime, time) => {
  if(!referenceTime || !time) return

  const referenceHour = new Date(referenceTime).getHours()
  const timeHour = new Date(time).getHours()

  if(referenceHour > timeHour) return 'past'
  if(referenceHour === timeHour) return 'present'
  return 'future'
}