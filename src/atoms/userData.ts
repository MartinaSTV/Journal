import { atom } from "recoil";
import { AtomEffect } from "recoil";

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const UserDataAtom = atom<IUserData>({
  key: "informationUser",
  default: { userName: "", userId: "", forms: [], ImgUrl: "" },
  effects: [localStorageEffect("DataUserInformation")],
});
export default UserDataAtom;
