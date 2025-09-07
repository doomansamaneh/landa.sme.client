<template>
  <template v-if="$q.screen.gt.xs">
    <q-btn
      no-caps
      v-if="showLink"
      class="text-body3 green-gradient green-shadow"
      :to="addPaymentUrl"
      rounded
      text-color="white"
      unelevated
      padding="8px 16px"
    >
      <q-icon name="add" class="q-pr-xs" size="16px" />
      {{ $t("pages.renew-subscription") }}
    </q-btn>
  </template>

  <template v-if="$q.screen.lt.sm">
    <q-btn
      no-caps
      v-if="showLink"
      class="text-caption-sm green-shadow green-gradient"
      :to="addPaymentUrl"
      rounded
      padding="4px 8px"
      text-color="white"
      dense
      unelevated
    >
      <span class="text-caption-sm">
        {{ $t("pages.renew-subscription") }}
      </span>
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
