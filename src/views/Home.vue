<template>
  <div class="container">
    <div v-if="posts.length > 0">
      <PostsList :posts="posts" />
    </div>
    <div v-else>
      <p>Нет постов (((</p>
    </div>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import { onMounted } from "@vue/runtime-core";
import getPosts from "@/composables/getPosts";
export default {
  setup() {
    const { posts, error, fetchPosts } = getPosts();

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