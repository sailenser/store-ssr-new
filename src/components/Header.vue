<script setup></script>

<template>
  <header class="page-header">
    <RouterLink :to="{ name: 'home' }" class="page-header__logo"> Logo </RouterLink>
    <nav class="page-header-nav page-header__nav">
      <ul class="page-header-nav__list">
        <li class="page-header-nav__item"></li>
        <li class="page-header-nav__item">
          <RouterLink :to="{ name: 'about' }" class="page-header-nav__link">
            О нас
          </RouterLink>
        </li>
        <li class="page-header-nav__item">
          <RouterLink :to="{ name: 'auth.login' }" class="page-header-nav__link">
            Вход
          </RouterLink>
        </li>
        <li class="page-header-nav__item">
          <RouterLink :to="{ name: 'auth.registration' }" class="page-header-nav__link">
            Регистрация
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
