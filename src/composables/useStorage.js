import { storage } from '../firebase/config'
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'

export const useStorage = () => {
  const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `posts-pictures/${file.name}`)
    const upload = await uploadBytesResumable(storageRef, file)
    const uploadedImageUrl = await getDownloadURL(storageRef)

    return uploadedImageUrl
  }

  return {
    uploadImageToFirebase
  }
}