import { useState } from "react";
import bgBig from "../assets/bgBig.png";
import MenuBig from "../componens/MenyBig";
import MenuBottomBar from "../componens/MenyBottomBar";
import { useRecoilState } from "recoil";
import UserDataAtom from "../atoms/userData";
import { saveUserData } from "../Service/userAccountService";
import UserAtom from "../atoms/user";
import { onChangeAuth } from "../Service/LoginService";
import ProfileImageUploader from "../componens/ProfileImageUploader";
import defaultImg from "../assets/cartoon-character-with-handbag-sunglasses(1).jpg";

const UserAccount = () => {
  const [updatedUserName, setUpdatedUserName] = useState("");
  const [userData, setUserData] = useRecoilState(UserDataAtom);
  const [userId, setUserId] = useRecoilState(UserAtom);
  onChangeAuth(setUserId);

  return (
    <section
      className="flex flex-col max-w-[1500px] ml-auto mr-auto relative  "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${bgBig})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <MenuBig />
      <div className="flex">
        <h1 className="text-white text-4xl font-normal mt-10 ml-5 max-w-[339px] md:text-5xl md:max-w-full ">
          Ditt Konto
        </h1>
        <img
          src={userData.imgUrl || defaultImg}
          alt="profil bild"
          className="w-[90px] ml-auto mr-10 mt-5 rounded-full shadow-md "
        />
      </div>

      <article className="text-white ml-5 min-h-[100vh] flex flex-col max-w-[768px] ">
        <div className="flex mt-10 ">
          <div className="flex flex-col">
            <label htmlFor="name">Lägg till namn</label>
            <input
              className="text-black pl-2 font-light shadow h-[40px] text-black max-w-[339px] rounded "
              type="text"
              placeholder="Lägg till Namn"
              id="name"
              onChange={(e) => {
                setUpdatedUserName(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-black opacity-[85%] text-white p-2 rounded mt-auto  max-w-[173px] max-h-[50px] ml-5 mr-auto hover:opacity-[100%]"
            onClick={() => {
              saveUserData(updatedUserName, userId);
              setUserData({
                ...userData,
                userName: updatedUserName,
              });
            }}
          >
            Spara namn
          </button>
        </div>
        <ProfileImageUploader />
      </article>

      <section className="w-full sticky bottom-0 block md:hidden">
        <MenuBottomBar />
      </section>
    </section>
  );
};
export default UserAccount;
