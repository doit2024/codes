/** 生成链表 */
function genLink(startInt, endInt) {
  return startInt <= endInt ? {
    v: startInt,
    next: genLink(startInt+1, endInt)
  } : null
}

// 链表逆序: 1.备份下一个节点 2.修改指针 3.指针移位
function reverse (link) {
  var head = link
  var new_head = null
  var temp
  while(head) {
    temp = head.next
    head.next = new_head
    new_head = head
    head = temp
  }
  return new_head
}

// 链表逆序： 从 m 到 n
function reverseMid (link, m, n) {
  var result = link
  var change_len = n - m + 1;
  var head = link;
  var pre_head = null;
  while (--m) {
    pre_head = head;
    head = head.next;
  }
  var modify_list_tail = head;
  var new_head = null;
  var temp
  while(change_len--) {
    temp = head.next;
    head.next = new_head;
    new_head = head;
    head = temp;
  }
  modify_list_tail.next = head;
  if (pre_head) {
    pre_head.next = new_head;
  } else {
    return new_head
  }
  return result;
}
x = reverseMid(genLink(1, 9), 1, 8)
console.log(x)
