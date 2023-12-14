<template>
  <div class="row items-center q-gutter-x-md">
    <q-btn
      flat
      padding="16px"
      v-for="(theme, themeName) in themes"
      :key="themeName"
      :style="{ backgroundColor: getPrimaryColor(themeName) }"
      @click="selectTheme(themeName)"
      :class="getClass(themeName)"
    >
      <q-icon
        v-if="selectedTheme === themeName"
        name="check"
        color="white"
        class="checked-icon"
        size="md"
      />

      <q-icon v-else size="xs" />

      <q-tooltip
        class="z-max"
        :style="{ background: getPrimaryColor(themeName) }"
      >{{ themeName }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const themes = {
  green: {
    primary: '#00b200',
  },
  orange: {
    primary: '#ff6600',
  },
  blue: {
    primary: '#00aeff',
  },
  purple: {
    primary: '#c729df',
  },
  red: {
    primary: '#dc143c',
  },
};

const selectedTheme = ref(localStorage.getItem('selectedTheme') || '');

const selectTheme = (theme) => {
  if (selectedTheme.value === theme) {
    selectedTheme.value = '';
    document.body.classList.remove(`theme--${theme}`);
    localStorage.removeItem('selectedTheme');
  } else {
    if (selectedTheme.value) {
      document.body.classList.remove(`theme--${selectedTheme.value}`);
    }
    document.body.classList.add(`theme--${theme}`);
    selectedTheme.value = theme;
    localStorage.setItem('selectedTheme', theme);
  }
};

const getPrimaryColor = (themeName) => {
  return themes[themeName].primary;
};

const getClass = (themeName) => {
  return 'cursor-pointer' + (selectedTheme.value === themeName ? ' active' : '');
};
</script>

