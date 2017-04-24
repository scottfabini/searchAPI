import AdjListNode from './AdjListNode'
class AdjList {
  
  constructor() {
    this.head = null
    this.length = 0
  }

  add(value) {
    let temp = this.head
    this.head = new AdjListNode(value)
    this.head.next = temp
    this.length++
  }

  searchValueByKey(value) {
    let current = this.head
    while( current !== null ) {
      if (value === current.value) {
        return current.value
      }
      current = current.next
    }
  }

  toArray() {
    let current = this.head
    let result = []
    while(current !== null) {
      result.push(current.value)
      current = current.next
    }
    return result
  }
}

module.exports = AdjList
