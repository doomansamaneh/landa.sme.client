<template>
  <q-card class="card-desktop no-shadow q-my-xl">
    <q-card-section>
      <q-item class="">
        <q-item-section>
          <q-item-label class="text-h6">
            {{ $t("pages.business-expired") }}
          </q-item-label>
          <q-item-label class="dark-2 text-subtitle2"> </q-item-label>
        </q-item-section>
        <q-card-actions>
          <div class="flex items-center q-gutter-x-md">
            <back-button />
          </div>
        </q-card-actions>
      </q-item>
    </q-card-section>
    <q-card-section>
      کسب و کار شما منقضی شده است. تمدید اشتراک را بزنید
    </q-card-section>
  </q-card>
</template>

<script setup>
import BackButton from "src/components/shared/Buttons/GoBackLink.vue"
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 700px !important;
}
</style>
