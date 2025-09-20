<template>
  <template v-if="$q.screen.gt.xs">
    <q-btn
      padding="8px 16px"
      no-caps
      v-if="showLink"
      class="text-body3 green-gradient green-shadow"
      :to="addPaymentUrl"
      rounded
      text-color="white"
      unelevated
    >
      <q-icon name="add" class="q-pr-xs" size="16px" />
      {{ $t("pages.renew-subscription") }}
    </q-btn>
  </template>

  <template v-if="$q.screen.lt.sm">
    <q-btn
      no-caps
      v-if="showLink"
      class="text-caption green-shadow green-gradient text-white"
      :to="addPaymentUrl"
      rounded
      dense
      padding="2px 10px"
      unelevated
    >
      {{ $t("pages.renew-subscription") }}
    </q-btn>
  </template>
</template>

<script setup>
  import { ref, computed } from "vue";

  const props = defineProps({
    business: Object,
  });

  const currentBusiness = computed(() => props.business);
  const addPaymentUrl = computed(
    () => `/business/addPayment/${currentBusiness?.value?.id}`
  );
  const showLink = computed(
    () =>
      currentBusiness?.value?.isOwner &&
      currentBusiness?.value?.daysToExpire < 30
  );
</script>
