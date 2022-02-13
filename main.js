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

// 아이템 등록
function add() {
  const name = todoInput.value;
  if (name === null) {
    alert('할 일을 입력해주세요');
    todoInput.focus;
    return;
  }

  const newItem = createItem(name);
  todoItem.appendChild(newItem);

  newItem.scrollIntoView({ behavior: 'smooth' });
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

  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', 'item__delete');
  removeBtn.innerHTML = `<i class="fa-regular fa-eraser"></i>`;
  removeBtn.addEventListener('click', () => {
    if (!confirm(`${text}를 정말 삭제하시겠어요?`)) {
      return;
    } else {
      todoList.remove();
    }
  });

  todoList.appendChild(itemDiv);
  itemDiv.appendChild(name);
  itemDiv.appendChild(removeBtn);

  return todoList;
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
