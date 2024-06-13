import { db } from "./Firebase"
import { collection, addDoc } from "firebase/firestore"

export const addCompanyToFirestore = async (companyData: any) => {
  try {
    const docRef = await addDoc(collection(db, "companies"), companyData)
    return docRef
  } catch (e) {
    console.error("Error adding document: ", e)
    throw e
  }
}
