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
        @click="onBottomSheetShow"
      />
    </q-tabs>
  </q-footer>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >

    <template #body>
      <q-list padding>

        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              size="36px"
            >
              <q-icon
                size="xs"
                name="o_account_circle"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing"> حساب کاربری
          </q-item-section>
        </q-item>

         <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              size="36px"
            >
              <q-icon
                size="xs"
                name="o_school"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing"> دانشنامه
          </q-item-section>
        </q-item>

      </q-list>
    </template>

  </bottom-sheet>
</template>

<script setup>
import { ref } from "vue"

import { useContactDrawer } from "src/composables/useContactDrawer"
import { useMenuBar } from "src/composables/useMenuBar"

import BottomSheet from "src/components/shared/BottomSheet.vue"

const contactDrawerStore = useContactDrawer()
const menuBarStore = useMenuBar()

const bottomSheetStatus = ref(false)

const onBottomSheetShow = () => {
  bottomSheetStatus.value = true;
}

const onBottomSheetHide = () => {
  bottomSheetStatus.value = false;
}

</script>
