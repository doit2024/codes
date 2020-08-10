function myNew(construstor, ...rest) {
  if (typeof construstor !== 'function') {
    return construstor
  }
  var _this = Object.create(construstor.prototype)
  const obj = construstor.apply(_this, rest)
  if (typeof obj === 'object') {
    return obj
  } else {
    return _this
  }
}

function Person(name, sex) {
  this.name = name
  this.sex = sex
}
Person.prototype.getInfo = function () {
  console.log(`姓名：${this.name}; 性别： ${this.sex}`)
}
const p = myNew(Person, 'woody', '男')
p.getInfo()
