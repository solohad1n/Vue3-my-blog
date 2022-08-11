import { ref } from "vue";

const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      posts.value = await response.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { posts, error, fetchPosts }
}

export default getPosts