<template>
  <q-footer
    v-if="$q.screen.lt.md"
    bordered
    class="bottom-navigation text-on-dark"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-tabs
      indicator-color="primary"
      active-color="primary"
    >
      <q-route-tab
        class="text-caption"
        icon="o_menu"
        label="منو"
        :ripple="false"
        @click="menuBarStore.toggle"
      />

      <q-route-tab
        icon="o_dashboard"
        label="داشبورد"
        to="/dashboard"
        :ripple="false"
      />

      <q-route-tab
        icon="o_person_search"
        label="مخاطبین"
        :ripple="false"
        @click="contactDrawerStore.toggle"
      />

      <q-route-tab
        icon="o_more_horiz"
        label="بیشتر"
        :ripple="false"
      />
    </q-tabs>
  </q-footer>
</template>

<script setup>
import { ref } from "vue"

import { useContactDrawer } from "src/composables/useContactDrawer"
import { useMenuBar } from "src/composables/useMenuBar"

const contactDrawerStore = useContactDrawer()
const menuBarStore = useMenuBar()

</script>
