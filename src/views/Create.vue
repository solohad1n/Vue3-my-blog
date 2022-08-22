<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
      <label>Заголовок</label>
      <input v-model="title" type="text" required />

      <label>Контент:</label>
      <textarea v-model="body"></textarea>

      <label>Загрузите картинку:</label>
      <input @change="sendImage" type="file" />

      <label>Теги (Нажмите на Enter чтобы добавить тег)</label>
      <div class="add-tag">
        <input
          @keydown.enter.prevent="handleAddTag"
          v-model="tag"
          type="text"
        />
        <span @click="handleAddTag">Добавить тег</span>
      </div>
      <div v-for="tag in tags" :key="tag" class="pill">
        <span @click="handleDeleteTag(tag)">#{{ tag }}</span>
      </div>
      <div class="error" v-if="error">{{ error }}</div>
      <button>создать</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { firestore } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useStorage } from "@/composables/useStorage";
export default {
  setup() {
    const title = ref("");
    const body = ref("");
    const tag = ref("");
    const tags = ref([]);
    const router = useRouter();
    const error = ref(null);
    const image = ref(null);
    const { uploadImageToFirebase } = useStorage();

    const sendImage = (event) => {
      image.value = event.target.files[0];
    };

    const handleAddTag = () => {
      if (
        !tags.value.includes(tag.value) &&
        !tag.value.includes(" ") &&
        tag.value
      ) {
        tags.value.push(tag.value);
        tag.value = "";
        error.value = "";
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
        if (!tags.value.length) {
          error.value = "Заполни поле тегиов!";
          throw Error("Заполни поле тегиов!");
        }

        if (image.value !== null) {
          const getImageUrl = await uploadImageToFirebase(image.value);
          await addDoc(collection(firestore, "posts"), {
            ...newPost,
            imageUrl: getImageUrl,
          });
        } else {
          await addDoc(collection(firestore, "posts"), newPost);
        }

        await router.push("/");
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
      sendImage,
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
.error {
  color: red;
}
.add-tag {
  position: relative;
}
.add-tag span {
  position: absolute;
  right: 0;
  top: 0;
  color: #6c3aea;
  padding: 0.6rem;
  box-sizing: border-box;
  cursor: pointer;
}
.add-tag input {
  padding-right: 30%;
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