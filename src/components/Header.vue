<script setup></script>

<template>
  <header class="page-header">
    <nav class="page-header__nav">
      <ul>
        <li class="header-navigation-list__item">
          <RouterLink :to="{ name: 'home' }" class="header-navigation-list__link">
            Главная
          </RouterLink>
        </li>
        <li class="header-navigation-list__item">
          <RouterLink :to="{ name: 'about' }" class="header-navigation-list__link">
            О нас
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
