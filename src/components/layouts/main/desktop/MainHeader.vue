<template>
  <q-header
    bordered
    class="q-py-sm q-px-md"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-toolbar class="text-dark row justify-between no-padding">
      <div class="row items-center q-gutter-md">
        <div class="column items-center">
          <steam-animation />

          <q-btn
            @click="menuBarStore.toggle"
            round
            unelevated
            dense
            size="16px"
            class="text-on-dark"
          >
            <q-icon size="sm" name="o_lunch_dining" />
          </q-btn>
        </div>

        <div
          class="text-subtitle2 text-bold row justify-start items-center"
        >
          <div class="column">
            <span class="text-on-dark">
              {{ selectedBusiness.title }}
            </span>
            <today-date />
          </div>
        </div>
      </div>

      <fiscal-year />

      <div class="row items-center q-gutter-x-md">
        <q-btn
          round
          dense
          unelevated
          href="https://www.landa-sme.ir/LandaKnowledge"
          target="_blank"
        >
          <q-icon name="o_school" size="24px" />
        </q-btn>

        <switch-theme />
        <notification />

        <q-btn
          @click="contactDrawerStore.toggle"
          flat
          dense
          round
          icon="o_person_search"
          class="btn-icon text-on-dark gt-xs"
          :class="activeButton"
          size="14px"
        />

        <profile />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useSelectedBusinessStore } from "src/stores/selected-business.js";
  import { useContactDrawer } from "src/composables/useContactDrawer";
  import { useMenuBar } from "src/composables/useMenuBar";
  import FiscalYear from "src/components/layouts/main/desktop/ToolbarFiscalYear.vue";
  import Notification from "src/components/layouts/main/ToolbarNotification.vue";
  import Profile from "src/components/layouts/main/ToolbarProfile.vue";
  import SwitchTheme from "src/components/shared/SwitchTheme.vue";
  import TodayDate from "src/components/shared/TodayDate.vue";
  import SteamAnimation from "src/assets/SteamAnimation.vue";

  const contactDrawerStore = useContactDrawer();
  const menuBarStore = useMenuBar();
  const $q = useQuasar();

  const selectedBusiness = useSelectedBusinessStore();

  const activeButton = computed(() =>
    contactDrawerStore.state.value == true ? "btn-active" : ""
  );
</script>
