import { useRecoilState } from "recoil";
import bgBig from "../assets/bgBig.png";
import { onChangeAuth } from "../Service/LoginService";
import MenuBottomBar from "../componens/MenyBottomBar";
import { useEffect, useState } from "react";
import MenuBig from "../componens/MenyBig";
import { getTodaysForms } from "../Service/journalService";
import FormExistButton from "../componens/FormExistButton";
import UserAtom from "../atoms/user";
import Loading from "../componens/Loading";
import UserDataAtom from "../atoms/userData";
import { getUserData } from "../Service/journalService";
import defaultImg from "../assets/cartoon-character-with-handbag-sunglasses(1).jpg";

const JournalLandingPage = () => {
  const [allForms, setAllForms] = useState<IresponseForm[]>([]);
  const [userId, setUserId] = useRecoilState(UserAtom);
  const [update] = useState(new Date());
  const [loading, setloading] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [userData, setUserData] = useRecoilState(UserDataAtom);

  onChangeAuth(setUserId);

  useEffect(() => {
    if (userId) {
      getTodaysFormsData();
      userDataFetch();
    }
    sessionStorage.setItem("formDataState", JSON.stringify(""));
  }, [userId, update]);

  const userDataFetch = async () => {
    try {
      const data = await getUserData(userId);
      if (data) setUserData(data);
    } catch (error) {}
  };

  const getTodaysFormsData = async () => {
    setloading(true);
    const forms = await getTodaysForms(userId);

    setloading(false);
    if (forms !== undefined) {
      forms.sort((a, b) => {
        const parseTime = (timeStr: any) => {
          const [hours, minutes] = timeStr.split(".").map(Number);
          return hours * 60 + minutes;
        };
        const timeA = parseTime(a.formdata.show);
        const timeB = parseTime(b.formdata.show);
        return timeA - timeB;
      });

      setAllForms([...forms]);
    }
  };
  useEffect(() => {
    const img = new Image();
    img.src = bgBig;
    img.onload = () => {
      setBgImageLoaded(true);
    };
  }, []);

  return (
    <section
      className="flex flex-col max-w-[1500px] relative "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundImage: bgImageLoaded ? `url(${bgBig})` : "none",
      }}
    >
      <MenuBig />
      <div className="flex">
        <h1 className="text-white text-4xl font-normal mt-10 ml-5 max-w-[339px] md:text-5xl md:max-w-full ">
          Hem
        </h1>
        <img
          src={userData.imgUrl || defaultImg}
          alt="profil bild"
          className="w-[90px] ml-auto mr-10 mt-5 rounded-full shadow-md"
        />
      </div>
      <div className="m-5 text-[#F5F5F5] max-w-[339px] md:mr-auto md:ml-auto">
        <p className="font-semibold ">Hej {userData.userName}</p>
        <p className="">
          Fyll i din dagbok genom att klicka nedanför. Fyll i ett formulär i
          taget. Du kan se på klockslaget när formuläret öppnas och kan fyllas
          i.
        </p>
      </div>
      {loading && <Loading text={"Hämtar dagens formulär..."} />}
      <section className="flex flex-col mb-30 md:items-center">
        {allForms.length > 0 ? (
          allForms.map((form, idx) => (
            <FormExistButton key={idx + "forms"} formData={form} />
          ))
        ) : (
          <div>
            <h2 className="text-white text-2xl mt-10 ">
              Finns inga dagboksinlägg att fylla i
            </h2>
          </div>
        )}
      </section>

      <section className="w-full absolute bottom-0 block md:hidden">
        <MenuBottomBar />
      </section>
    </section>
  );
};
export default JournalLandingPage;
