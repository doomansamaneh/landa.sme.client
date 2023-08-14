<template>
  <delete-business>
    <template #header>
      <q-item-section>
        <q-item-label class="text-bold">حذف کسب و کار</q-item-label>
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
  </delete-business>
</template>

<script setup>
import DeleteBusiness from "src/components/management/business/DeleteBusiness.vue"
</script>

<style lang="scss" scoped></style>
