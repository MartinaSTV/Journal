import { useRecoilState } from "recoil";
import homeIcon from "../assets/Icons/clarity_home-line (1).svg";
import logoutIcon from "../assets/Icons/mdi-light_logout.svg";
import { useNavigate } from "react-router-dom";
import Token from "../atoms/Token";
import { logOut } from "../Service/LoginService";
import UserAtom from "../atoms/user";

const MenuBottomBar = () => {
  const [, setToken] = useRecoilState(Token);
  const navigate = useNavigate();
  const [, setUserId] = useRecoilState(UserAtom);

  const setAndNavigate = () => {
    setToken(null);
    setUserId("");
  };

  return (
    <nav className=" h-[70px] flex bg-black justify-around text-white">
      <a
        className="h-[60px] flex flex-col items-center mt-3"
        onClick={() => {
          navigate("/Journal");
        }}
        href=""
      >
        <img src={homeIcon} alt="Hus" className="w-[20px] " />
        <p>Hem</p>
      </a>
      <a
        onClick={() => {
          navigate("/Meny");
        }}
        className="h-[50px] w-[80px] rounded-md border flex items-center justify-center mt-3"
        href=""
      >
        <p className="">Meny</p>
      </a>
      <a
        onClick={() => {
          logOut(setAndNavigate);
          navigate("/loggedOut");
        }}
        className="h-[60px] mt-3 flex flex-col items-center"
        href=""
      >
        <img src={logoutIcon} alt="öppnad dörr" className="w-[20px]" />
        <p>Logga ut</p>
      </a>
    </nav>
  );
};
export default MenuBottomBar;
