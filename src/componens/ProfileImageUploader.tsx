import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import UserDataAtom from "../atoms/userData";
import { useRecoilState } from "recoil";
import { saveBlob, saveUserPicure } from "../Service/userAccountService";
import UserAtom from "../atoms/user";

const ProfileImageUploader = () => {
  const [profilePicture, setProfilePicture] = useState<File | string>("");
  const editorRef = useRef<AvatarEditor | null>(null);
  const [userData, setUserData] = useRecoilState(UserDataAtom);
  const [userId] = useRecoilState(UserAtom);
  const [showMessage, setShowMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const urlImg: string = file ? URL.createObjectURL(file) : "";
    if (file) {
      setProfilePicture(urlImg);
    }
  };

  const onClickSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      // Skapa en Blob från canvas och skapa en URL för nedladdning
      canvas.toBlob(async (blob) => {
        if (blob) {
          const URL = await saveBlob(blob);
          const updatedUserData = {
            ...userData,
            ImgUrl: URL,
          };
          setUserData(updatedUserData);
          saveUserPicure(updatedUserData, userId, setShowMessage);
        }
      }, "image/png");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex mt-10 flex-col mb-4 ">
        <label htmlFor="file">Lägg till profil bild</label>
        <AvatarEditor
          ref={editorRef}
          image={profilePicture}
          width={250}
          height={250}
          border={0}
          color={[255, 255, 255, 0.6]}
          scale={1.2}
          rotate={0}
          borderRadius={150}
        />
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-white w-[250px] h-[100px] mt-4"
        />
        <div className="flex items-center">
          <button
            onClick={() => {
              onClickSave();
            }}
            className="bg-white text-black p-2 rounded max-w-[173px] max-h-[50px] hover:opacity-[100%] mt-10"
          >
            Ändra bild
          </button>
          {showMessage !== "" && <p className=" ml-10 ">{showMessage}</p>}
        </div>
      </div>
    </div>
  );
};
export default ProfileImageUploader;
