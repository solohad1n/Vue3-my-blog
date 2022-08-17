<template>
  <div class="container">
    <div v-if="error">{{ error }}</div>
    <div v-if="true">
      <PostsList :posts="filteredTags" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import getPosts from "@/composables/getPosts";
import { computed, onMounted } from "@vue/runtime-core";
import PostsList from "@/components/PostsList.vue";
export default {
  props: ["tag"],
  components: { Spinner, PostsList },
  setup(props) {
    const { posts, error, fetchPosts } = getPosts();

    const filteredTags = computed(() => {
      return posts.value.filter((post) => post.tags.includes(props.tag));
    });

    onMounted(() => {
      fetchPosts();
    });

    return {
      filteredTags,
      error,
    };
  },
};
</script>

<style>
</style>