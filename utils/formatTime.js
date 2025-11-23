export const formatTime = (time) => {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedMinutes = minutes < 10 ? `0${parseInt(minutes, 10)}` : minutes
  
  return `${hours}:${formattedMinutes}`
}