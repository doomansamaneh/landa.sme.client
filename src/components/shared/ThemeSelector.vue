<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md-3 col-sm-6 col-xs-12" v-for="(theme, themeName) in themes" :key="themeName">
      <q-card class="bordered" :class="getClass(themeName)" @click="selectTheme(themeName)">

        <q-card-section :style="{ backgroundColor: getPrimaryColor(themeName) }" class="min-opacity q-py-xl" />

        <q-card-section class="q-pb-xs">
          <q-btn :style="{ backgroundColor: getPrimaryColor(themeName) }" size="20px" unelevated round class="absolute"
            style="top: 0; left: 16px; transform: translateY(-50%);">
            <q-icon v-if="selectedTheme === themeName" name="check" color="white" class="checked-icon" size="md" />
          </q-btn>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-body1 no-letter-spacing">
            {{ theme.name }}
          </div>
          <div class="no-pointer-events q-py-md">
            <q-skeleton :animation="selectedTheme === themeName ? 'wave' : 'none'"
              :style="{ backgroundColor: getPrimaryColor(themeName) }" class="theme-color min-opacity" type="text" />
            <q-skeleton :animation="selectedTheme === themeName ? 'wave' : 'none'"
              :style="{ backgroundColor: getPrimaryColor(themeName) }" class="theme-color min-opacity" type="text" />
            <q-skeleton :animation="selectedTheme === themeName ? 'wave' : 'none'"
              :style="{ backgroundColor: getPrimaryColor(themeName) }" class="theme-color min-opacity" type="text" />
          </div>
        </q-card-section>

      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const themes = {
  blue: {
    primary: '#007acc',
    name: 'آبی لاندا'
  },
  green: {
    primary: '#00b200',
    name: 'سبز سیدی'
  },
  orange: {
    primary: '#ff6600',
    name: 'نارنجی'
  },
  purple: {
    primary: '#c729df',
    name: 'لوکس'
  },
  red: {
    primary: '#dc143c',
    name: 'قرمز'
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
  return 'cursor-pointer' + (selectedTheme.value === themeName ? 'active' : '');
};
</script>

<style lang="scss">
.min-opacity {
  opacity: 0.2;
}

.q-skeleton--anim-wave {
  z-index: 0;
}
</style>
