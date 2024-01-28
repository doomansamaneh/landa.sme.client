<template>
  <transition
    enter-active-class="animated slideInDown"
  >
    <q-header
      v-show="headerStore.showHeader.value"
      bordered
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
    >
      <q-toolbar
        style="padding-left: 20px; padding-right: 20px;"
        class="row justify-between q-py-sm"
      >

        <q-toolbar-title class="text-subtitle2 text-bold row justify-start items-center">
          <div class="column">
            <span
              style="width:200px"
              class="ellipsis text-on-dark"
            >{{ selectedBusiness.title }}</span>
            <today-date />
          </div>
        </q-toolbar-title>

        <div class="row q-gutter-x-sm">
          <fiscal-year />
          <q-btn
            unelevated
            round
            dense
            icon="o_unfold_more"
            size="md"
            class="text-on-dark"
            @click="showToolbar"
          />
        </div>
      </q-toolbar>

      <q-separator />

      <q-slide-transition>
        <div v-show="toolbar">
          <q-toolbar
            style="padding-left: 20px; padding-right: 20px;"
            class="row items-center q-py-md"
          >
            <div class="col-8 row items-center q-gutter-sm">
              <switch-theme />
              <q-btn
                @click="contactDrawerStore.toggle"
                flat
                dense
                round
                icon="o_person_search"
                class="btn-icon text-on-dark"
                :class="activeButton"
                size="14px"
              />
              <notification />
              <profile />
            </div>

            <div class="col row items-center justify-end">
              <q-btn
                padding="4px 12px"
                unelevated
                label="دانشنامه"
                href="https://www.landa-sme.ir/LandaKnowledge"
                target="_blank"
                class="text-on-dark bordered-btn"
              />
            </div>


          </q-toolbar>
        </div>
      </q-slide-transition>

    </q-header>
  </transition>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"

import { useQuasar } from "quasar"
import { useSelectedBusinessStore } from "src/stores/selected-business.js"
import { useContactDrawer } from "src/composables/useContactDrawer"
import { useMenuBar } from "src/composables/useMenuBar"
import { useHeader } from "src/composables/mobile/useHeader"

import FiscalYear from "src/components/layouts/main/ToolbarFiscalYear.vue"
import Notification from "src/components/layouts/main/ToolbarNotification.vue"
import Profile from "src/components/layouts/main/ToolbarProfile.vue"
import SwitchTheme from "src/components/shared/SwitchTheme.vue"
import TodayDate from "src/components/shared/TodayDate.vue"


const menuBarStore = useMenuBar()
const contactDrawerStore = useContactDrawer()
const headerStore = useHeader()
const $q = useQuasar()
const selectedBusiness = useSelectedBusinessStore()

const activeButton = computed(() => (contactDrawerStore.state.value == true ? 'btn-active' : ''));
const toolbar = ref(false)

const showToolbar = () => {
  toolbar.value = !toolbar.value
}

// const showHeader = ref(true)
// let previousScrollPosition = 0

// const handleScroll = () => {
//   const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
//   showHeader.value = currentPosition <= 0 || currentPosition < previousScrollPosition;
//   previousScrollPosition = currentPosition;
// };

onMounted(() => {
  window.addEventListener('scroll', headerStore.handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', headerStore.handleScroll)
})
</script>
