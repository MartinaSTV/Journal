import { useRecoilState } from "recoil";
import homeIcon from "../../public/Icons/clarity_home-line (1).svg";
import logoutIcon from "../../public/Icons/mdi-light_logout.svg";
import { useNavigate } from "react-router-dom";
import Token from "../atoms/Token";
import { logOut } from "../Service/LoginService";
import UserAtom from "../atoms/user";

//lägg till logga ut funktion

const MenuBottomBar = () => {
  const [, setToken] = useRecoilState(Token);
  const navigate = useNavigate();
  const [, setUserId] = useRecoilState(UserAtom);

  const setAndNavigate = () => {
    setToken(null);
    setUserId("");
  };

  return (
    <nav className=" h-[90px] flex bg-black justify-around text-white">
      <a
        className="h-[70px] flex flex-col items-center mt-3"
        onClick={() => {
          navigate("/Journal");
        }}
        href=""
      >
        <img src={homeIcon} alt="Hus" />
        <p>Hem</p>
      </a>
      <a
        onClick={() => {
          navigate("/Meny");
        }}
        className="max-h-[60px] rounded-md border mt-3"
        href=""
      >
        <p className=" p-2 m-2 ">Meny</p>
      </a>
      <a
        onClick={() => {
          logOut(setAndNavigate);
          navigate("/loggedOut");
        }}
        className="h-[70px] mt-3 flex flex-col items-center"
        href=""
      >
        <img src={logoutIcon} alt="öppnad dörr" />
        <p>Logga ut</p>
      </a>
    </nav>
  );
};
export default MenuBottomBar;
