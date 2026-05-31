import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";
import { auth } from "./auth";

export const register = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  const token = await user.getIdToken();
  return { user, token };
};

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  const token = await user.getIdToken();
  return token;
};

export const logout = async () => {
  await signOut(auth);
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("fullName");
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
