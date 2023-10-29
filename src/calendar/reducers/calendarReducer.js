import monthsData from './monthsData';

const today = new Date();

const initialData = {
  monthName: monthsData[today.getMonth()].monthName,
  dates: [[], [], [], [], [], []],
};

for (let i = 0; i < 42; i += 1) {
  initialData.dates[Math.floor(i / 7)].push(`date-${i}`);
}

const calendarReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case 'CHANGE_MONTH':
      return {
        ...state,
        monthName: monthsData[payload.newDate.getMonth()].monthName,
        yearName: payload.newDate.getFullYear(),
      };

    default:
      return state;
  }
};

export default calendarReducer;
