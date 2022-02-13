'use strict';

const todoBtn = document.querySelector('.todo__btn');
const todoInput = document.querySelector('.todo__input');
const todoItem = document.querySelector('.todo__items');

// 사이트 load시 focus 주기
window.onload = function () {
  todoInput.focus();
};

// todoBtn 클릭시 event 등록
todoBtn.addEventListener('click', btnClick);
// input에서 Enter 입력하면 btnClick() 호출
todoInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    btnClick();
  }
});

function btnClick() {
  // 아이템 생성
  const todoList = document.createElement('li');
  todoList.setAttribute('class', 'item');
  todoList.innerHTML = todoInput.value;
  // input에 아무 값도 입력하지 않으면 팝업창 띄우고 종료
  if (todoInput.value === '') {
    alert('입력하세요');
    todoInput.focus();
    return;
  }
  todoItem.appendChild(todoList);

  // input 초기화 + focus
  todoInput.focus();
  todoInput.value = null;

  // 아이템 삭제
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', 'item__delete');
  removeBtn.innerHTML = `<i class="fa-regular fa-eraser"></i>`;
  todoList.appendChild(removeBtn);
  removeBtn.addEventListener('click', () => {
    todoList.remove();
  });
}
