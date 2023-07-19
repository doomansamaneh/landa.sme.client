<template>
  <reset-password>
    <template #header>
      <q-item-section>
        <q-item-label class="text-bold">تغییر رمز عبور</q-item-label>
      </q-item-section>
      <q-card-actions>
        <div class="flex items-center q-gutter-x-md">
          <q-icon
            class="icon-hover dark-3 cursor-pointer"
            size="xs"
            name="arrow_back"
            @click="$router.go(-1)"
          >
            <q-tooltip>بازگشت</q-tooltip>
          </q-icon>
        </div>
      </q-card-actions>
    </template>
  </reset-password>
</template>

<script setup>
import ResetPassword from "src/components/users/ResetPassword.vue"
</script>

<style lang="scss" scoped></style>
