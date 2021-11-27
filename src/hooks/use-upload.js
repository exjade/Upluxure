import { useContext } from 'react'
 /* Firebase, Firestore & Storage */
import { firebase } from '../lib/firebase'
import { getStorage } from 'firebase/storage'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import UserContext from '../context/user'
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

export default async function UploadNewDoc() {

    const { user } = useContext(UserContext)

    let downloadUrl;
    try {
        const docRef = await addDoc(collection(firestore, "photos"), {
            comments: [],
            dateCreated: new Date(),
            imageSrc: downloadUrl,
            likes: [],
            userId: user.uid,
            username: user.displayName,
        });
        // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.log("Processing File... :)")
    }

        // Upload a file to firebase storage and get the download url
        const fileHandler = async (event) => {
            const localFile = event.target.files[0];
            const storageRef = ref(storage, `/images/avatars/${user.displayName}/${uuidv4() + localFile.name} `)
            await uploadBytes(storageRef, localFile)
            downloadUrl = await getDownloadURL(storageRef)
            console.log('successfully uploaded! Dev: Exjade')
            newDoc()
        }
}

