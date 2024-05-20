<template>
  <div class="flex justify-between items-center">
    <div class="">
      <q-btn
        round
        dense
        flat
        v-ripple
        :color="darkMode ? 'blue-3' : 'orange'"
        @click="toggleDarkMode"
      >
        <q-icon
          :class="darkMode ? 'moon-animation' : 'sun-animation'"
          :name="darkMode ? 'dark_mode' : 'light_mode'"
        />
      </q-btn>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from "vue";
  import { useQuasar } from "quasar";

  const $q = useQuasar();

  const themes = {
    green: {
      primary: "#00b200",
    },
    orange: {
      primary: "#ff6600",
    },
    blue: {
      primary: "#00aeff",
    },
    purple: {
      primary: "#c729df",
    },
    red: {
      primary: "#dc143c",
    },
  };

  const selectedTheme = ref("");
  const darkMode = ref(false);

  watch(darkMode, (newVal) => {
    $q.dark.set(newVal);
    localStorage.setItem("darkMode", newVal);
  });

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
  };

  const selectTheme = (theme) => {
    if (selectedTheme.value) {
      document.body.classList.remove(`theme--${selectedTheme.value}`);
    }
    document.body.classList.add(`theme--${theme}`);
    selectedTheme.value = theme;
    localStorage.setItem("selectedTheme", theme);
  };

  onMounted(() => {
    const darkModeisActive = localStorage.getItem("darkMode");
    if (darkModeisActive === "true") {
      darkMode.value = true;
    }

    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) {
      selectTheme(storedTheme);
    }
  });
</script>

<style lang="scss">
  @keyframes sunAnimation {
    0% {
      transform: rotate(0deg);
      color: $orange;
    }
    50% {
      transform: rotate(180deg);
      color: $yellow-7;
    }
    100% {
      transform: rotate(360deg);
      color: $orange;
    }
  }

  @keyframes moonAnimation {
    0% {
      color: $blue-3;
    }
    50% {
      color: $white;
    }
    100% {
      color: $blue-3;
    }
  }

  .sun-animation {
    animation: sunAnimation 2s infinite;
  }

  .moon-animation {
    animation: moonAnimation 2s infinite;
  }
</style>
