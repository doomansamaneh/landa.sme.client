<template>
  <q-btn-dropdown
    no-caps
    icon="language"
    :label="cultureStore.culture.value.name"
    :options="cultures"
    class="lang-switcher text-primary text-bold"
    auto-close
  >
    <q-item-section class="z-max">
      <q-item
        class="z-max"
        clickable
        v-for="lang in cultures"
        :key="lang.code"
      >
        <q-item-section @click="cultureStore.setCulture(lang.code)">
          <q-item-label>{{ lang.name }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="cultureStore.culture.value.code === lang.code">
          <q-icon
            name="done"
            color="primary"
            size="xs"
            right
          ></q-icon>
        </q-item-section>
      </q-item>
    </q-item-section>
  </q-btn-dropdown>
</template>

<script setup>
import { cultures } from "src/constants/enums"
import { useCulture } from "src/composables/useCulture"
const cultureStore = useCulture()
</script>
