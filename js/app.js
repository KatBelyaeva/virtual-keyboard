// eslint-disable-next-line import/extensions
import { keysEng, keyCode, keysRus } from './keys.js';

const text = document.createElement('textarea');
text.classList.add('keyboard-text');
document.body.appendChild(text);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.appendChild(keyboard);

const language = document.createElement('p');
language.classList.add('language');
language.textContent = "Для смены языка нажмите 'Ctrl' + 'Shift'";
document.body.appendChild(language);

function init() {
  let out = '';
  for (let i = 0; i < keysEng.length; i += 1) {
    out += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i]}</div>`;
  }
  document.querySelector('.keyboard').innerHTML = out;
}

init();

function getClass() {
  for (let i = 0; i < document.querySelectorAll('.keyboard__key').length; i += 1) {
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

let caps = false;
let lang = 'eng';

function listener() {
  document.querySelectorAll('.keyboard__key').forEach((element) => {
    element.addEventListener('click', () => {
      document.querySelectorAll('.keyboard__key').forEach((elem) => {
        elem.classList.remove('key_active');
      });
      element.classList.add('key_active');
      text.focus();
      switch (element.textContent) {
        case 'Enter':
          text.value += '\n';
          break;
        case 'Del':
          if (text.selectionStart === text.selectionEnd) {
            text.setRangeText('', text.selectionStart, text.selectionEnd + 1, 'end');
          } else {
            text.setRangeText('', text.selectionStart, text.selectionEnd, 'end');
          }
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
          if (caps === false) {
            caps = true;
            if (lang === 'eng') {
              let outEngBig = '';
              for (let i = 0; i < keysEng.length; i += 1) {
                outEngBig += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i].length === 1 ? keysEng[i].toUpperCase() : keysEng[i]}</div>`;
              }
              document.querySelector('.keyboard').innerHTML = outEngBig;
            }
            if (lang === 'rus') {
              let outRusBig = '';
              for (let i = 0; i < keysEng.length; i += 1) {
                outRusBig += `<div class="keyboard__key" data="${keyCode[i]}">${keysRus[i].length === 1 ? keysRus[i].toUpperCase() : keysRus[i]}</div>`;
              }
              document.querySelector('.keyboard').innerHTML = outRusBig;
            }
          } else if (caps === true) {
            caps = false;
            if (lang === 'eng') {
              let outEngSmall = '';
              for (let i = 0; i < keysEng.length; i += 1) {
                outEngSmall += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i].length === 1 ? keysEng[i].toLowerCase() : keysEng[i]}</div>`;
              }
              document.querySelector('.keyboard').innerHTML = outEngSmall;
            }
            if (lang === 'rus') {
              let outRusSmall = '';
              for (let i = 0; i < keysEng.length; i += 1) {
                outRusSmall += `<div class="keyboard__key" data="${keyCode[i]}">${keysRus[i].length === 1 ? keysRus[i].toLowerCase() : keysRus[i]}</div>`;
              }
              document.querySelector('.keyboard').innerHTML = outRusSmall;
            }
          }
          getClass();
          listener();
          break;
        default:
          if (caps === false) {
            text.value += element.textContent.toLowerCase();
          } else {
            text.value += element.textContent.toUpperCase();
          }
      }
    });
  });
  document.onkeydown = function keyListener(event) {
    document.querySelectorAll('.keyboard__key').forEach((element) => {
      element.classList.remove('key_active');
    });
    document.querySelector(`.keyboard__key[data="${event.code}"]`).classList.add('key_active');
    switch (event.key) {
      case 'Enter':
        text.value += '\n';
        break;
      case 'Del':
        if (text.selectionStart === text.selectionEnd) {
          text.setRangeText('', text.selectionStart, text.selectionEnd + 1, 'end');
        } else {
          text.setRangeText('', text.selectionStart, text.selectionEnd, 'end');
        }
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
        if (event.type === 'keydown' && lang === 'rus') {
          let outRus = '';
          for (let i = 0; i < keysEng.length; i += 1) {
            outRus += `<div class="keyboard__key" data="${keyCode[i]}">${keysRus[i].length === 1 ? keysRus[i].toUpperCase() : keysRus[i]}</div>`;
          }
          document.querySelector('.keyboard').innerHTML = outRus;
        }
        if (event.type === 'keydown' && lang === 'eng') {
          let outEng = '';
          for (let i = 0; i < keysEng.length; i += 1) {
            outEng += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i].length === 1 ? keysEng[i].toUpperCase() : keysEng[i]}</div>`;
          }
          document.querySelector('.keyboard').innerHTML = outEng;
        }
        if (event.ctrlKey === true) {
          if (lang === 'eng' && caps === false) {
            lang = 'rus';
            let outRus = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRus += `<div class="keyboard__key" data="${keyCode[i]}">${keysRus[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRus;
          } else if (lang === 'rus' && caps === false) {
            lang = 'eng';
            let outEng = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEng += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEng;
          }
          if (lang === 'eng' && caps === true) {
            lang = 'rus';
            let outRus = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRus += `<div class="keyboard__key" data="${keyCode[i]}">${keysRus[i].length === 1 ? keysRus[i].toUpperCase() : keysRus[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRus;
          } else if (lang === 'rus' && caps === true) {
            lang = 'eng';
            let outEng = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEng += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i].length === 1 ? keysEng[i].toUpperCase() : keysEng[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEng;
          }
        } else {
          text.value += '';
        }
        getClass();
        listener();
        break;
      case 'Alt':
      case 'Win':
        text.value += '';
        break;
      case 'Control':
        if (event.shiftKey === true) {
          if (lang === 'eng' && caps === false) {
            lang = 'rus';
            let outRus = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRus += `<div class="keyboard__key" data="${keyCode[i]}">${keysRus[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRus;
          } else if (lang === 'rus' && caps === false) {
            lang = 'eng';
            let outEng = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEng += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEng;
          }
          if (lang === 'eng' && caps === true) {
            lang = 'rus';
            let outRus = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRus += `<div class="keyboard__key" data="${keyCode[i]}">${keysRus[i].length === 1 ? keysRus[i].toUpperCase() : keysRus[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRus;
          } else if (lang === 'rus' && caps === true) {
            lang = 'eng';
            let outEng = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEng += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i].length === 1 ? keysEng[i].toUpperCase() : keysEng[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEng;
          } else {
            text.value += '';
          }
        }
        getClass();
        listener();
        break;
      case 'CapsLock':
        if (caps === false) {
          caps = true;
          if (lang === 'eng') {
            let outEngBig = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEngBig += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i].length === 1 ? keysEng[i].toUpperCase() : keysEng[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEngBig;
          }
          if (lang === 'rus') {
            let outRusBig = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRusBig += `<div class="keyboard__key" data="${keyCode[i]}">${keysRus[i].length === 1 ? keysRus[i].toUpperCase() : keysRus[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRusBig;
          }
        } else if (caps === true) {
          caps = false;
          if (lang === 'eng') {
            let outEngSmall = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEngSmall += `<div class="keyboard__key" data="${keyCode[i]}">${keysEng[i].length === 1 ? keysEng[i].toLowerCase() : keysEng[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEngSmall;
          }
          if (lang === 'rus') {
            let outRusSmall = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRusSmall += `<div class="keyboard__key" data="${keyCode[i]}">${keysRus[i].length === 1 ? keysRus[i].toLowerCase() : keysRus[i]}</div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRusSmall;
          }
        }
        getClass();
        listener();
        break;
      default:
        text.value += event.key;
    }
  };
}

listener();
