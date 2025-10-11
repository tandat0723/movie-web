import { useToast } from '@chakra-ui/react'
import { db } from '../services/firebase'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'


export const useFirestore = () => {
    const toast = useToast()
    const addDocument = async (collectionName, data) => {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    }

    const addToWatchlist = async (userId, dataId, data) => {
        try {
            if (await checkIfInWatchlist(userId, dataId)) {
                toast({
                    title: 'Error!',
                    description: 'This item is already in your watchlist.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
                return false
            }
            await setDoc(doc(db, 'users', userId, 'watchlist', dataId), data)
            toast({
                title: 'Success',
                description: "Add to watchlist",
                status: 'success',
                isClosable: true,
            })
        } catch (err) {
            console.log(err, 'err')
            toast({
                title: 'Error!',
                description: "An error occurred",
                status: 'error',
                isClosable: true,
            })
        }
    }

    return {
        addDocument,
        addToWatchlist
    }
}

const checkIfInWatchlist = async (userId, dataId) => {
    const docRef = doc(db, 'users', userId?.toString(), 'watchlist', dataId?.toString())
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return true
    } else {
        return false
    }
}