<template>
  <reset-password>
    <template #header>
      <q-card-section>
        <div class="text-h6">change password</div>
      </q-card-section>
      <q-card-actions>
        <h4>test</h4>
        <div class="flex items-center q-gutter-x-md">
          <q-icon
            class="icon-hover dark-3 cursor-pointer"
            size="xs"
            name="arrow_back"
            @click="$router.go(-1)"
          >
            <q-tooltip class="custom-tooltip">{{
              $t("page.buttons.back")
            }}</q-tooltip>
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
