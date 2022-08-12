<template>
  <div class="container">
    <div v-if="posts.length > 0">
      <PostsList :posts="posts" />
    </div>
    <div v-else>
      <p><Spinner /></p>
    </div>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import { onMounted } from "@vue/runtime-core";
import getPosts from "@/composables/getPosts";
import Spinner from "@/components/Spinner.vue";
export default {
  setup() {
    const { posts, error, fetchPosts } = getPosts();

    onMounted(() => {
      fetchPosts();
    });

    return { posts };
  },
  components: { PostsList, Spinner },
};
</script>

<style>
</style>