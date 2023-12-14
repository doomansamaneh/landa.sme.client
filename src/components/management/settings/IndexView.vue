<template>
  <q-tabs
    v-model="tab"
    class="border-radius-xs bg-primary text-white q-mt-md"
    indicator-color="white"
    align="justify"
    inline-label
    narrow-indicator
  >
    <q-tab
      name="profile"
      label="حساب"
      icon="o_person"
    />
    <q-tab
      name="quotes"
      label="رنگ تم"
      icon="o_palette"
    />
    <q-tab
      name="invoices"
      label="تب تستی 1"
      icon="o_circle"
    />
    <q-tab
      name="accountSummary"
      label="تبت تستی 2"
      icon="o_circle"
    />

  </q-tabs>

  <q-tab-panels
    class="bordered border-radius-xs q-mt-md"
    v-model="tab"
    animated
  >
    <q-tab-panel name="profile">
      <div class="row">
        <div class="col-4">
          <theme-selector />
        </div>
        <q-separator
          vertical
          inset
          class="q-mx-lg"
        />
        <div class="col"></div>
      </div>
    </q-tab-panel>

    <q-tab-panel name="test1">

    </q-tab-panel>

    <q-tab-panel name="test2">

    </q-tab-panel>

    <q-tab-panel name="test3">

    </q-tab-panel>

    <q-tab-panel name="test4">

    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import ThemeSelector from "src/components/shared/ThemeSelector.vue"

const tab = ref('profile')

</script>

<style lang="scss">
.profile-section {
  width: 400px;
}

.info-box:hover {
  border: 1px solid var(--q-primary) !important;
  cursor: pointer;
}
</style>

