import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const generateStudentID = async () => {
  const studentsRef = collection(db, "users");
  const q = query(studentsRef, where("role", "==", "student"));
  const snapshot = await getDocs(q);

  const nextID = snapshot.size + 1;
  return `S${String(nextID).padStart(3, "0")}`;
};
