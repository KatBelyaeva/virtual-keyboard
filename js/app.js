const text = document.createElement('textarea');
text.classList.add('keyboard-text');
document.body.appendChild(text);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.appendChild(keyboard);

const keys = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
  'Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', ',', '/', '↑', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'];

function init() {
  let out = '';
  for (let i = 0; i < keys.length; i++) {
    out += `<div class="keyboard__key">${keys[i]}</div>`;
  }
  document.querySelector('.keyboard').innerHTML = out;
}
init();

function getClass() {
  const allkeys = document.querySelectorAll('.keyboard__key');
  for (let i = 0; i < allkeys.length; i++) {
    if (allkeys[i].textContent === 'Backspace' || allkeys[i].innerHTML === '' || allkeys[i].innerHTML === 'CapsLock' || 
    allkeys[i].innerHTML === 'Enter' || allkeys[i].innerHTML === 'Shift') {
      allkeys[i].classList.add('key_wide');
    }
    if (allkeys[i].textContent === 'Space') {
      allkeys[i].classList.add('key_superwide');
    }
  }
}
getClass();



//  for (let i = 0; i < keys.length; i++) {
//    [
//        192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
//        9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220,
//        20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
//        16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16,
//        17, 91, 18, 32, 18, 17, 37, 40, 39];
