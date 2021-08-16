export const API_TOKEN = "P6DhIiliYUynZ782cHct4Y6pf9bx7bSuqxUkjamX"

export const findRandomItem = (array) => {
  const randomElement = array[Math.floor(Math.random() * array.length)]
  return randomElement
}
