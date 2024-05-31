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

interface IUserData {
  userName: string;
}

const UserDataAtom = atom<IUserData>({
  key: "allUserDataStorage",
  default: { userName: "" },
  effects: [localStorageEffect("userEffectDataUser")],
});
export default UserDataAtom;
