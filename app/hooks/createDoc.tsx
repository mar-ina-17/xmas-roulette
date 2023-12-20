import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

export const useAddDocuments = () => {
    const addDocument = async (collectionPath: string, giver: string, receiver: string) => {
        try {
            const documentRef = await addDoc(collection(db, "gifts"), {
                giver: giver,
                receiver: receiver,
            });
            console.log("Document written with ID: ");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    return { addDocument }
};

export default useAddDocuments;
