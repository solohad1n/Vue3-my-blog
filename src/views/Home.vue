<template>
  <div v-if="posts.length > 0">
    <PostsList :posts="posts" />
  </div>
  <div v-else>
    <p>Нет постов (((</p>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
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

    onMounted(() => {
      fetchPosts();
    });

    return { posts };
  },
  components: { PostsList },
};
</script>

<style>
</style>