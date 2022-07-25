const { getDate, getFullName, getYear } = require('./main');

/**
 *
 * @param myDoc
 * @param user
 * @param appointment
 * @param global
 */
function getDocumentTypeOne(myDoc, user, appointment, global) {
  const birthday = new Date(user.birthday),
    now = new Date();
  const testWidth = 500;
  const interval = 0.5;
  const textDecor = {
    width: testWidth,
    align: 'left',
  };
  myDoc.font('Ti-Bo').fontSize(16);
  myDoc
    .text(global.title, {
      width: testWidth,
      align: 'center',
    })
    .moveDown(interval);
  myDoc.font('Ti-Ro').fontSize(14);
  myDoc.text('Дата: ' + getDate(birthday), textDecor).moveDown(interval);
  myDoc
    .text(
      `Пацієнт: ${getFullName(user.last_name, user.first_name, user.patronymic)}     № пацієнта: ${user.id}`,
      textDecor,
    )
    .moveDown(interval);
  myDoc
    .text(`Вік: ${getYear(birthday, now)}     Стать: ${user.gender === 0 ? 'Чоловіча' : 'Жіноча'}`, textDecor)
    .moveDown(interval);
  myDoc.text('Скарги: ' + appointment.problems, textDecor).moveDown(interval);
  myDoc.text('Анамнез життя: ' + appointment.life_history, textDecor).moveDown(interval);
  myDoc.text('Анамнез захворювання: ' + appointment.disease_history, textDecor).moveDown(interval);
  myDoc.text('Вважає себе хворим на протязі: ' + appointment.think_begin, textDecor).moveDown(interval);
  myDoc.text('Початок захворювання: ' + appointment.disease_begin, textDecor).moveDown(interval);
  myDoc.text('Лікування: ' + appointment.treatment, textDecor).moveDown(interval);
  myDoc.text("Об'єктивне обстеження: " + appointment.objective_examination, textDecor).moveDown(interval);
  myDoc.text('Хода: ' + appointment.walk, textDecor).moveDown(interval);
  myDoc.text('Пальпаторно: ' + appointment.palpatation, textDecor).moveDown(interval);
  myDoc.text('Обвід сегмента: ' + appointment.segment_perimeter, textDecor).moveDown(interval);
  myDoc.text('Рухи в суглобі: ' + appointment.segment_walk, textDecor).moveDown(interval);
  myDoc.text('Дані ренгенографії: ' + appointment.xray_about, textDecor).moveDown(interval);
  myDoc.text('Дата ренгенографії: ' + getDate(new Date(appointment.xray_date)), textDecor).moveDown(interval);
  myDoc.text('Попередній діагноз: ' + appointment.preliminary_diagnosis, textDecor).moveDown(interval);
  myDoc.text('Клінічний діагноз: ' + appointment.clinical_diagnosis, textDecor).moveDown(interval);
  myDoc.text('План обстеження: ' + appointment.survey_plan, textDecor).moveDown(interval);
  myDoc.text('Призначення лікування: ' + appointment.appointment, textDecor).moveDown(interval);
  myDoc.text('Повторна консультація: ' + appointment.re_consultation, textDecor).moveDown(interval);
  myDoc.text('Потребує: ' + appointment.needs, textDecor).moveDown(interval + 1);
  myDoc.text(`Лікуючий лікар: ${global.doctor_name} _______________`, {
    width: testWidth,
    align: 'right',
  });

  myDoc.lineWidth(0.5);
  const rectInt = 10;
  myDoc.rect(myDoc.x - rectInt, 30, testWidth + rectInt * 2, myDoc.y).stroke();
  myDoc.end();
}

/**
 *
 * @param myDoc
 * @param user
 * @param appointment
 * @param global
 */
function getDocumentTypeTwo(myDoc, user, appointment, global) {
  const birthday = new Date(user.birthday),
    now = new Date();

  let size = 6.5;

  let width = 164,
    lineGap = 2;

  const baseConf = {
    width: 164,
    lineGap: 2,
    align: 'center',
  };

  let heightInt = size + baseConf.lineGap + 1;
  let textDelimetr = '. ';

  myDoc.font('Ti-Ro').fontSize(size);

  baseConf.height = heightInt * 2;
  myDoc
    .text(
      'Найменування міністерства, іншого органу виконавчої влади, підприємства, установи, організації, до сфери управління якого належить заклад охорони здоров’я',
      28,
      37,
      { width, align: 'justify' },
    )
    .text(getSpace(1000), baseConf)
    .text('Найменування  та місцезнаходження (повна поштова адреса) закладу охорони здоров’я, де заповнюється форма', {
      width,
      lineGap,
      align: 'left',
    });

  let height = heightInt;
  myDoc
    .text(getSpace(500), baseConf)
    .text('Код за ЄДРПОУ', { width: width - 5, height, lineGap, align: 'left', continued: true })
    .text(' 0 2 0 1 1 0 3 1 ', { height, lineGap, align: 'right', underline: true });

  baseConf.width = 154;
  baseConf.align = 'center';

  myDoc
    .text(getSpace(500), 33, 55, { ...baseConf, underline: true })
    .text(getSpace(500), { ...baseConf, underline: true })
    .font('Ti-Bo')
    .text(getSpace(30) + 'ВОКЛ ім. М.І.Пирогова' + getSpace(500), 33, 99, baseConf);

  myDoc.text('М Е Д И Ч Н А  Д О К У М Е Н Т А Ц І Я', 215, 42, baseConf);
  myDoc.font('Ti-Ro').text('Форма первинної облікової документації', 215, 57, baseConf);
  myDoc.font('Ti-Bo').text('№ 027/o', baseConf).moveDown(1.5);
  myDoc.text('З А Т В Е Р Д Ж Е Н О', baseConf).moveDown(1.5);

  myDoc
    .font('Ti-Ro')
    .text('Наказ МОЗ України', {
      align: 'center',
    })
    .text('| 1 | 4 | 0 | 2 | 2 | 0 | 1 | 2 |   №   | 1 | 1 | 0 |    |', {
      align: 'center',
      underline: true,
    });

  baseConf.size = 8;
  baseConf.lineGap = 2;
  baseConf.width = 342;
  heightInt = size + lineGap + 1;
  baseConf.height = heightInt * 2;
  myDoc.font('Ti-Bo').fontSize(size);
  myDoc
    .text('В И П И С К А', 30, 135, baseConf)
    .text('із медичної карти амбулаторного (стаціонарного) хворого ', baseConf);

  const spaceStr = getSpace(7000);
  myDoc.font('Ti-Ro').fontSize(size);
  baseConf.height = heightInt * 4;
  baseConf.align = 'left';
  myDoc.text('У ', 30, 172, { ...baseConf, continued: true }).text(spaceStr, { ...baseConf, underline: true });

  baseConf.height = heightInt * 2;
  myDoc
    .text('1. Прізвище, ім’я, по батькові хворого ', { ...baseConf, continued: true })
    .text('  ' + getFullName(user.last_name, user.first_name, user.patronymic) + spaceStr, {
      ...baseConf,
      underline: true,
    });

  baseConf.height = heightInt;
  myDoc.text('2. Дата народження    ', { ...baseConf, continued: true }).text(getDate(birthday), {
    underline: true,
  });

  baseConf.height = heightInt * 2;
  myDoc
    .text('3. Місце проживання хворого: область', { ...baseConf, continued: true })
    .text(spaceStr, { ...baseConf, underline: true });

  myDoc
    .text('4. Місце роботи (посада) ', { ...baseConf, continued: true })
    .text('  ' + user.job + spaceStr, { ...baseConf, underline: true });

  baseConf.height = heightInt * 8;
  myDoc
    .text('5. Дати: а) в амбулаторно-поліклінічному закладі:', { ...baseConf, continued: true })
    .text(spaceStr, { ...baseConf, underline: true })
    .moveDown(1);

  baseConf.height = heightInt * 8;
  myDoc
    .text('6. Повний діагноз (основне захворювання, супутні захворювання та ускладнення): ', { ...baseConf })
    .text(
      appointment.treatment +
        textDelimetr +
        appointment.appointment +
        textDelimetr +
        appointment.needs +
        getSpace(7000),
      { ...baseConf, underline: true },
    );

  myDoc.lineWidth(1);
  myDoc.rect(25, 35, 350, 520).stroke();
  myDoc.lineCap('butt').moveTo(25, 125).lineTo(375, 125).stroke();
  myDoc.lineCap('butt').moveTo(25, 170).lineTo(375, 170).stroke();
  myDoc.lineWidth(0.1);
  myDoc.lineCap('butt').moveTo(195, 35).lineTo(195, 125).stroke();
  myDoc.lineCap('butt').moveTo(208, 35).lineTo(208, 125).stroke();
  myDoc.lineCap('butt').moveTo(208, 55).lineTo(375, 55).stroke();

  myDoc.addPage({
    size: 'A5',
    margins: {
      top: 35,
      bottom: 60,
      left: 54,
      right: 20,
    },
  });
  myDoc.fontSize(size);
  baseConf.height = heightInt * 26;
  myDoc
    .text(
      '7. Короткий анамнез, діагностичні дослідження, перебіг хвороби, проведене лікування, стан при направленні, при виписці ',
      { ...baseConf, continued: true },
    )
    .text(
      appointment.treatment +
        textDelimetr +
        appointment.appointment +
        textDelimetr +
        appointment.needs +
        getSpace(7000),
      {
        underline: true,
      },
    );

  baseConf.height = heightInt * 15;
  myDoc
    .text('8. Лікувальні і трудові рекомендації ', { ...baseConf, continued: true })
    .text(getSpace(4000), {
      underline: true,
    })
    .moveDown(3);
  myDoc.text(' ' + getDate(now, true) + ' року', {
    width: baseConf.width,
    align: 'left',
    continued: true,
    underline: true,
  });
  myDoc.text(`Лікуючий лікар: ${global.doctor_name} __________`, {
    align: 'right',
    underline: false,
  });
  // const rectInt = 5;
  // console.log([myDoc.x - rectInt, 25, testWidth + rectInt * 2, myDoc.y - rectInt]);
  myDoc.lineWidth(1);
  myDoc.rect(50, 30, 350, 510).stroke();
  myDoc.end();
}

function getSpace(numCount, delimeter = ' ') {
  let finalStr = '';
  for (let i = 0; i < numCount; i++) {
    finalStr += delimeter;
  }
  return finalStr;
}

module.exports = { getDocumentTypeOne, getDocumentTypeTwo };

/*
async function generatePdf() {
  try {
    const doc = new PDFDocument();

    doc.fontSize(25).text('Some text with an embedded font!', 100, 100);

    if (process.env.NODE_ENV === 'development') {
      doc.pipe(fs.createWriteStream(`${__dirname}/../file.pdf`));
    }

    doc.end();

    const pdfStream = await getStream.buffer(doc);

    return pdfStream;
  } catch (error) {
    return null;
  }
}



* */
/*
const pdfStream = await generatePdf();

res
.writeHead(200, {
'Content-Length': Buffer.byteLength(pdfStream),
'Content-Type': 'application/pdf',
'Content-disposition': 'attachment;filename=test.pdf',
})
.end(pdfStream);
*/
