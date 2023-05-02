import { keysEng, keyCode, keysRus } from './keys.js';

const text = document.createElement('textarea');
text.classList.add('keyboard-text');
document.body.appendChild(text);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.appendChild(keyboard);

let out = '';
for (let i = 0; i < keysEng.length; i += 1) {
  out += `<div class="keyboard__key" data="${keyCode[i]}">
            <span class="key eng small">${keysEng[i]}</span>
            <span class="key rus small hidden">${keysRus[i]}</span>
          </div>`;
}
document.querySelector('.keyboard').innerHTML = out;

let caps = false;
let lang = 'eng';

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

function listener() {
  document.onkeydown = function keyListener(event) {
    document.querySelectorAll('.keyboard__key').forEach((element) => {
      element.classList.remove('key_active');
    });
    document.querySelector(`.keyboard__key[data="${event.code}"]`).classList.add('key_active');
    text.focus();
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
      case 'Control':
      case 'Shift':
      case 'Win':
        text.value += '';
        break;
      case 'Alt':
        if (event.ctrlKey === true) {
          if (lang === 'eng' && caps === false) {
            caps = 'rus';
            let outRus = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRus += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key rus">${keysRus[i]}</span>
                <span class="key eng hidden">${keysEng[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRus;
            getClass();
            listener();
          }
        }
        if (event.ctrlKey === true) {
          if (lang === 'rus' && caps === false) {
            lang = 'eng';
            let outEng = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEng += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng">${keysEng[i]}</span>
                <span class="key rus hidden">${keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEng;
            getClass();
            listener();
          }
        }
        if (event.ctrlKey === true) {
          if (lang === 'eng' && caps === true) {
            caps = 'rus';
            let outRus = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRus += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key rus">${keysRus[i].length === 1 ? keysRus[i].toUpperCase() : keysRus[i]}</span>
                <span class="key eng hidden">${keysEng[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRus;
            getClass();
            listener();
          }
        }
        if (event.ctrlKey === true) {
          if (lang === 'rus' && caps === true) {
            lang = 'eng';
            let outEng = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEng += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng">${keysEng[i].length === 1 ? keysEng[i].toUpperCase() : keysEng[i]}</span>
                <span class="key rus hidden">${keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEng;
            getClass();
            listener();
          }
        } else {
          text.value += '';
        }
        break;
      case 'CapsLock':
        if (caps === false) {
          caps = true;
          let outBig = '';
          for (let i = 0; i < keysEng.length; i += 1) {
            outBig += `<div class="keyboard__key" data="${keyCode[i]}">
              <span class="key eng">${keysEng[i].length === 1 ? keysEng[i].toUpperCase() : keysEng[i]}</span>
              <span class="key rus hidden">${keysRus[i]}</span>
            </div>`;
          }
          document.querySelector('.keyboard').innerHTML = outBig;
        } else if (caps === true) {
          caps = false;
          let outSmall = '';
          for (let i = 0; i < keysEng.length; i += 1) {
            outSmall += `<div class="keyboard__key" data="${keyCode[i]}">
              <span class="key eng">${keysEng[i].length === 1 ? keysEng[i].toLowerCase() : keysEng[i]}</span>
              <span class="key rus hidden">${keysRus[i]}</span>
            </div>`;
          }
          document.querySelector('.keyboard').innerHTML = outSmall;
        }
        getClass();
        listener();
        break;
      default:
        if (!document.querySelector(`.keyboard__key[data="${event.code}"]`).children[0].classList.contains('hidden')) {
          if (caps === false) {
            text.value += document.querySelector(`.keyboard__key[data="${event.code}"]`).children.textContent.toLowerCase();
          } else {
            text.value += document.querySelector(`.keyboard__key[data="${event.code}"]`).children.textContent.toUpperCase();
          }
        }
    }
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
        case 'Control':
        case 'Win':
          text.value += '';
          break;
        case 'CapsLock':
          if (caps === false && element.classList.contains('eng')) {
            caps = true;
            let outEngBig = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEngBig += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng">${keysEng[i].length === 1 ? keysEng[i].toUpperCase() : keysEng[i]}</span>
                <span class="key rus hidden">${keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEngBig;
          } else if (caps === true && element.classList.contains('eng')) {
            caps = false;
            let outEngSmall = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outEngSmall += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng">${keysEng[i].length === 1 ? keysEng[i].toLowerCase() : keysEng[i]}</span>
                <span class="key rus hidden">${keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = outEngSmall;
          }
          if (caps === false && element.classList.contains('rus')) {
            caps = true;
            let outRusBig = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRusBig += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng  hidden">${keysEng[i]}</span>
                <span class="key rus">${keysRus[i].length === 1 ? keysRus[i].toUpperCase() : keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRusBig;
          } else if (caps === true && element.classList.contains('rus')) {
            caps = false;
            let outRusSmall = '';
            for (let i = 0; i < keysEng.length; i += 1) {
              outRusSmall += `<div class="keyboard__key" data="${keyCode[i]}">
                <span class="key eng hidden">${keysEng[i]}</span>
                <span class="key rus">${keysRus[i].length === 1 ? keysRus[i].toLowerCase() : keysRus[i]}</span>
              </div>`;
            }
            document.querySelector('.keyboard').innerHTML = outRusSmall;
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
