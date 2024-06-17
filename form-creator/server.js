import express from "express";
import cron from "node-cron";
import admin from "firebase-admin";
import serviceAccount from "./journal-service-key.json" assert { type: "json" };

// Initialisera Firebase Admin SDK med service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const PORT = 5173;

app.use(express.json());

const createForms = async () => {
  try {
    const usersCollection = db.collection("users");
    const allUsersSnapshot = await usersCollection.get();

    allUsersSnapshot.forEach((userDoc) => {
      createsAndSavesFormsToUserIfNotExist(userDoc.data().userId, userDoc.id);
    });
  } catch (error) {
    console.error("Error creating form:", error);
  }
};
const removeForms = async () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(today.getDate() - 1);

  try {
    const idFormsToDelete = [];
    const journalCollection = db.collection("JournalForm");
    const allJournalsSnapshot = await journalCollection.get();

    if (!allJournalsSnapshot.empty) {
      allJournalsSnapshot.forEach((journalDoc) => {
        const journalData = journalDoc.data();
        const journalDate = journalData.dateTimestamp?.toDate();
        journalDate.setHours(0, 0, 0, 0);

        if (
          journalData.answer[0]?.question === "" &&
          journalDate.getTime() <= yesterday.getTime()
        ) {
          idFormsToDelete.push(journalDoc.id);
          journalCollection
            .doc(journalDoc.id)
            .delete()
            .then(() => {
              console.log(`Deleted journal form with ID: ${journalDoc.id}`);
            })
            .catch((error) => {
              console.error(
                `Error deleting journal form with ID: ${journalDoc.id}`,
                error
              );
            });
        } else {
          console.log("Finns ett värde");
        }
      });

      if (idFormsToDelete.length > 0) {
        const usersCollection = db.collection("users");
        const allUsersSnapshot = await usersCollection.get();

        if (!allUsersSnapshot.empty) {
          allUsersSnapshot?.forEach((userDoc) => {
            const userData = userDoc.data();
            const updatedFormsArray = (userData.forms || []).filter(
              (formId) => !idFormsToDelete.includes(formId)
            );
            usersCollection
              .doc(userDoc.id)
              .update({
                forms: updatedFormsArray,
              })
              .then(() => {
                console.log(`Updated user with ID: ${userDoc.id}`);
              })
              .catch((error) => {
                console.error(
                  `Error updating user with ID: ${userDoc.id}`,
                  error
                );
              });
          });
        }
      }
    }
  } catch (error) {
    console.log(error, "error creating removing forms");
  }
};

app.post("/create-form", async (req, res) => {
  try {
    await createForms();
    res.status(200).send("Form created successfully");
  } catch (error) {
    res.status(500).send("Error creating form");
  }
});

// Schemalägg en uppgift som körs varje dag vid midnatt
cron.schedule("* * * * *", () => {
  createForms();
  removeForms();
});

const createsAndSavesFormsToUserIfNotExist = async (userId, IDUSER) => {
  const today = new Date();
  const formattedFormDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const forms = [
    { title: "Morgon", show: "07.30" },
    { title: "Förmiddag", show: "11.30" },
    { title: "Eftermiddag", show: "15.00" },
    { title: "Kväll", show: "20.00" },
  ];

  const answer = [
    { question: "" },
    {
      question: "",
      subquestions: [
        { subquestion: "" },
        {
          subquestion: "",
          checkBox: ["", "", "", ""],
          textfield: "",
        },
        {
          subquestion: "",
          checkBox: ["", "", "", "", ""],
          textfields: [
            { textfield: "" },
            { textfield: "" },
            { textfield: "" },
            { textfield: "" },
            { textfield: "" },
          ],
        },
      ],
    },
  ];

  try {
    const formPromises = forms.map((form) => {
      const formData = {
        userId: userId,
        date: formattedFormDate,
        dateTimestamp: admin.firestore.Timestamp.fromDate(new Date()),
        answer: answer,
        title: form.title,
        show: form.show,
        finalised: false,
      };
      return saveForms(formData);
    });

    const formIds = await Promise.all(formPromises);
    console.log(formIds);
    if (formIds) {
      await saveIdFormToUser(IDUSER, formIds);
    }
  } catch (error) {
    console.error("Could not create and save forms to user:", error);
  }
};

const saveForms = async (formData) => {
  try {
    const formCreated = await db.collection("JournalForm").add(formData);
    return formCreated.id;
  } catch (error) {
    console.error("Error saving form:", error);
  }
};

const saveIdFormToUser = async (userId, formIds) => {
  console.log(userId);
  try {
    const userDocRef = db.collection("users").doc(userId);
    for (const formId of formIds) {
      await userDocRef.update({
        forms: admin.firestore.FieldValue.arrayUnion(formId),
      });
    }
    console.log("Form IDs saved to user:", userId);
  } catch (error) {
    console.error("Error updating user document:", error);
  }
};

// Hantera root path (/) för att undvika Cannot GET /
app.get(`/http://localhost:${PORT}`, (req, res) => {
  res.send("Hello, this is your Express server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
