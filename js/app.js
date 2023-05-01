import { keysEng, keyCode, keysRus } from './keys.js';

const text = document.createElement('textarea');
text.classList.add('keyboard-text');
document.body.appendChild(text);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.appendChild(keyboard);

let out = '';
for (let i = 0; i < keysEng.length; i++) {
  out += `<div class="keyboard__key" data="${keyCode[i]}">
            <span class="key eng small">${keysEng[i]}</span>
            <span class="key rus small hidden">${keysRus[i]}</span>
          </div>`;
}
document.querySelector('.keyboard').innerHTML = out;

let caps = false;

function getClass() {
  for (let i = 0; i < document.querySelectorAll('.keyboard__key').length; i++) {
    if (document.querySelectorAll('.keyboard__key')[i].getAttribute('data') === 'Backspace') {
      document.querySelectorAll('.keyboard__key')[i].classList.add('key_wide');
    }
    if (document.querySelectorAll('.keyboard__key')[i].getAttribute('data') === 'CapsLock') {
      document.querySelectorAll('.keyboard__key')[i].classList.add('key_wide');
    }
    if (document.querySelectorAll('.keyboard__key')[i].getAttribute('data') === 'ShiftLeft') {
      document.querySelectorAll('.keyboard__key')[i].classList.add('key_wide');
    }
    if (document.querySelectorAll('.keyboard__key')[i].getAttribute('data') === 'Enter') {
      document.querySelectorAll('.keyboard__key')[i].classList.add('key_wide');
    }
    if (document.querySelectorAll('.keyboard__key')[i].getAttribute('data') === 'Space') {
      document.querySelectorAll('.keyboard__key')[i].classList.add('key_superwide');
    }
  }
}

getClass();

function listener() {
  document.onkeydown = function (event) {
    document.querySelectorAll('.keyboard__key').forEach((element) => {
      element.classList.remove('key_active');
    });
    document.querySelector(`.keyboard__key[data="${event.code}"]`).classList.add('key_active');
    text.focus();
    text.focus();
    switch (event.key) {
      case 'Enter':
        text.value += '\n';
        break;
      case 'Del':
        text.value = text.value.slice(0, text.value[text.selectionStart]) + text.value.slice(text.value[text.selectionStart 
          + 1]);
        break;
      case 'Backspace':
        text.value = text.value.slice(0, text.value.length - 1);
        break;
      case 'Tab':
        text.value += '    ';
        break;
      case 'Space':
        text.value += ' ';
        break;
      case 'Shift':
      case 'Alt':
      case 'Ctrl':
      case 'Win':
        text.value += '';
        break;
      case 'CapsLock':

        break;
      default:
        if (!event.target.classList.contains('hidden')) {
          text.value += event.target.textContent;
        }
    }
    text.value += event.key;
    console.log(event);
  };

  document.querySelectorAll('.key').forEach((element) => {
    element.addEventListener('click', () => {
      document.querySelectorAll('.key').forEach((elem) => {
        elem.classList.remove('key_active');
      });
      element.classList.add('key_active');
      text.focus();
      switch (element.textContent) {
        case 'Enter':
          text.value += '\n';
          break;
        case 'Del':
          text.value = text.value.slice(0, text.value[text.selectionStart]);
          break;
        case 'Backspace':
          text.value = text.value.slice(0, text.value.length - 1);
          break;
        case 'Tab':
          text.value += '    ';
          break;
        case 'Space':
          text.value += ' ';
          break;
        case 'Shift':
        case 'Alt':
        case 'Ctrl':
        case 'Win':
          text.value += '';
          break;
        case 'CapsLock':
          if (caps === false && element.classList.contains('eng')) {
            caps = true;
            let out = '';
            for (let i = 0; i < keysEng.length; i++) {
              out += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng">${keysEng[i].length === 1 ? keysEng[i].toUpperCase() : keysEng[i]}</span>
                <span class="key rus hidden">${keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = out;
          } else if (caps === true && element.classList.contains('eng')) {
            caps = false;
            let out = '';
            for (let i = 0; i < keysEng.length; i++) {
              out += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng">${keysEng[i].length === 1 ? keysEng[i].toLowerCase() : keysEng[i]}</span>
                <span class="key rus hidden">${keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = out;
          }
          if (caps === false && element.classList.contains('rus')) {
            caps = true;
            let out = '';
            for (let i = 0; i < keysEng.length; i++) {
              out += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng  hidden">${keysEng[i]}</span>
                <span class="key rus">${keysRus[i].length === 1 ? keysRus[i].toUpperCase() : keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = out;
          } else if (caps === true && element.classList.contains('rus')) {
            caps = false;
            let out = '';
            for (let i = 0; i < keysEng.length; i++) {
              out += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng hidden">${keysEng[i]}</span>
                <span class="key rus">${keysRus[i].length === 1 ? keysRus[i].toLowerCase() : keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = out;
          }
          getClass();
          listener();
          break;
        default:
          if (!element.classList.contains('hidden')) {
            if (caps === false) {
              text.value += element.textContent.toLowerCase();
            } else {
              text.value += element.textContent.toUpperCase();
            }
          }
      }
    });
  });
}
getClass();
listener();
