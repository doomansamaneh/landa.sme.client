<template>
  <q-tabs
    v-model="tab"
    class="border-radius-xs bg-primary text-white"
    indicator-color="white"
    align="justify"
    inline-label
    narrow-indicator
  >
    <q-tab
      name="profile"
      label="نمایه"
      icon="o_person"
    />
    <q-tab
      name="quotes"
      label="امنیت"
      icon="o_password"
    />
    <q-tab
      name="general"
      label="تم و زبان"
      icon="o_palette"
    />
    </q-tabs>

  <q-tab-panels
    class="bordered border-radius-xs q-mt-md"
    v-model="tab"
    animated
  >
    <q-tab-panel name="profile">

      <profile-section />

    </q-tab-panel>

    <q-tab-panel name="security">

    </q-tab-panel>

    <q-tab-panel name="general">

    </q-tab-panel>

    <q-tab-panel name="accountSummary">

    </q-tab-panel>

    <q-tab-panel name="history">

    </q-tab-panel>
  </q-tab-panels>
</template>


<script setup>
import { ref } from "vue"

import ProfileSection from "src/components/management/settings/desktop/index/ProfileSection.vue"
import ThemeColor from "src/components/management/settings/desktop/index/ThemeColor.vue"

const tab = ref('profile')
</script>
