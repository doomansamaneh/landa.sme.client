<template>
  <invite-user>
    <template #header>
      <q-item-section>
        <q-item-label class="text-bold">{{
          $t("invite-user-page.title")
        }}</q-item-label>
      </q-item-section>
      <q-card-actions>
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
  </invite-user>
</template>

<script setup>
import InviteUser from "src/components/management/users/InviteUser.vue"
</script>

<style lang="scss" scoped></style>
