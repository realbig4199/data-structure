class Node {
  // constructor : 생성자 함수
  // 노드의 구성요소 : 데이터(data)와 다음 노드를 가리키는 포인터(next)
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  // constructor : 생성자 함수
  // 연결리스트의 구성요소 : 첫 번째 노드를 가리키는 포인터(head)와 노드의 개수(count)
  constructor() {
    // head : 연결 리스트의 첫 번째 노드를 가리키는 프로퍼티
    this.head = null;
    // count : 연결 리스트에 포함된 노드의 개수를 저장하는 프로퍼티
    this.count = 0;
  }

  // printAll 메서드 : 연결 리스트에 포함된 모든 노드의 데이터를 출력하는 메서드
  printAll() {
    // 현재 노드를 가리키는 포인터를 생성(초기값은 head)
    let currentNode = this.head;
    // 출력할 문자열을 생성
    let text = "[";

    // 현재 노드가 null이 아닐 때까지 반복 (이동을 다 하고 null이 되면 종료)
    while (currentNode != null) {
      // 현재 노드의 데이터를 출력할 문자열에 추가
      text += currentNode.data;
      // 현재 노드를 다음 노드로 이동
      currentNode = currentNode.next;
      // 현재 노드가 null이 아닐 때만 쉼표 추가
      if (currentNode != null) {
        text += ", ";
      }
    }

    // 출력할 문자열에 대괄호 추가
    text += "]";
    // 출력할 문자열을 출력
    console.log(text);
  }

  // clear 메서드 : 연결 리스트의 모든 노드를 삭제하는 메서드
  clear() {
    // head를 null로 초기화하고 count를 0으로 초기화
    // 참조를 잃은 각 노드는 가비지 컬렉터에 의해 메모리에서 해제됨
    this.head = null;
    this.count = 0;
  }

  // insertAt 메서드 : 연결 리스트의 특정 위치에 새로운 노드를 추가하는 메서드 (목표 앞까지 이동하고 그 다음에 삽입)
  // 인자로 index와 data를 받음
  insertAt(index, data) {
    // 만약 입력받은 index가 count보다 크거나 음수인 경우 에러를 발생시킴
    if (index > this.count || index < 0) {
      // throw : 에러를 발생시키는 키워드
      throw new Error("범위를 넘어갔습니다.");
    }
    // 입력된 data를 바탕으로 새로운 노드를 생성
    let newNode = new Node(data);

    // 연결 리스트의 맨 앞에 새로운 노드를 추가하는 경우 (입력된 index가 0인 경우)
    if (index === 0) {
      // 새로운 노드의 다음 노드를 head로 설정
      newNode.next = this.head;
      // head를 새로운 노드로 설정
      this.head = newNode;
    } else {
      // 연결 리스트의 맨 앞이 아닌 곳에 새로운 노드를 추가하는 경우
      // 현재 노드를 가리키는 포인터를 생성 (초기값은 head)
      let currentNode = this.head;

      // for 문을 이용해 index - 1번째 노드까지 이동
      // index - 1번째까지 이동하는 이유는 그 노드의 다음에 새로운 노드를 추가하기 위함
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
