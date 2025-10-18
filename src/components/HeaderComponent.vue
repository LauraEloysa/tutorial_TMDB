<template>

  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/movies">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
  </header>
  
</template>

<style scoped>
header {
  height: 3rem;
  display: flex;
  background-color: #82467f;
  color: #fff;
  font-size: 1.2rem;
  padding-left: 3rem;
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #fff;
}

nav a.router-link-active {
    font-weight: 700;
    background-color: #b172ad;
    color: #6a3068;
    padding: 0 10px;
    border-radius: 10px;
    transition: 0.5s;
}
</style>