<template>
  <div>Меня зовут {{ name }} мне {{ age }} лет</div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     name: "Сергей",
  //   };
  // },
  setup() {
    const name = ref("Сергей");
    const age = ref("28");
    const chan = () => {
      age.value++;
    };
    return { name, age, chan };
  },
};
</script>

<style>
</style>