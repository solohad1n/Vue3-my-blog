import { ref } from "vue";
import { firestore } from '../firebase/config'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const fetchPosts = async () => {
    try {
      const documents = []

      const queryData = query(collection(firestore, "posts"), orderBy('createdAt', 'desc'))

      const response = await getDocs(queryData)

      response.docs.forEach((a) => {
        documents.push({ ...a.data(), ...{ id: a.id } })
      })

      posts.value = documents

    } catch (err) {
      error.value = err.message;
    }
  };

  return { posts, error, fetchPosts }
}

export default getPosts