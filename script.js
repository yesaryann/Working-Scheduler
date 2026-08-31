const team = [
  {
    name: 'Aryan Raj',
    initials: 'AR',
    color: '#f6c5bd',
    schedule: {},
    defaultPattern: ['WFH', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'Office']
  },
  {
    name: 'Jha Avichal',
    initials: 'JA',
    color: '#f4d787',
    schedule: {},
    defaultPattern: ['Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH']
  },
  {
    name: 'Padihary Subas',
    initials: 'PS',
    color: '#9ad9ed',
    schedule: {},
    defaultPattern: ['WFH', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'WFH']
  },
  {
    name: 'Rani Yalamaddi',
    initials: 'RY',
    color: '#f3b8b0',
    schedule: {},
    defaultPattern: ['Office', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH', 'Office', 'Office', 'WFH', 'WFH']
  },
  {
    name: 'Singh Hargovind',
    initials: 'SH',
    color: '#d8d8d8',
    schedule: {},
    defaultPattern: ['WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office']
  },
  {
    name: 'Singh Khushbu',
    initials: 'SK',
    color: '#9fe7d2',
    schedule: {},
    defaultPattern: ['Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office']
  },
  {
    name: 'Thakur Tanmaya',
    initials: 'TT',
    color: '#f6c1d6',
    schedule: {},
    defaultPattern: ['WFH', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'WFH', 'Office', 'WFH', 'WFH', 'Office', 'WFH']
  }
];

const memberList = document.getElementById('memberList');
const selectedName = document.getElementById('selectedName');
const calendarGrid = document.getElementById('calendarGrid');
const monthLabel = document.querySelector('.month-label');
const navButtons = document.querySelectorAll('.nav-button');
const officeCountText = document.getElementById('officeCountText');

let selectedMemberIndex = 0;
let currentMonth = new Date();
currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function formatDayStatus(status) {
  if (status === 'Leave') return 'Leave';
  return status === 'WFH' ? 'WFH' : 'Office';
}

function getTodayReference() {
  const today = new Date();
  if (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth()) {
    return today.getDate();
  }
  return 1;
}

function getMonthSchedule(member, date) {
  const key = monthKey(date);

  if (!member.schedule[key]) {
    const days = daysInMonth(date);
    member.schedule[key] = Array.from({ length: days }, (_, index) => {
      const source = member.defaultPattern[index % member.defaultPattern.length];
      return source || 'Office';
    });
  }

  return member.schedule[key];
}

function updateMonthLabel() {
  monthLabel.textContent = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(currentMonth);
}

function changeMonth(delta) {
  currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1);
  render();
}

function syncMemberStatusBadge(memberIndex, statusValue) {
  const activeCard = memberList.querySelectorAll('.member-card')[memberIndex];
  if (!activeCard) return;

  const badge = activeCard.querySelector('.status-badge');
  const pill = activeCard.querySelector('.status-pill');

  if (badge) {
    badge.className = `status-badge ${statusValue.toLowerCase()}`;
  }

  if (pill) {
    pill.className = `status-pill ${statusValue.toLowerCase()}`;
    pill.textContent = formatDayStatus(statusValue);
  }
}

function applySelectState(selectElement, value) {
  const option = Array.from(selectElement.options).find(item => item.value === value);
  if (!option) return;

  option.selected = true;
  selectElement.selectedIndex = Array.from(selectElement.options).indexOf(option);
  selectElement.value = value;
}

function renderMemberList() {
  memberList.innerHTML = '';

  team.forEach((member, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `member-card ${index === selectedMemberIndex ? 'active' : ''}`;
    button.setAttribute('aria-pressed', index === selectedMemberIndex ? 'true' : 'false');

    const schedule = getMonthSchedule(member, currentMonth);
    const todayDay = getTodayReference();
    const statusText = schedule[todayDay - 1] || 'Office';

    button.innerHTML = `
      <span class="member-main">
        <span class="avatar" style="background:${member.color};">${member.initials}</span>
        <span class="member-name">${member.name}</span>
      </span>
      <span class="member-meta">
        <span class="status-badge ${statusText.toLowerCase()}"></span>
        <span class="status-pill ${statusText.toLowerCase()}">${formatDayStatus(statusText)}</span>
      </span>
    `;

    button.addEventListener('click', () => {
      selectedMemberIndex = index;
      render();
    });

    memberList.appendChild(button);
  });
}

function updateOfficeCount() {
  const selectedMember = team[selectedMemberIndex];
  const selectedSchedule = getMonthSchedule(selectedMember, currentMonth);
  const officeDays = selectedSchedule.filter(status => status === 'Office').length;
  officeCountText.textContent = `${officeDays} days in office`;
}

function renderCalendar() {
  const selectedMember = team[selectedMemberIndex];
  const monthDays = daysInMonth(currentMonth);
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const selectedSchedule = getMonthSchedule(selectedMember, currentMonth);

  selectedName.textContent = selectedMember.name;
  calendarGrid.innerHTML = '';

  for (let i = 0; i < startOffset; i += 1) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day-cell empty';
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= monthDays; day += 1) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const status = selectedSchedule[day - 1] || 'Office';

    const cell = document.createElement('div');
    cell.className = `day-cell${isWeekend ? ' weekend' : ''}`;
    cell.dataset.status = status;

    if (isWeekend) {
      cell.innerHTML = `
        <span class="day-number">${day}</span>
        <span class="day-status holiday">Holiday</span>
      `;
    } else {
      const select = document.createElement('select');
      select.className = 'day-select';
      select.setAttribute('aria-label', `Status for ${day}`);

      const options = ['WFH', 'Office', 'Leave'];
      options.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue === 'Office' ? 'In Office' : optionValue;
        select.appendChild(option);
      });

      applySelectState(select, status);

      select.addEventListener('change', function () {
        const nextValue = this.value;
        selectedSchedule[day - 1] = nextValue;
        cell.dataset.status = nextValue;
        applySelectState(this, nextValue);
        syncMemberStatusBadge(selectedMemberIndex, nextValue);
        updateOfficeCount();
      });

      cell.innerHTML = `
        <span class="day-number">${day}</span>
      `;
      cell.appendChild(select);
    }

    calendarGrid.appendChild(cell);
  }
}

function render() {
  updateMonthLabel();
  renderMemberList();
  renderCalendar();
  updateOfficeCount();
}

navButtons[0].addEventListener('click', () => changeMonth(-1));
navButtons[1].addEventListener('click', () => changeMonth(1));

render();
