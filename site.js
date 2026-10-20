(() => {
  const label = document.querySelector('#month-label');
  const days = document.querySelector('#calendar-days');
  const previous = document.querySelector('#prev-month');
  const next = document.querySelector('#next-month');
  if (!label || !days || !previous || !next) return;

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const openDates = new Set([2, 5, 7, 12, 14, 19, 21, 26, 28]);
  let month = 6;
  let year = 2026;

  function drawCalendar() {
    label.textContent = `${monthNames[month]} ${year}`;
    days.replaceChildren();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const count = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstWeekday; i += 1) {
      const blank = document.createElement('span');
      blank.setAttribute('aria-hidden', 'true');
      days.append(blank);
    }
    for (let day = 1; day <= count; day += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = String(day);
      button.setAttribute('aria-label', `${day} ${monthNames[month].toLowerCase()} ${year}`);
      if (openDates.has(day)) {
        button.classList.add('available');
        button.title = 'Есть свободные места';
        button.addEventListener('click', () => {
          days.querySelectorAll('[aria-pressed="true"]').forEach((item) => item.removeAttribute('aria-pressed'));
          button.setAttribute('aria-pressed', 'true');
        });
      } else {
        button.disabled = true;
      }
      days.append(button);
    }
  }

  function shiftMonth(amount) {
    month += amount;
    if (month < 0) { month = 11; year -= 1; }
    if (month > 11) { month = 0; year += 1; }
    drawCalendar();
  }
  previous.addEventListener('click', () => shiftMonth(-1));
  next.addEventListener('click', () => shiftMonth(1));
  drawCalendar();
})();
