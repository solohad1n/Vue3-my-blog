<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
      <label>Заголовок</label>
      <input v-model="title" type="text" required />
      <label>Контент:</label>
      <textarea v-model="body"></textarea>
      <label>Теги (Нажмите на Enter чтобы добавить тег)</label>
      <input @keydown.enter.prevent="handleAddTag" v-model="tag" type="text" />
      <div v-for="tag in tags" :key="tag" class="pill">
        <span @click="handleDeleteTag(tag)">#{{ tag }}</span>
      </div>
      <div v-if="error">{{ error }}</div>
      <button>создать</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { firestore } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
export default {
  setup() {
    const title = ref("");
    const body = ref("");
    const tag = ref("");
    const tags = ref([]);
    const router = useRouter();
    const error = ref(null);

    const handleAddTag = () => {
      if (!tags.value.includes(tag.value) && !tag.value.includes(" ")) {
        tags.value.push(tag.value);
        tag.value = "";
      }
      tag.value = "";
    };

    const handleSubmit = async () => {
      const newPost = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(collection(firestore, "posts"), newPost);
        router.push("/");
      } catch (err) {
        error.value = err.message;
      }
    };

    const handleDeleteTag = (item) => {
      tags.value = tags.value.filter((tag) => tag !== item);
    };

    return {
      title,
      body,
      tag,
      tags,
      handleSubmit,
      handleAddTag,
      handleDeleteTag,
      error,
    };
  },
};
</script>

<style>
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}
textarea {
  height: 160px;
}
label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
  padding: 2px 0;
}
label::before {
  content: "";
  width: 100%;
  height: 100%;
  background: #6c3aea;
  position: absolute;
  top: 0;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1deg);
}
button {
  display: block;
  margin-top: 30px;
  background: #6c3aea;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
  cursor: pointer;
}
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
.pill a {
  text-decoration: none;
  color: #444;
}
@media screen and (max-width: 576px) {
  form {
    max-width: 300px;
  }
  label::before {
    left: -20px;
  }
}
</style>