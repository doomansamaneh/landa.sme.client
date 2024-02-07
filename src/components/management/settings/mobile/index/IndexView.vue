<template>
  <div class="column items-center justify-center q-py-lg">

    <q-avatar
      class="primary-shadow q-mx-sm"
      text-color="white"
      color="primary"
      size="100px"
    >
      <div class="text-h4 text-bold">{{ helper.getFirstChar(username) }}</div>
    </q-avatar>

    <div class="q-mt-md text-on-dark text-h6">{{ username }}</div>

  </div>
  <a
    href="https://www.landa-sme.ir/LandaKnowledge"
    target="_blank"
    class="no-decoration"
  >
    <q-card class="bg-on-dark border-radius-md q-my-lg bordered">

      <div class=" row items-center q-pa-md q-gutter-x-md">
        <div
          class="row items-center"
          style="width:60px"
        >
          <img
            src="../../../../../../public/knowledge.svg"
            width="52px"
          >
        </div>
        <div class="col">
          <div class="text-caption-sm line-height-xs no-letter-spacing">
            دانشنامه و آموزش امکانات مختلف نرم افزار حسابداری آنلاین لاندا
          </div>
        </div>
        <div
          class="q-mr-sm"
          style="width: 20px;"
        >
          <q-btn
            size="md"
            dense
            unelevated
            rounded
            icon="o_chevron_left"
          />
        </div>
      </div>
    </q-card>
  </a>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useAuthStore } from "src/stores"
import { helper } from "src/helpers"

import ThemeSelector from "src/components/shared/ThemeSelector.vue"
import LangSwitcher from "src/components/shared/SwitchLanguage.vue"

const authStore = useAuthStore()

const username = computed(() => {
  if (authStore.user) return authStore.user.fullName
  return ""
})

</script>
