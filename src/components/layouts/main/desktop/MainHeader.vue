<template>
  <q-header
    bordered
    class="q-px-md"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <div class="row no-wrap">
      <q-toolbar class="col-auto no-padding">
        <div class="row items-center q-gutter-sm">
          <div class="column items-center">
            <steam-animation />

            <q-btn
              @click="menuBarStore.toggle"
              round
              unelevated
              dense
              class="text-on-dark"
            >
              <q-icon size="26px" name="o_lunch_dining" />
            </q-btn>
          </div>

          <div class="text-bold row justify-start items-center">
            <div class="column">
              <span class="text-body3 text-on-dark">
                {{ businessStore.get()?.title }}
              </span>
              <today-date />
            </div>
          </div>
        </div>
      </q-toolbar>

      <q-toolbar class="row items-center justify-center q-gutter-sm">
        <fiscal-year />
      </q-toolbar>

      <q-toolbar class="col-auto text-on-dark no-padding">
        <q-space />

        <div class="row items-center justify-end q-gutter-x-md">
          <most-used-operations />

          <!-- <q-btn
            round
            dense
            unelevated
            href="https://www.landa-sme.ir/LandaKnowledge"
            target="_blank"
          >
            <q-icon name="o_school" size="24px" />
          </q-btn> -->

          <switch-theme />
          <notification />

          <q-btn
            flat
            dense
            round
            icon="o_person_search"
            class="btn-icon text-on-dark gt-xs"
            size="14px"
            :class="activeButton"
            @click="toggleContactDrawer"
          />

          <profile />
        </div>
      </q-toolbar>
    </div>
  </q-header>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useBusiness } from "src/stores/useBusiness";
  import { useContactDrawer } from "src/composables/useContactDrawer";
  import { useNotifDrawer } from "src/composables/useNotifDrawer";
  import { useMenuBar } from "src/composables/useMenuBar";

  import FiscalYear from "src/components/layouts/main/desktop/ToolbarFiscalYear.vue";
  import Notification from "src/components/layouts/main/ToolbarNotification.vue";
  import Profile from "src/components/layouts/main/ToolbarProfile.vue";
  import SwitchTheme from "src/components/shared/SwitchTheme.vue";
  import TodayDate from "src/components/shared/TodayDate.vue";
  import SteamAnimation from "src/assets/SteamAnimation.vue";
  import MostUsedOperations from "src/components/layouts/main/desktop/MostUsedOperations.vue";

  const contactDrawerStore = useContactDrawer();
  const notifDrawerStore = useNotifDrawer();
  const menuBarStore = useMenuBar();
  const $q = useQuasar();

  const businessStore = useBusiness();

  const activeButton = computed(() =>
    contactDrawerStore.state.value == true ? "btn-active" : ""
  );

  const toggleContactDrawer = () => {
    contactDrawerStore.toggle();
    if (notifDrawerStore.state.value) {
      notifDrawerStore.state.value = false;
    }
  };
</script>
