const formatData = (chosenFormsYear: IresponseForm[]) => {
  const chosenF = [...chosenFormsYear];
  const Months: IformattedCompilation[] = [];

  for (let i = 0; i < chosenF.length; i++) {
    // skap ett object för varje månad som finns och skapa namn på månad

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
        formData: [], // här skall alla formulär för den månaden finnas med
        averageValue: 0,
        anxValues: [],
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
    const anxietyValues: number[] = [4, 4];
    const forms = Months[i].formData;
    for (let j = 0; j < forms.length; j++) {
      const value = getValueNumber(forms[j].formdata.answer[0].question);
      anxietyValues.push(value);
    }
    Months[i].anxValues = anxietyValues;

    const average = getAverage(anxietyValues);
    Months[i].averageValue = average;
  }
  console.log(Months);
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

export { formatData };
