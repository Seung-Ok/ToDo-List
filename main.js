'use strict';

// 선택자 할당
const todoBtn = document.querySelector('.todo__btn');
const form = document.querySelector('.form');
const todoInput = document.querySelector('.todo__input');
const todoItem = document.querySelector('.todo__items');
const allDelete = document.querySelector('.delete__btn');
const recoverBtn = document.querySelector('.recover__btn');
const updateBtn = document.querySelector('.update__btn');
const header = document.querySelector('.header');
let deleteItem = [];

// 입력한 정보 저장
window.addEventListener('beforeunload', () => {
  saveItem();
});

// 저장된 정보 유지
window.addEventListener('load', () => {
  clock();
  todoInput.focus();
  loadItem();
});

// 아이템 등록
form.addEventListener('click', (evnet) => {
  event.preventDefault();
  if (event.target.tagName === 'INPUT') {
    return;
  } else {
    add();
  }
});

// 아이템 전부 삭제
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
    localStorage.removeItem('deleteItem');
    deleteItem = [];
    todoInput.focus();
  } else {
    todoInput.focus();
  }
});

// 텍스트 수정
updateBtn.addEventListener('click', () => {
  alert('수정하고 싶은 텍스트를 더블클릭 하세요');
});

// 텍스트 수정
todoItem.addEventListener('dblclick', (event) => {
  if (event.target.classList.contains('item__name')) {
    const text = event.target
      .closest('li')
      .querySelector('.item__name');
    const renameText = prompt(
      '텍스트를 수정합니다',
      text.textContent
    );
    if (renameText === null) {
      todoInput.focus();
      return;
    } else {
      text.textContent = renameText;
      todoInput.focus();
    }
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
      // 삭제하기전 복사
      const recoverItem = todoList.cloneNode(true);
      deleteItem.push(recoverItem.outerHTML);
      localStorage.setItem('deleteItem', deleteItem);
      todoList.remove();
      todoInput.focus();
    }
  });

  // 아이템 체크
  const cancleBtn = document.createElement('button');
  cancleBtn.setAttribute('class', 'item__cancle');
  cancleBtn.innerHTML = `<i class="far fa-calendar-check"></i>`;
  cancleBtn.addEventListener('click', () => {
    cancleBtn.parentNode.previousSibling.classList.toggle('line');
    todoInput.focus();
  });

  todoList.appendChild(name);
  todoList.appendChild(itemDiv);
  itemDiv.appendChild(cancleBtn);
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

// 날짜
function clock() {
  const clockTo = document.createElement('h3');
  const clock = new Date();
  const year = clock.getFullYear();
  const month = clock.getMonth() + 1;
  const date = clock.getDate();
  clockTo.innerText = `${year}년 ${month}월 ${date}일`;
  header.appendChild(clockTo);
}
