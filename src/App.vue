<template>
  <app-header></app-header>
  <router-view />
  <app-footer></app-footer>
</template>

<script>
import Header from '@/components/layouts/header/header'
import Footer from '@/components/layouts/footer/footer'

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer,
  },
}
</script>

<style lang="scss">
@import './sass/app';
</style>
