'use strict';

// 선택자 할당
const todoBtn = document.querySelector('.todo__btn');
const todoInput = document.querySelector('.todo__input');
const todoItem = document.querySelector('.todo__items');
const allDelete = document.querySelector('.delete__btn');
const header = document.querySelector('.header');
const recoverBtn = document.querySelector('.recover__btn');
let deleteItem = [];

// 아이템 복구
recoverBtn.addEventListener('click', () => {
  const recoverItem = localStorage.getItem('deleteItem');
  if (recoverItem === null) {
    alert('삭제 내역이 없습니다');
    todoInput.focus();
    return;
  }
  if (confirm('이전 삭제내역을 복구하시겠습니까?')) {
    const recover = recoverItem.replace(/,/g, '');
    todoItem.insertAdjacentHTML('beforeend', recover);
    deleteItem.length = 0;
    localStorage.removeItem('deleteItem');
    todoInput.focus();
  } else {
    todoInput.focus();
  }
});

// 시계
function clock() {
  const clockTo = document.createElement('h3');
  const clock = new Date();
  const year = clock.getFullYear();
  const month = clock.getMonth() + 1;
  const date = clock.getDate();
  clockTo.innerText = `${year}년 ${month}월 ${date}일`;
  header.appendChild(clockTo);
}

// 사용자가 페이지 나가기 전에 입력한 정보 저장
window.addEventListener('beforeunload', () => {
  saveItem();
});

// 페이지 load되면 이전에 입력한 정보 출력
window.addEventListener('load', () => {
  clock();
  todoInput.focus();
  loadItem();
});

// 리스트 추가 - Enter
todoInput.addEventListener('keyup', (event) => {
  if (!(event.key === 'Enter')) {
    return;
  } else {
    add();
  }
});

// 리스트 추가 - (+) 버튼
todoBtn.addEventListener('click', add);

// 등록한 아이템 전부 삭제
allDelete.addEventListener('click', () => {
  if (
    !confirm(
      '전부 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?'
    )
  ) {
    todoInput.focus();
    return;
  } else {
    deleteAllItem();
  }
});

// 아이템 등록
function add() {
  const name = todoInput.value;
  if (name === '') {
    alert('할 일을 입력하세요');
    todoInput.focus();
    return;
  }

  const newItem = createItem(name);
  todoItem.appendChild(newItem);

  newItem.scrollIntoView();
  todoInput.focus();
  todoInput.value = null;
}

function createItem(text) {
  const todoList = document.createElement('li');
  todoList.setAttribute('class', 'item');

  const itemDiv = document.createElement('div');
  itemDiv.setAttribute('class', 'item__div');

  const name = document.createElement('span');
  name.setAttribute('class', 'item__name');
  name.innerText = text;

  // 아이템 삭제
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', 'item__delete');
  removeBtn.innerHTML = `<i class="fa-regular fa-eraser"></i>`;
  removeBtn.addEventListener('click', () => {
    if (!confirm(`${text}를 정말 삭제하시겠습니까?`)) {
      todoInput.focus();
      return;
    } else {
      deleteItem.push(todoList.innerHTML);
      localStorage.setItem('deleteItem', deleteItem);
      todoList.remove();
      todoInput.focus();
    }
  });

  // 아이템 취소선
  const cancleBtn = document.createElement('button');
  cancleBtn.setAttribute('class', 'item__cancle');
  cancleBtn.innerHTML = `<i class="far fa-calendar-check"></i>`;
  cancleBtn.addEventListener('click', () => {
    if (!confirm('정말로 다 하셨습니까?')) {
      todoInput.focus();
      return;
    } else {
      cancleBtn.nextSibling.classList.toggle('line');
      todoInput.focus();
    }
  });

  todoList.appendChild(itemDiv);
  itemDiv.appendChild(cancleBtn);
  itemDiv.appendChild(name);
  itemDiv.appendChild(removeBtn);

  return todoList;
}

function deleteAllItem() {
  todoItem.innerHTML = '';
  localStorage.clear();
  todoInput.focus();
}

function saveItem() {
  localStorage.setItem('todoItem', todoItem.innerHTML);
}

function loadItem() {
  const loadItem = localStorage.getItem('todoItem');
  todoItem.innerHTML = loadItem;
}
