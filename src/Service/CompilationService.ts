const formatData = (chosenFormsYear: IresponseForm[]) => {
  const chosenF = [...chosenFormsYear];
  const Months: IformattedCompilation[] = [];

  // skap ett object för varje månad som finns och skapa namn på månad
  for (let i = 0; i < chosenF.length; i++) {
    const monthName = getMonth(Number(chosenF[i].formdata.date.split("-")[1]));
    // Kontrollera om månaden redan finns i Months-arrayen
    let foundMonth = false;
    for (let j = 0; j < Months.length; j++) {
      if (Months[j].month.name === monthName.name) {
        Months[j].formData.push(chosenF[i]);
        foundMonth = true;
        break;
      }
    }
    if (!foundMonth) {
      const month = {
        month: monthName,
        formData: [], // här skall alla formulär för den månaden läggas in
        averageValue: 0,
        anxValues: [],
        days: [], // här skall alla dagar finnas och deras fomulär
      };
      Months.push(month);

      //lägg in fomulär till varje månad
      for (let j = 0; j < Months.length; j++) {
        if (Months[j].month.valueM === chosenF[i].formdata.date.split("-")[1]) {
          Months[j].formData.push(chosenF[i]);
        }
      }
    }
  }
  // lägg till averageValue för varje månad på ångest samt en lista med ångest niveåerna för det året

  for (let i = 0; i < Months.length; i++) {
    const anxietyValues: number[] = [];
    const forms = Months[i].formData;
    for (let j = 0; j < forms.length; j++) {
      const value = getValueNumber(forms[j].formdata.answer[0].question);
      anxietyValues.push(value);
    }
    Months[i].anxValues = anxietyValues;
    const average = getAverage(anxietyValues);
    Months[i].averageValue = average;

    // lägg in days per månad med averagevalue day samt datum.
    const getDays: string[] = [];

    for (let k = 0; k < Months[i].formData.length; k++) {
      // Kontrollera om datumet redan finns i getDays
      if (
        !getDays.some((date) => date === Months[i].formData[k].formdata.date)
      ) {
        getDays.push(Months[i].formData[k].formdata.date);
      }
    }

    getDays.forEach((date) => {
      const valuesAnxDays: number[] = [];
      const day = {
        month: Months[i].month,
        date: date,
        avergeValueDay: 0,
        formsDay: Months[i].formData.filter(
          (forms) => forms.formdata.date === date
        ),
      };
      day.formsDay.forEach((form) => {
        const toNumber = getValueNumber(form.formdata.answer[0].question);
        valuesAnxDays.push(toNumber);
      });
      const averageValueD = getAverage(valuesAnxDays);
      day.avergeValueDay = averageValueD;
      Months[i].days.push(day);
    });
  }

  return Months;
};

const getMonth = (month: number) => {
  switch (month) {
    case 1:
      return { name: "Januari", valueM: "1" };
    case 2:
      return { name: "Februari", valueM: "2" };
    case 3:
      return { name: "Mars", valueM: "3" };
    case 4:
      return { name: "April", valueM: "4" };
    case 5:
      return { name: "Maj", valueM: "5" };
    case 6:
      return { name: "Juni", valueM: "6" };
    case 7:
      return { name: "Juli", valueM: "7" };
    case 8:
      return { name: "Augusti", valueM: "8" };
    case 9:
      return { name: "September", valueM: "9" };
    case 10:
      return { name: "Ocktober", valueM: "10" };
    case 11:
      return { name: "November", valueM: "11" };
    case 12:
      return { name: "December", valueM: "12" };
    default:
      return { name: "Ogiltig månad ", valueM: "0" };
  }
};

const getValueNumber = (value: string) => {
  switch (value) {
    case "Ingen ångest":
      return 1;
    case "Mild ångest":
      return 2;
    case "Lätt ångest":
      return 3;
    case "Måttlig ångest":
      return 4;
    case "Medelstark ångest":
      return 5;
    case "Stark ångest":
      return 6;
    case "Mycket stark ångest":
      return 7;
    case "Jätte mycket ångest":
      return 8;
    case "Jätte jätte mycket":
      return 9;
    case "Extremt mycket ångest":
      return 10;
    default:
      return 0;
  }
};

const getAverage = (values: number[]) => {
  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
  return Math.round(average);
};

const addAnsweToQuestionfunc = (
  data: IresponseForm,
  Questions: IQuestion2[]
) => {
  const questCopy = [...Questions];

  const answeAndQuestions = [
    {
      question: questCopy[0]?.question,
      answ: data.formdata.answer[0].question,
    },
    { question: questCopy[1]?.qustion, answ: data.formdata.answer[1].qustion },
    {
      question: questCopy[1]?.subquestions?.[0]?.subquestion,
      answ: data.formdata.answer[1].question,
    },
    {
      question: questCopy[1]?.subquestions?.[1]?.subquestion,
      answ:
        data.formdata.answer[1].subquestions?.[1].checkBox
          ?.filter((checked) => checked !== "")
          .map((checked) => `${checked}`)
          .join(", ") || "",
    },
    {
      question: questCopy[1]?.subquestions?.[1]?.textfield,
      answ: data.formdata.answer[1].subquestions?.[1].textfield || "",
    },
    {
      question: questCopy[1]?.subquestions?.[2]?.subquestion,
      answ:
        data.formdata.answer[1].subquestions?.[2].checkBox
          ?.filter((checked) => checked !== "")
          .map((checked) => `${checked}`)
          .join(", ") || "",
    },
    {
      question: questCopy[1]?.subquestions?.[2]?.textfields?.[0].textfield,
      answ:
        data.formdata.answer[1].subquestions?.[2].textfields?.[0].textfield ||
        "",
    },
    {
      question: questCopy[1]?.subquestions?.[2]?.textfields?.[1].textfield,
      answ:
        data.formdata.answer[1].subquestions?.[2]?.textfields?.[1]?.textfield ||
        "",
    },
    {
      question: questCopy[1]?.subquestions?.[2]?.textfields?.[2].textfield,
      answ: data.formdata.answer[1].subquestions?.[2].textfields?.[2].textfield,
    },
    {
      question: questCopy[1]?.subquestions?.[2]?.textfields?.[3].textfield,
      answ: data.formdata.answer[1].subquestions?.[2].textfields?.[3].textfield,
    },
    {
      question: questCopy[1]?.subquestions?.[2]?.textfields?.[4].textfield,
      answ:
        data.formdata.answer[1].subquestions?.[2]?.textfields?.[4]?.textfield ||
        "",
    },
  ];

  return answeAndQuestions;
};

export { formatData, addAnsweToQuestionfunc };
