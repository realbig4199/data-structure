/*
연결 리스트 : 메모리 내의 연속적이지 않은 공간에 데이터를 저장하는 자료구조

각 데이터 하나 하나는 노드 형태로 존재하며, 각 노드에는 데이터와 다음 노드를 가리키는 포인터를 포함

주요 메서드
- printAll() : 연결 리스트에 포함된 모든 노드의 데이터를 출력하는 메서드
- clear() : 연결 리스트의 모든 노드를 삭제
- insertAt(index, data) : 연결 리스트의 특정 인덱스에 새로운 노드를 추가
- insertLast(data) : 연결 리스트의 마지막에 새로운 노드를 추가
- deleteAt(index) : 연결 리스트의 특정 인덱스에 있는 노드를 삭제
- getNodeAt(index) : 연결 리스트의 특정 인덱스에 있는 노드를 반환
*/

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.count = 0;
  }

  printAll() {
    let currentNode = this.head;
    let text = "[";

    while (currentNode != null) {
      text += currentNode.data;
      currentNode = currentNode.next;
      if (currentNode != null) {
        text += ", ";
      }
    }

    text += "]";
    console.log(text);
  }

  clear() {
    this.head = null;
    this.count = 0;
  }

  insertAt(index, data) {
    if (index > this.count || index < 0) {
      throw new Error("범위를 넘어갔습니다.");
    }
    let newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let currentNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      // 이동을 마치면 새로운 노드의 다음을 현재 노드의 다음으로 설정
      newNode.next = currentNode.next;
      // 현재 노드의 다음을 새로운 노드로 설정 (중간에 새로운 노드를 삽입해주는 것)
      currentNode.next = newNode;
    }
    // 노드가 추가 됐으므로 count를 1 증가
    this.count++;
  }

  // insertLast 메서드 : 연결 리스트의 마지막에 새로운 노드를 추가하는 메서드 (마지막 전까지 이동하고 그 다음에 삽입한다)
  insertLast(data) {
    // insertAt 메서드를 이용해 마지막에 새로운 노드를 추가
    // count는 0부터 시작하므로 마지막 index는 count
    // insertAt 메서드의 내부 동작을 보면 index - 1까지 이동하므로 count를 인자로 주면 마지막 노드에 삽입됨
    this.insertAt(this.count, data);
  }

  // deleteAt 메서드 : 연결 리스트의 특정 위치에 있는 노드를 삭제하는 메서드
  deleteAt(index) {
    // 만약 입력받은 index가 count보다 크거나 음수인 경우 에러를 발생시킴
    if (index >= this.count || index < 0) {
      throw new Error("제거할 수 없습니다.");
    }
    // 현재 노드를 가리키는 포인터를 생성 (초기값은 head)
    let currentNode = this.head;
    // 연결 리스트의 맨 앞에 있는 노드를 삭제하는 경우
    if (index === 0) {
      // 삭제 노드는 head
      let deletedNode = this.head;
      // 현재의 head를 그 다음 노드로 변경
      this.head = this.head.next;
      // 전체 노드 개수를 1 감소
      this.count--;
      // 삭제한 노드를 반환
      return deletedNode;
    } else {
      // 연결 리스트의 맨 앞이 아닌 곳에 있는 노드를 삭제하는 경우
      // 반복문으로 삭제할 노드의 이전 노드까지 이동
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      // 삭제할 노드를 저장하며 삭제할 노드는 이동한 노드의 다음 노드
      let deletedNode = currentNode.next;
      // 현재 노드의  다음 노드들 삭재할 노드의 다음 노드로 변경(삭제하기 전에 연결을 해야 이 노드를 잃어버리지 않음)
      currentNode.next = currentNode.next.next;
      // 전체 노드 개수를 1 감소
      this.count--;
      // 삭제한 노드를 반환
      return deletedNode;
    }
  }

  // deleteLast 메서드 : 연결 리스트의 마지막 노드를 삭제하는 메서드
  deleteLast() {
    // deleteAt 메서드를 이용해 마지막 노드를 삭제
    // deleteAt 메서드가 삭제할 노드 앞까지 접근한 후 삭제하므로 count - 1을 인자로 주면 마지막 노드가 삭제됨
    return this.deleteAt(this.count - 1);
  }

  // getNodeAt 메서드 : 연결 리스트의 특정 위치에 있는 노드를 반환하는 메서드
  getNodeAt(index) {
    // 만약 입력받은 index가 count보다 크거나 음수인 경우 에러를 발생시킴
    if (index >= this.count || index < 0) {
      throw new Error("범위를 넘어갔습니다.");
    }
    // 현재 노드를 가리키는 포인터를 생성 (초기값은 head)
    let currentNode = this.head;
    // 반복문으로 index번째 노드까지 이동 (인덱스는 0부터 시작하므로 index - 1번째까지 이동)
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    // 현재 노드를 반환
    return currentNode;
  }
}
module.exports = { Node, LinkedList };
