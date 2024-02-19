<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md-3 col-sm-6 col-xs-12" v-for="(theme, themeName) in themes" :key="themeName">
      <q-card class="bordered" :class="getClass(themeName)" @click="selectTheme(themeName)">

        <q-card-section :style="{ backgroundColor: getPrimaryColor(themeName) }" class="min-opacity q-py-xl" />

        <q-card-section>
          <q-btn :style="{ backgroundColor: getPrimaryColor(themeName) }" size="20px" unelevated round class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);">
            <q-icon v-if="selectedTheme === themeName" name="check" color="white" class="checked-icon" size="md" />
          </q-btn>
        </q-card-section>

        <q-card-section class="q-pt-none">
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

  <!-- <div class="row items-center q-gutter-x-md">
    <q-btn flat padding="16px" v-for="(theme, themeName) in themes" :key="themeName"
      :style="{ backgroundColor: getPrimaryColor(themeName) }" @click="selectTheme(themeName)"
      :class="getClass(themeName)">
      <q-icon v-if="selectedTheme === themeName" name="check" color="white" class="checked-icon" size="md" />

      <q-icon v-else size="xs" />

      <q-tooltip class="z-max" :style="{ background: getPrimaryColor(themeName) }">{{ themeName }}</q-tooltip>
    </q-btn>
  </div> -->
</template>

<script setup>
import { ref } from 'vue';

const themes = {
  blue: {
    primary: '#00aeff',
  },
  green: {
    primary: '#00b200',
  },
  orange: {
    primary: '#ff6600',
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

<style lang="scss">
.min-opacity {
  opacity: 0.2;
}
</style>
