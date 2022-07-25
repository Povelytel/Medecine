function getDate(date, namedMonth = false, firstYears = false) {
  if (namedMonth) {
    const monthArr = [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень',
    ];
    if (firstYears) {
      return `${date.getFullYear()} ${monthArr[date.getMonth()]} "${date.getDate()}"`;
    }
    return `“${date.getDate()}” ${monthArr[date.getMonth()]} ${date.getFullYear()}`;
  }

  if (firstYears) {
    return `${date.getFullYear()}.${
      date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    }.${date.getDate()}`;
  }
  return `${date.getDate()}.${
    date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  }.${date.getFullYear()}`;
}

function getFullName(...args) {
  let first = true;
  let finalString = '';
  let delimeter = ' ';
  for (let arg of args) {
    if (first) {
      first = false;
      finalString = arg;
      continue;
    }
    finalString += delimeter + arg;
  }
  return finalString;
}

function getYear(bir, now) {
  let birNow = new Date(now.getFullYear(), bir.getMonth(), bir.getDate()); //ДР в текущем году
  let age = now.getFullYear() - bir.getFullYear();
  if (now < birNow) {
    age = age - 1;
  }
  return age;
}

module.exports = { getDate, getFullName, getYear };
