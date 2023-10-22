import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { databaseUser } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthFirebase() {
  const [loading, setLoading] = useState<boolean>(false);
  let currentUser = databaseUser.currentUser;
  const navigate = useNavigate();
  const allowedUsers = "ludovicocolucci@gmail.com";
  let isAllowed = currentUser?.email === allowedUsers;

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(databaseUser, email, password);
      alert(`Welcome Back`);
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      const data = await createUserWithEmailAndPassword(
        databaseUser,
        email,
        password
      );
      const user = data.user;
      await updateProfile(user, { displayName: username });
      alert(`Welcome to ${username}`);
      // If the updateProfile succeeds, you can perform any additional actions here
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setLoading(true);
    try {
      await signOut(databaseUser);
      window.location.href = "/";
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkIsAllowed = async () => {
    if (!isAllowed) navigate("/notallowed");
  };

  return {
    login,
    signout,
    signup,
    loading,
    currentUser,
    isAllowed,
    checkIsAllowed,
  };
}
