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

const keyCode = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'Backslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

function init() {
  let out = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < keys.length; i++) {
    out += `<div class="keyboard__key" data="${keyCode[i]}">${keys[i]}</div>`;
  }
  document.querySelector('.keyboard').innerHTML = out;
}
init();

function getClass() {
  const allkeys = document.querySelectorAll('.keyboard__key');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < allkeys.length; i++) {
    if (allkeys[i].textContent === 'Backspace' || allkeys[i].innerHTML === '' || allkeys[i].innerHTML === 'CapsLock'
    || allkeys[i].innerHTML === 'Enter' || allkeys[i].innerHTML === 'Shift') {
      allkeys[i].classList.add('key_wide');
    }
    if (allkeys[i].textContent === 'Space') {
      allkeys[i].classList.add('key_superwide');
    }
  }
}

getClass();

const allKeys = document.querySelectorAll('.keyboard__key');

// eslint-disable-next-line func-names
document.onkeydown = function (event) {
  allKeys.forEach((element) => {
    element.classList.remove('key_active');
  });
  document.querySelector(`.keyboard__key[data="${event.code}"]`).classList.add('key_active');
};

allKeys.forEach((element) => {
  element.addEventListener('click', () => {
    allKeys.forEach((elem) => {
      elem.classList.remove('key_active');
    });
    element.classList.add('key_active');
  });
});
