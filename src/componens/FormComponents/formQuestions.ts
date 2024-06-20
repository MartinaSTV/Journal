const Questions = [
  { question: "Hur är din ångest/oro nu?" },
  {
    qustion: "Vilka känslor känner jag nu?",
    subquestions: [
      { subquestion: "Hur stark är din känsla?" },
      {
        subquestion: "Varför tror du att du känner så?",
        checkBox: [
          "Det har hänt något tidigare idag",
          "Det kommer att hända en grej",
          "Vet ej",
          "Annat",
        ],
        textfield: "Beskriv med ord varför du känner som du gör?",
      },
      {
        subquestion: "Vart känner jag känslorna i kroppen?",
        checkBox: [
          "I hela kroppen",
          "I magen",
          "I huvudet",
          "I bröstet",
          "Någon annanstans",
        ],
        textfields: [
          { textfield: "Vart i kroppen?" },
          { textfield: "Vad vill känslorna att du skall göra?" },
          { textfield: "Vad önskar du att du gjorde?" },
          { textfield: "Vad gjorde/gör du? Eller tänker du göra?" },
          { textfield: "Något annat du vill skriva ner?" },
        ],
      },
    ],
  },
];

import smiley1 from "../../assets/Smileys/greenSmiley.svg";
import smiley2 from "../../assets/Smileys/MildÅngest2.svg";
import smiley3 from "../../assets/Smileys/Lättångest3.svg";
import smiley4 from "../../assets/Smileys/MåttligÅngest4.svg";
import smiley5 from "../../assets/Smileys/MedelstarkÅngest5.svg";
import smiley6 from "../../assets/Smileys/StarkÅngest6.svg";
import smiley7 from "../../assets/Smileys/MycketStarkÅngest7.svg";
import smiley8 from "../../assets/Smileys/JättemycketÅngest8.svg";
import smiley9 from "../../assets/Smileys/JättemycketÅngest9.svg";
import smiley10 from "../../assets/Smileys/ExtremtMycketÅngest10.svg";

const feelingsList = [
  { img: smiley1, value: 1, textValue: "Neutral" },
  { img: smiley2, value: 2, textValue: "Mild känsla" },
  { img: smiley3, value: 3, textValue: "Lätt känsla " },
  { img: smiley4, value: 4, textValue: "Måttlig känsla" },
  { img: smiley5, value: 5, textValue: "Medelstark Känsla" },
  { img: smiley6, value: 6, textValue: "Stark känsla" },
  { img: smiley7, value: 7, textValue: "Mycket stark känsla" },
  { img: smiley8, value: 8, textValue: "Jätte mycket känsla" },
  { img: smiley9, value: 9, textValue: "Jätte jätte stark känsla" },
  { img: smiley10, value: 10, textValue: "Extremt mycket känsla" },
];
const smileys = [
  { img: smiley1, value: 1, textValue: "Ingen ångest" },
  { img: smiley2, value: 2, textValue: "Mild ångest" },
  { img: smiley3, value: 3, textValue: "Lätt ångest" },
  { img: smiley4, value: 4, textValue: "Måttlig ångest" },
  { img: smiley5, value: 5, textValue: "Medelstark ångest" },
  { img: smiley6, value: 6, textValue: "Stark ångest" },
  { img: smiley7, value: 7, textValue: "Mycket stark ångest" },
  { img: smiley8, value: 8, textValue: "Jätte mycket ångest" },
  { img: smiley9, value: 9, textValue: "Jätte jätte mycket" },
  { img: smiley10, value: 10, textValue: "Extremt mycket ångest" },
];
export { Questions, feelingsList, smileys };
