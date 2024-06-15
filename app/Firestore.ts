import { db } from "./Firebase"
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore"

export const addCompanyToFirestore = async (companyData: any) => {
  try {
    const companyRef = doc(collection(db, "companies"))
    await setDoc(companyRef, { ...companyData })
    return companyRef.id // Return the document ID
  } catch (e) {
    console.error("Error adding document: ", e)
    throw e
  }
}

export const fetchUserData = async (uid: any) => {
  const userRef = doc(db, "users", uid)
  const userDoc = await getDoc(userRef)
  if (userDoc.exists()) {
    return userDoc.data()
  } else {
    throw new Error("User document does not exist.")
  }
}

export const fetchCompanyData = async (companyID: any) => {
  const companyRef = doc(db, "companies", companyID)
  const companyDoc = await getDoc(companyRef)
  if (companyDoc.exists()) {
    return { id: companyDoc.id, ...companyDoc.data() }
  } else {
    throw new Error("Company document does not exist.")
  }
}
