'use strict';

// 선택자 할당
const todoBtn = document.querySelector('.todo__btn');
const todoInput = document.querySelector('.todo__input');
const todoItem = document.querySelector('.todo__items');
const allDelete = document.querySelector('.footer__btn');

// 사용자가 페이지 나가기 전에 입력한 정보 저장
window.addEventListener('beforeunload', () => {
  saveItem();
});

// 페이지 load되면 이전에 입력한 정보 출력
window.addEventListener('load', () => {
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
  if (!confirm('전부 삭제할까요?')) {
    return;
  }
  deleteAllItem();
});

function add() {
  // 아이템 생성
  const todoList = document.createElement('li');
  todoList.setAttribute('class', 'item');
  todoItem.appendChild(todoList);

  const name = document.createElement('span');
  name.setAttribute('class', 'item__name');
  name.innerHTML = todoInput.value;
  todoList.appendChild(name);

  const itemDiv = document.createElement('div');
  itemDiv.setAttribute('class', 'item__div');
  todoList.appendChild(itemDiv);

  // 스크롤링시 list 따라감
  todoList.scrollIntoView({ behavior: 'smooth' });

  // input에 아무 값도 입력하지 않으면 팝업창 띄우고 종료
  if (todoInput.value === '') {
    alert('할 일을 입력해주세요');
    todoInput.focus();
    return;
  }

  // input 입력 후 초기화 + focus
  todoInput.focus();
  todoInput.value = null;

  // 아이템 삭제
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', 'item__delete');
  removeBtn.innerHTML = `<i class="fa-regular fa-eraser"></i>`;
  itemDiv.appendChild(removeBtn);
  removeBtn.addEventListener('click', () => {
    todoList.remove();
  });
}

function deleteAllItem() {
  todoItem.innerHTML = '';
}

function saveItem() {
  localStorage.setItem('todoItem', todoItem.innerHTML);
}

function loadItem() {
  const loadItem = localStorage.getItem('todoItem');
  todoItem.innerHTML = loadItem;
}
