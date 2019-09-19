type panzi = number
type zhuzi = 'A' | 'B' | 'C'

const move = (num: panzi, from: zhuzi, to: zhuzi) =>
  console.log(`将${num}号盘子从${from}移到${to}`)

const han = (num: panzi, from: zhuzi, to: zhuzi, help: zhuzi) => {
  if (num === 1) {
    return move(num, from, to)
  }
  han(num - 1, from, help, to)
  move(num, from, to)
  han(num - 1, help, to, from)
}

han(Number(process.argv[2]) || 3, 'A', 'C', 'B');
