<template>
  <ul class="menus">
      <li class="menu"></li>
      <li class="menu" v-for="(menu, index) in menuList" :key="index" @click="go(menu)">
          {{menu.text}}
      </li>
  </ul>
</template>

<script>
export default {
    // menuList: [
    //     {text: '组织机构', path: ''}
    // ]
    props: {
        menuList: Array
    },
    methods: {
        go(menu){
            console.log(menu)
           this.$router.push(menu.path);
        }
    },
}
</script>

<style scoped>
.menus {
    width: 10rem;
    height: 100%;;
}
.menu {
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    color: #555;
    font-size: .875rem
}
.menu:hover {
    cursor: pointer;
}
</style>