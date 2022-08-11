<template>
  <div class="container details">
    <div class="post" v-if="post">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import getPost from "@/composables/getPost";
import { onMounted } from "@vue/runtime-core";
export default {
  props: ["id"],
  setup(props) {
    const { post, error, fetchPost } = getPost(props.id);

    onMounted(() => {
      fetchPost();
    });
    return { post, error };
  },
};
</script>

<style>
.details p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
}
</style>