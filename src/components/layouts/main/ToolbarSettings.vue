<template>
  <q-btn
    flat
    dense
    round
    icon="o_settings"
    class="btn-icon text-on-dark"
    size="14px"
  >
    <q-menu
      fit
      class="no-shadow z-max"
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="[10, 24]"
    >
      <q-list
        dense
        padding
        class="user-setting"
      >
        <q-item-label
          class="text-h6"
          header
        >
          <div class="column items-center justify-center q-mt-md">
            <div class="q-mt-md">
              <span class="text-on-dark">تنظیمات</span>
            </div>
          </div>
        </q-item-label>
        <div class="row justify-center q-py-sm">
          <switch-language class="language-main-layout" />
        </div>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
import SwitchLanguage from "src/components/shared/SwitchLanguage.vue"
</script>
