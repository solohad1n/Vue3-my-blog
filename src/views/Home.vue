<template>
  <div class="container">
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="grid">
      <div><PostsList :posts="posts" /></div>
      <div><TagsCloud :posts="posts" /></div>
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
import TagsCloud from "@/components/TagsCloud.vue";
export default {
  setup() {
    const { posts, error, fetchPosts } = getPosts();

    onMounted(() => {
      fetchPosts();
    });

    return { posts, error };
  },
  components: { PostsList, Spinner, TagsCloud },
};
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}
</style>