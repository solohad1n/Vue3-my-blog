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
export default {
  setup() {
    const posts = ref([]);

    return { posts };
  },
  components: { PostsList },
};
</script>

<style>
</style>