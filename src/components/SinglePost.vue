<template>
  <div class="post">
    <h3>{{ post.title }}</h3>
    <p>{{ bodyLimit }}</p>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: ["post"],
  setup(props) {
    const bodyLimit = computed(() => {
      return props.post.body.substring(0, 100) + "...";
    });
    return { bodyLimit };
  },
};
</script>

<style>
</style>