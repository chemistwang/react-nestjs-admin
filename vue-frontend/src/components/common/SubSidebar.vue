<template>
  <ul class="menus">
      <li class="menu"></li>
      <li class="menu" :class="{active:index===current}" v-for="(menu, index) in menuList" :key="index" @click="go(menu, index)">
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
    data(){
        return {
            current: 0
        }
    },
    methods: {
        go(menu, index){
            this.current = index;
            if (this.$route.path !== menu.path) {
                this.$router.push(menu.path);
            }
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
.menu.active {
    background: #F5F7FD;
    color: #516DE3;
}
</style>