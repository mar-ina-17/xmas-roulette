import { db } from "../../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

export const useDeleteDocuments = () => {
    const delDoc = async (collectionPath: string, documentId: string) => {
        try {
            const documentRef = doc(db, collectionPath, documentId);
            await deleteDoc(documentRef);
            console.log(`Document with ID ${documentId} deleted successfully`);
        } catch (error) {
            console.error(`Error deleting document ${documentId}:`, error);
        }
    };

    return { delDoc };
};
