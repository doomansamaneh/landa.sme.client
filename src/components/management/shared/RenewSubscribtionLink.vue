<template>
  <template v-if="$q.screen.gt.xs">
    <q-btn
      v-if="showLink"
      class="text-body3 no-letter-spacing green-gradient green-shadow"
      :to="addPaymentUrl"
      rounded
      no-caps
      text-color="white"
      unelevated
      padding="6px 12px"
    >
      <q-icon name="add" class="q-pr-xs" size="16px" />
      {{ $t("pages.renew-subscription") }}
    </q-btn>
  </template>

  <template v-if="$q.screen.lt.sm">
    <q-btn
      v-if="showLink"
      class="text-caption-sm no-letter-spacing green-shadow green-gradient"
      :to="addPaymentUrl"
      rounded
      padding="4px 8px"
      no-caps
      text-color="white"
      dense
      unelevated
    >
      <span class="text-caption-sm">تمدید</span>
    </q-btn>
  </template>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const props = defineProps({
    business: Object,
  });

  const addPaymentUrl = computed(
    () => `/business/addPayment/${props.business?.id}`
  );
  const showLink = computed(
    () =>
      props.business?.isOwner && props.business?.daysToExpire < 300
  );
</script>
