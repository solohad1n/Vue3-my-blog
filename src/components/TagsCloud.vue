<template>
  <div class="tags-cloud">
    <h3>Теги:</h3>
    <div v-for="tag in tags" :key="tag" class="pill">
      <router-link :to="{ name: 'Tags', params: { tag } }">
        #{{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import useTags from "@/composables/useTags";
export default {
  props: ["posts"],
  setup(props) {
    const { tags } = useTags(props.posts);

    return { tags };
  },
};
</script>

<style>
</style>