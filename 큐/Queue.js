const { DoublyLinkedList } = require("./DoublyLinkedList");

class Queue {
  constructor() {
    this.list = new DoublyLinkedList();
  }

  // enqueue 메서드 : 데이터 삽입
  enqueue(data) {
    this.list.insertAt(0, data);
  }

  // dequeue 메서드 : 데이터 삭제
  dequeue() {
    try {
      return this.list.deleteLast();
    } catch (err) {
      return null;
    }
  }

  // front 메서드 : 데이터 참조
  front() {
    return this.list.tail;
  }

  isEmpty() {
    return this.list.count === 0;
  }
}

module.exports = { Queue };
