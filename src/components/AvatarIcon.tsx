import { auth } from "@/auth/firebase";
import { singInWithGoogle } from "@/auth/firebaseLogin";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AvatarIcon = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {}, [user]);

  return (
    <div
      className="h-8 w-8 rounded-full bg-gray-500 overflow-hidden cursor-pointer "
      onClick={!user ? singInWithGoogle : () => {}}
    >
      <img
        className="object-fill over"
        src={
          user
            ? `${user?.photoURL}`
            : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
        }
        alt="profilePlaceholder"
      />
    </div>
  );
};

export default AvatarIcon;
