<template>
  <q-card bordered>
    <q-card-section class="q-gutter-md">
      <div v-if="model.voucherId" class="row items-center">
        <span class="col-2 text-caption text-bold">
          سند حسابداری:
        </span>
        <span class="text-body3 q-mx-md">
          <router-link
            class="no-decoration"
            :to="`/acc/voucher/preview/${model.voucherId}`"
          >
            <q-icon
              name="o_description"
              size="xs"
              class="q-mr-xs"
              :class="color()"
            />
            <span class="decoration-on-hover" :class="color()">
              {{ model.voucherNo }}
            </span>
          </router-link>
        </span>
      </div>
    </q-card-section>

    <q-card-section v-if="model.id">
      <detail-log />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import DetailLog from "./_DetailLog.vue";
  import { useQuasar } from "quasar";

  const props = defineProps({
    model: Object,
    formStore: Object,
  });

  const $q = useQuasar();
  const color = () => {
    return $q.dark.isActive ? "text-yellow" : "text-primary";
  };
</script>
