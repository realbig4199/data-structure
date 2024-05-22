// push : 데이터 삽입
// pop : 데이터 삭제
// peek : 데이터 참조
// isEmpty : 비어있는지 확인

// LinkedList.js가 객체로 export 했기 때문에
// 구조분해할당({})으로 LinkedList를 가져온다.
const { LinkedList } = require("../연결리스트/LinkedList.js");

class Stack {
  // constructor : 생성자 함수
  // 연결 리스트 객체를 생성하여 스택을 구현
  constructor() {
    this.list = new LinkedList();
  }

  // push 메서드 : 데이터 삽입
  // insertAt 메서드를 사용하여 0번 인덱스에 데이터를 삽입
  push(data) {
    this.list.insertAt(0, data);
  }

  // pop 메서드 : 데이터 삭제
  // deleteAt 메서드를 사용하여 0번 인덱스의 데이터를 삭제
  pop() {
    try {
      return this.list.deleteAt(0);
    } catch (err) {
      return null;
    }
  }

  // peek 메서드 : 데이터 참조
  // getNodeAt 메서드를 사용하여 0번 인덱스의 노드를 반환
  peek() {
    return this.list.getNodeAt(0);
  }

  // isEmpty 메서드 : 비어있는지 확인
  // 연결 리스트의 count 속성이 0이면 true를 반환 (count는 Node의 개수를 의미)
  isEmpty() {
    return this.list.count === 0;
  }
}

module.exports = Stack;
