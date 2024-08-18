export function getRandomBlueishColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    if (i < 2) {
      color += letters[Math.floor(Math.random() * 4 + 4)]
      continue
    }
    color += letters[Math.floor(Math.random() * 12 + 4)]
  }
  return color
}
export const DOTTED_CLASS = 'bg-[radial-gradient(#dde0e4_1px,transparent_2px)] [background-size:24px_24px]'
