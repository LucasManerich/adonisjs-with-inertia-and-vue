export const formatDate = (value?: string) => {
  if (!value) return ''
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1')
}

export const currentDateFormatted = () => {
  return new Date().toLocaleDateString('pt-BR')
}

export const addTwoDaysOnCurrentDate = () => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 2)
  return currentDate.toLocaleDateString('pt-BR')
}

export const addSevenDaysOnCurrentDate = () => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 7)
  return currentDate.toLocaleDateString('pt-BR')
}

export const addFifteenDaysOnCurrentDate = () => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 15)
  return currentDate.toLocaleDateString('pt-BR')
}

export const addThirtyDaysOnCurrentDate = () => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 30)
  return currentDate.toLocaleDateString('pt-BR')
}
