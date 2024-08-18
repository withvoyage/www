export function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
export const DOTTED_CLASS = 'bg-[radial-gradient(#dde0e4_1px,transparent_2px)] [background-size:24px_24px]'
