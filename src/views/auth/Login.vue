<script setup>
  import { LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <div class="page-login place">
    <div class="page-login__wrapper">
      <h1 class="page-login__header">Добро пожаловать!</h1>
      <p class="page-login__subheader">Войдите в свой аккаунт, чтобы продолжить</p>
      <div class="page-login__content">
        <div class="page-login__field">
          <p class="page-login__txt">Email или Имя пользователя</p>
          <div class="page-login__box">
            <UserIcon class="icon user-icon page-login__icon" />
            <input type="text" class="page-login__input" placeholder="Введите email или имя" />
          </div>
        </div>
        <div class="page-login__field">
          <p class="page-login__txt">Пароль</p>
          <div class="page-login__box">
            <LockClosedIcon class="icon home-icon page-login__icon" />
            <input type="text" class="page-login__input" placeholder="Введите пароль" />
          </div>
        </div>
        <button class="page-login__btn" type="button">Войти</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/styles/scss/pages/login.scss';
</style>
