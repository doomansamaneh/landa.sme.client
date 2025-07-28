<template>
  <div
    v-if="$q.screen.xs"
    class="row q-py-md items-center justify-between"
  >
    <div class="row q-gutter-sm items-center">
      <back-button />
      <div>
        <div class="text-body1 text-weight-700">
          {{ $t("pages.business-expired") }}
        </div>
        <div class="dark-2 q-pt-xs text-subtitle2">
          {{ business?.title }}
        </div>
      </div>
    </div>

    <div class="flex items-center"></div>
  </div>

  <q-card
    :class="{
      'bordered q-my-xl card-desktop': $q.screen.gt.xs,
      'no-border no-shadow bg-transparent': $q.screen.lt.sm,
    }"
  >
    <template v-if="$q.screen.gt.xs">
      <q-card-section class="q-pa-lg">
        <div class="flex items-center q-gutter-md justify-between">
          <div>
            <div class="text-h6">
              {{ $t("pages.business-expired") }}
            </div>
            <div
              class="q-item__label q-item__label--caption text-caption"
            >
              {{ business?.title }}
            </div>
          </div>
          <div class="flex items-center q-gutter-x-md">
            <back-button />
          </div>
        </div>
      </q-card-section>
      <q-separator />
    </template>

    <q-card-section class="flex items-center justify-center">
      <img src="/sad.svg" alt="expired" class="q-mt-md" />
      <span class="text-subtitle1 text-center q-mt-md">
        {{ $t("shared.labels.businessExpiredMessage") }}
      </span>

      <renew-subscribtion
        class="bg-green text-white q-mt-md"
        size="16px"
        :business="business"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { fetchWrapper } from "src/helpers";
  import { useRoute } from "vue-router";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import RenewSubscribtion from "src/components/management/shared/RenewSubscribtionLink.vue";

  const route = useRoute();

  const business = ref(null);

  async function loadData() {
    await fetchWrapper
      .get(`business/GetBusiness/${route.params.businessId}`, true)
      .then((response) => {
        business.value = response.data.data;
      });
  }

  onMounted(() => {
    loadData();
  });
</script>

<style lang="scss" scoped>
  .card-desktop {
    width: 700px !important;
  }

  img {
    width: 120px;
  }
</style>
