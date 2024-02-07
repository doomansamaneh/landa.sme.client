<template>
  <div class="row">
    <div class="col row items-center">
      <q-avatar
        class="border-radius-md primary-shadow q-mr-lg"
        text-color="white"
        color="primary"
        square
        size="100px"
      >
        <div class="text-h4 no-letter-spacing text-bold">{{ helper.getFirstChar(username) }}</div>
      </q-avatar>

      <div class="column">

        <div class="row items-center q-mb-lg q-gutter-x-xs">
          <div class="text-on-dark text-body1 no-letter-spacing text-bold">{{ username }}</div>
          <div class="text-body1 caption-on-dark no-letter-spacing">
            حداکثر حجم قابل قبول برای آپلود تصاویر، 800 کیلوبایت می‌باشد.
          </div>
        </div>


        <div class="row items-center q-gutter-md">

          <q-btn
            padding="10px 24px"
            rounded
            unelevated
            color="primary"
            class="text-body2 no-letter-spacing primary-shadow"
            label="آپلود تصویر نمایه"
          />
          <q-btn
            dense
            color="negative"
            outline
            round
            unelevated
            icon="o_delete"
          />
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"

import { useAuthStore } from "src/stores"
import { helper } from "src/helpers"

const authStore = useAuthStore()

const username = computed(() => {
  if (authStore.user) return authStore.user.fullName
  return ""
})
</script>
