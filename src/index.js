import './styles.css';

const refs = {
  secs: document.querySelector('span[data-value="secs"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  days: document.querySelector('span[data-value="days"]'),
  buttonStart: document.querySelector('.actions__button[data-active="start"]'),
  buttonStop: document.querySelector('.actions__button[data-active="stop"]'),
  buttonClear: document.querySelector('.actions__button[data-active="clear"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }

  startCount() {
    const targetDate = this.targetDate;
    refs.buttonStart.setAttribute('disabled', 'disabled');
    refs.buttonClear.setAttribute('disabled', 'disabled');
    refs.buttonStop.removeAttribute('disabled');
    refs.buttonStart.classList.add('contStart');
    refs.buttonStop.classList.remove('contStop');
    refs.buttonClear.classList.remove('contClear');
    const startDate = Date.now();
    const deltaTime = targetDate - startDate;
    this.clockIteration(deltaTime);
    this.intervalId = setInterval(() => {
      const startDate = Date.now();
      const deltaTime = targetDate - startDate;
      this.clockIteration(deltaTime);
    }, 1000);
  }
  clockIteration(date) {
    const days = this.pad(Math.floor(date / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((date % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((date % (1000 * 60)) / 1000));
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
  }

  stopCount() {
    refs.buttonStart.removeAttribute('disabled');
    refs.buttonClear.removeAttribute('disabled');
    refs.buttonStart.classList.remove('contStart');
    refs.buttonStop.classList.add('contStop');
    refs.buttonClear.classList.remove('contClear');
    clearInterval(this.intervalId);
  }
  clearCount() {
    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.mins.textContent = '00';
    refs.secs.textContent = '00';
    refs.buttonStop.setAttribute('disabled', 'disabled');
    refs.buttonStart.removeAttribute('disabled');
    refs.buttonStart.classList.remove('contStart');
    refs.buttonStop.classList.remove('contStop');
    refs.buttonClear.classList.add('contClear');
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const newCount = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2020'),
});
refs.buttonStart.addEventListener('click', newCount.startCount.bind(newCount));
refs.buttonStop.addEventListener('click', newCount.stopCount.bind(newCount));
refs.buttonClear.addEventListener('click', newCount.clearCount.bind(newCount));
