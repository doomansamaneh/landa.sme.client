<template>
  <q-header
    class="q-pa-lg"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-toolbar class="text-dark row justify-between">
      <div class="q-gutter-xs">
        <q-btn
          @click="$emit('toggle-menubar')"
          round
          unelevated
          dense
          color="primary"
          size="16px"
          class="primary-shadow text-on-dark"
        >

          <q-icon
            size="xs"
            name="o_lunch_dining"
          />

        </q-btn>
      </div>

      <q-toolbar-title class="text-subtitle2 text-bold row justify-start items-center">
        <div class="column">
          <span class="text-on-dark">{{ selectedBusiness.title }}</span>
          <today-date />
        </div>


      </q-toolbar-title>



      <div class="row items-center q-gutter-x-md">
        <q-btn
          size="md"
          unelevated
          label="دانشنامه"
          href="https://www.landa-sme.ir/LandaKnowledge"
          target="_blank"
          class="bordered-btn"
        />
        <fiscal-year />
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
import { ref, computed } from "vue"
import { useQuasar } from "quasar"
import { useSelectedBusinessStore } from "src/stores/selected-business.js"
import { useContactDrawer } from "src/composables/useContactDrawer"
import FiscalYear from "./ToolbarFiscalYear.vue"
import Notification from "./ToolbarNotification.vue"
import Profile from "./ToolbarProfile.vue"
import SwitchTheme from "src/components/shared/SwitchTheme.vue"
import TodayDate from "src/components/shared/TodayDate.vue"

const contactDrawerStore = useContactDrawer()
const $q = useQuasar()

const selectedBusiness = useSelectedBusinessStore()

const emit = defineEmits(["toggle-menubar"])

const activeButton = computed(() => (contactDrawerStore.state.value == true ? 'btn-active' : ''));
</script>

