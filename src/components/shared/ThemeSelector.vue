<template>
  <div class="row q-col-gutter-lg">
    <div
      class="col-md-4 col-sm-4 col-xs-12"
      v-for="(theme, themeName) in themes"
      :key="themeName"
    >
      <q-card
        class="bordered"
        :class="getClass(themeName)"
        @click="selectTheme(themeName)"
      >
        <q-card-section
          :style="{ backgroundColor: getPrimaryColor(themeName) }"
          class="min-opacity q-py-xl"
        />

        <q-card-section class="q-pb-xs">
          <q-btn
            :style="activeBtnStyle(themeName)"
            size="20px"
            unelevated
            round
            class="absolute"
            style="top: 0; transform: translateY(-50%)"
          >
            <q-icon
              v-if="selectedTheme === themeName"
              name="check"
              color="white"
              class="checked-icon"
              size="md"
            />
          </q-btn>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-body1">
            {{ theme.name }}
          </div>
          <div class="no-pointer-events q-py-md">
            <q-skeleton
              :animation="skeletonAnimation(themeName)"
              :style="skeletonStyle(themeName)"
              class="theme-color min-opacity"
              type="text"
            />
            <q-skeleton
              :animation="skeletonAnimation(themeName)"
              :style="skeletonStyle(themeName)"
              class="theme-color min-opacity"
              type="text"
            />
            <q-skeleton
              :animation="skeletonAnimation(themeName)"
              :style="skeletonStyle(themeName)"
              class="theme-color min-opacity"
              type="text"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";

  const $q = useQuasar();

  const themes = {
    blue: {
      primary: "#007acc",
      name: "آبی لاندا",
    },
    green: {
      primary: "#00b200",
      name: "سبز سیدی",
    },
    orange: {
      primary: "#ff6600",
      name: "نارنجی تابستانی",
    },
    purple: {
      primary: "#c729df",
      name: "بنفش ساسانی",
    },
    red: {
      primary: "#dc143c",
      name: "رز آمریکایی",
    },
  };

  const selectedTheme = ref(localStorage.getItem("selectedTheme"));

  const selectTheme = (theme) => {
    if (selectedTheme.value === theme) {
      selectedTheme.value = "";
      document.body.classList.remove(`theme--${theme}`);
      localStorage.removeItem("selectedTheme");
    } else {
      if (selectedTheme.value) {
        document.body.classList.remove(
          `theme--${selectedTheme.value}`
        );
      }
      document.body.classList.add(`theme--${theme}`);
      selectedTheme.value = theme;
      localStorage.setItem("selectedTheme", theme);
    }
  };

  const getPrimaryColor = (themeName) => {
    return themes[themeName].primary;
  };

  const getClass = (themeName) => {
    return (
      "cursor-pointer" +
      (selectedTheme.value === themeName ? " active" : "")
    );
  };

  const activeBtnStyle = (themeName) => {
    return {
      backgroundColor: getPrimaryColor(themeName),
      left: $q.lang.isoName === "en-US" ? "auto" : "16px",
      right: $q.lang.isoName === "en-US" ? "16px" : "auto",
    };
  };

  const skeletonAnimation = (themeName) => {
    return selectedTheme.value === themeName ? "wave" : "none";
  };

  const skeletonStyle = (themeName) => {
    return {
      backgroundColor: getPrimaryColor(themeName),
    };
  };
</script>

<style lang="scss">
  .min-opacity {
    opacity: 0.4;
  }

  .q-skeleton--anim-wave {
    z-index: 0;
  }
</style>
