function instanceOf(a, B) {
  if (!a.__proto__) {
    return false
  } else if (a.__proto__ === B.prototype) {
    return true
  } else {
    return instanceOf(a.__proto__, B)
  }
}
class Z {}
class A extends Z {}
class B extends A {}
class C {}
const b = new B()
console.log(instanceOf(b, Z))
console.log(instanceOf(b, A))
console.log(instanceOf(b, B))
console.log(instanceOf(b, C))
