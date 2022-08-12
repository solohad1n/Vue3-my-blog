<template>
  <div class="create">
    <form>
      <label>Заголовок</label>
      <input type="text" required />
      <label>Контент:</label>
      <textarea></textarea>
      <label>Теги (Нажмите на Enter чтобы добавить тег)</label>
      <input type="text" />
      <div class="pill">CSS</div>
      <button>создать</button>
    </form>
  </div>
</template>

<script>
export default {};
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
  background: #ff8800;
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
  background: #ff8800;
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
</style>