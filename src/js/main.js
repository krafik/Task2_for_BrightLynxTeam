'use strict';
const resultDiv = document.querySelector('.result'); //найдем в документе блок с результатом
const res = resultDiv.querySelector('#res'); //найдем в блоке для результата место, куда будет выводиться сумма
const ul = resultDiv.querySelector('ul'); //найдем список для показа ответов
resultDiv.style.display = 'none'; //по умолчанию блока не должно быть видно


//определить границы поля по осям Х и Y
const input = document.querySelector('.place'); //поле ввода исходного положения коня
const btn = document.querySelector('#btn'); //кнопка
let axisX = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  axisY = ['1', '2', '3', '4', '5', '6', '7', '8'];
btn.disabled = true;

//проверим что вводит пользователь в поле вводе с помощью регулярок.
//пользователь должен вводить только символы в диапазоне A-H и цифры в диапазоне 1-8. 
//если воодит что-то другое, то делаем отмену действия. 
input.addEventListener('keypress', (e) => {
  if (!/[A-H]/.test(e.key) && !/[$1-8]/.test(e.key)) {
    e.preventDefault();
  }
});

//проверка на кол-во введенных символов. если символов меньеш 2, то кнопка не активна.
// сделано для того, чтобы пользователь не смог отправить только 1 символ
input.addEventListener('keyup', (e) => {
  let qual = input.value.length;
  if (qual == 2) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
});


//событие на кнопку, для отправки данных и рендера ответа
btn.addEventListener('click', () => {
  //проверка, чтобы символы были введены в нужной последовотельности.
  if (/[A-H]/.test(input.value[0]) && /[1-8]/.test(input.value[1])) {
    name();
    //фунция, в которой мы ищем координаты положения фигуры, и по этим координатам прощитываем возможные ходы коня.
  } else {
    alert('Пожалуйста, введите расположение коня! Например "D4"');
  }
});


function name() {
  resultDiv.style.display = 'block';
  //проверяем, если ли в в массивах первый и 2й символ. и записываем координаты символов.
  let x = 0,
    y = 0;
  for (let i = 0; i < axisX.length; i++) {
    if (axisX[i] == input.value[0]) {
      x = i; //координата первого символа по оси X
    }
  }
  for (let k = 0; k < axisY.length; k++) {
    if (axisY[k] == input.value[1]) {
      y = k; //координата первого символа по оси Y
    }
  }
  // console.log('x=' + x + ' y=' + y);
  if (+x + 2 < 8 && +y + 1 < 8) {
    addAnsw(`${axisX[+x+2]}${axisY[+y+1]}`);
  } //(D4) f5
  if (+x + 2 < 8 && +y - 1 >= 0) {
    addAnsw(`${axisX[+x+2]}${axisY[+y-1]}`);
  } //F3
  if (+x + 1 < 8 && +y + 2 < 8) {
    addAnsw(`${axisX[+x+1]}${axisY[+y+2]}`);
  } //
  if (x - 1 >= 0 && +y + 2 < 8) {
    addAnsw(`${axisX[+x-1]}${axisY[+y+2]}`);
  } //--------
  if (x - 2 >= 0 && +y + 1 < 8) {
    addAnsw(`${axisX[+x-2]}${axisY[+y+1]}`);
  } //----
  if (x - 2 >= 0 && y - 1 >= 0) {
    addAnsw(`${axisX[+x-2]}${axisY[+y-1]}`);
  } //--
  if (+x + 1 < 8 && y - 2 >= 0) {
    addAnsw(`${axisX[+x+1]}${axisY[+y-2]}`)
  } //--
  if (x - 1 >= 0 && y - 2 >= 0) {
    addAnsw(`${axisX[+x-1]}${axisY[+y-2]}`);
  }
}


function addAnsw(place) {
  //place - строка с ответом
  let answ = document.createElement('li'); //осоздаем новый элемент списка
  answ.innerHTML = place; //записывам в него наш ответ
  ul.appendChild(answ); //добавляем новый элемент в родителя ul
}

const btnRes = document.querySelector('#ok'); // кнопка для закрытия результата
btnRes.addEventListener('click', () => {
  resultDiv.style.display = 'none'; // скрываем результат
  //очищаем список результата для того, чтобы при повторном нажатии в форме "исходное положение" ответ не дублировался
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild); //удаляем все элементы списка.
  }
});