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
  myDoc.font('Ti-Bo').fontSize(16);
  myDoc
    .text(global.title, {
      width: testWidth,
      align: 'center',
    })
    .moveDown(interval);
  myDoc.font('Ti-Ro').fontSize(14);
  myDoc
    .text('Дата: ' + getDate(birthday), {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text(`Пацієнт: ${getFullName(user.last_name, user.first_name, user.patronymic)}     № пацієнта: ${user.id}`, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text(`Вік: ${getYear(birthday, now)}     Стать: ${user.gender === 0 ? 'Чоловіча' : 'Жіноча'}`, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Скарги: ' + appointment.problems, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Анамнез життя: ' + appointment.life_history, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Анамнез захворювання: ' + appointment.disease_history, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Вважає себе хворим на протязі: ' + appointment.think_begin, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Початок захворювання: ' + appointment.disease_begin, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Лікування: ' + appointment.treatment, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text("Об'єктивне обстеження: " + appointment.objective_examination, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Хода: ' + appointment.walk, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Пальпаторно: ' + appointment.palpatation, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Обвід сегмента: ' + appointment.segment_perimeter, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Рухи в суглобі: ' + appointment.segment_walk, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Дані ренгенографії: ' + appointment.xray_about, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Дата ренгенографії: ' + getDate(new Date(appointment.xray_date)), {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Попередній діагноз: ' + appointment.preliminary_diagnosis, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Клінічний діагноз: ' + appointment.clinical_diagnosis, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('План обстеження: ' + appointment.survey_plan, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Призначення лікування: ' + appointment.appointment, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Повторна консультація: ' + appointment.re_consultation, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval);
  myDoc
    .text('Потребує: ' + appointment.needs, {
      width: testWidth,
      align: 'left',
    })
    .moveDown(interval + 1);
  myDoc.text(`Лікар: _______________  ${global.doctor_name}`, {
    width: testWidth - 10,
    align: 'right',
  });

  myDoc.lineWidth(0.5);
  myDoc.rect(myDoc.x - 10, 30, testWidth + 10, myDoc.y).stroke();
  myDoc.end();
}
function getDocumentTypeTwo(myDoc, user, appointment) {}

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
