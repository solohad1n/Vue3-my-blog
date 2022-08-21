<template>
  <div class="container">
    <div v-if="error">{{ error }}</div>
    <div v-if="filteredTags.length" class="grid">
      <div><PostsList :posts="filteredTags" /></div>
      <div><TagsCloud :posts="posts" /></div>
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
import TagsCloud from "@/components/TagsCloud.vue";
export default {
  props: ["tag"],
  components: { Spinner, PostsList, TagsCloud },
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
      posts,
    };
  },
};
</script>

<style>
</style>