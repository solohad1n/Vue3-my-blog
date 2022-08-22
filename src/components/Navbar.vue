<template>
  <div class="container">
    <header>
      <h1>Личный Блок...</h1>
      <nav>
        <router-link :to="{ name: 'Home' }">Главная</router-link>
        <router-link :to="{ name: 'Create' }">Создать Пост</router-link>
      </nav>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border-bottom: 2px solid #8760e7;
}
header h1 {
  color: #8760e7;
  font-size: 48px;
}
header a {
  color: #bbb;
  text-decoration: none;
  margin-left: 20px;
}
header a.router-link-active {
  color: #8760e7;
  font-weight: bold;
}

@media screen and (max-width: 576px) {
  header {
    flex-direction: column;
  }
  nav {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
}
</style>