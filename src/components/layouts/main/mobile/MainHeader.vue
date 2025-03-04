<template>
  <q-header
    bordered
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-toolbar class="text-dark row justify-between">
      <q-toolbar-title
        class="text-subtitle2 text-bold row justify-start items-center"
      >
        <div class="column">
          <router-link
            style="min-width: 155px"
            to="/dashboard"
            class="ellipsis text-on-dark no-decoration"
          >
            {{ businessStore.get()?.title }}
          </router-link>
          <today-date />
        </div>
      </q-toolbar-title>

      <div class="row items-center q-gutter-x-sm">
        <fiscal-year />
        <most-used-operations />
        <switch-theme />
        <notification />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useBusiness } from "src/stores/useBusiness";
  import { useContactDrawer } from "src/composables/useContactDrawer";
  import { useMenuBar } from "src/composables/useMenuBar";
  import FiscalYear from "src/components/layouts/main/mobile/ToolbarFiscalYear.vue";
  import Notification from "src/components/layouts/main/ToolbarNotification.vue";
  import Profile from "src/components/layouts/main/ToolbarProfile.vue";
  import SwitchTheme from "src/components/shared/SwitchTheme.vue";
  import TodayDate from "src/components/shared/TodayDate.vue";
  import SteamAnimation from "src/assets/SteamAnimation.vue";
  import MostUsedOperations from "src/components/layouts/main/mobile/MostUsedOperations.vue";

  const contactDrawerStore = useContactDrawer();
  const menuBarStore = useMenuBar();
  const $q = useQuasar();

  const businessStore = useBusiness();

  const activeButton = computed(() =>
    contactDrawerStore.state.value == true ? "btn-active" : ""
  );
</script>
