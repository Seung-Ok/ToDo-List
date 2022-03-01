'use strict';

// Selector
const todoBtn = document.querySelector('.todo__btn');
const form = document.querySelector('.form');
const todoInput = document.querySelector('.todo__input');
const todoItem = document.querySelector('.todo__items');
const allDelete = document.querySelector('.delete__btn');
const recoverBtn = document.querySelector('.recover__btn');
const modifyBtn = document.querySelector('.update__btn');
const header = document.querySelector('.header');
let deleteItem = [];

// Save localStorage
window.addEventListener('beforeunload', () => {
  saveItem();
});

// Save localStorage
function saveItem() {
  localStorage.setItem('todoItem', todoItem.innerHTML);
}

// Import localStorage
window.addEventListener('load', () => {
  clock();
  loadItem();
  todoInput.focus();
});

// Import localStorage
function loadItem() {
  const loadItem = localStorage.getItem('todoItem');
  todoItem.innerHTML = loadItem;
}

// Add Item
form.addEventListener('click', (evnet) => {
  event.preventDefault();
  if (event.target.tagName === 'INPUT') {
    return;
  } else {
      todoInput.focus();
    addItem();
  }
});

// Add Item
function addItem() {
  const name = todoInput.value;
  if (name.trim() === '') {
    alert('공백은 입력할 수 없습니다');
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

  // Delete Item
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', 'item__delete');
  removeBtn.innerHTML = `<i class="fa-regular fa-eraser"></i>`;
  removeBtn.addEventListener('click', () => {
    if (!confirm(`${text}를 정말 삭제하시겠습니까?`)) {
      todoInput.focus();
      return;
    } else {
      // Copy Item
      const copyItem = todoList.cloneNode(true);
      console.log(copyItem);
      deleteItem.push(copyItem.outerHTML);
      localStorage.setItem('deleteItem', deleteItem);
      todoList.remove();
      todoInput.focus();
    }
  });

  // Check Item
  const checkBtn = document.createElement('button');
  checkBtn.setAttribute('class', 'item__cancle');
  checkBtn.innerHTML = `<i class="far fa-calendar-check"></i>`;
  checkBtn.addEventListener('click', () => {
    checkBtn.parentNode.previousSibling.classList.toggle('line');
    todoInput.focus();
  });

  todoList.appendChild(name);
  todoList.appendChild(itemDiv);
  itemDiv.appendChild(checkBtn);
  itemDiv.appendChild(removeBtn);

  return todoList;
}

// Delete All Items
allDelete.addEventListener('click', () => {
  if (
    !confirm(
      '전체 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?'
    )
  ) {
    todoInput.focus();
    return;
  } else {
    deleteAllItem();
  }
});

// Recovery Item
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

// Delete All Items
function deleteAllItem() {
  todoItem.innerHTML = '';
  localStorage.clear();
  todoInput.focus();
}

// Modify Text
modifyBtn.addEventListener('click', () => {
  alert('수정하고 싶은 텍스트를 더블클릭 하세요');
});

// Modify Text
todoItem.addEventListener('dblclick', (event) => {
  if (!event.target.classList.contains('item__name')) {
    return;
  } else {
    const text = event.target;
    const modifyText = prompt(
      '텍스트를 수정합니다',
      text.textContent
    );
    if (modifyText.trim() === '') {
      alert('공백으로의 수정은 불가능합니다');
      todoInput.focus();
      return;
    } else {
      text.textContent = modifyText;
      todoInput.focus();
    }
  }
});

// Date
function clock() {
  const clockTo = document.createElement('h3');
  const clock = new Date();
  const year = clock.getFullYear();
  const month = clock.getMonth() + 1;
  const date = clock.getDate();
  clockTo.textContent = `${year}년 ${month}월 ${date}일`;
  header.appendChild(clockTo);
}
