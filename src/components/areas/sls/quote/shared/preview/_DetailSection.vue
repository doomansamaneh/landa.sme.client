<template>
  <q-card class="bordered">
    <q-card-section>
      <div class="column q-gutter-y-sm">
        <div class="row">
          <span class="col-2 text-caption text-bold">شماره: </span>
          <span class="text-body3 q-mx-md">{{ model.value.no }}</span>
        </div>

        <div class="row items-center">
          <span class="col-2 text-caption text-bold">مشتری:</span>
          <span class="text-body3 q-mx-md">
            <router-link
              class="no-decoration"
              :to="`/crm/customer/preview/${model.value.customerId}`"
            >
              <q-icon
                name="o_description"
                size="xs"
                class="q-mr-xs"
                :class="color()"
              />
              <span class="decoration-on-hover" :class="color()">
                {{ model.value.customerName }}
              </span>
            </router-link>
          </span>
        </div>

        <div class="row" v-if="model.value.marketerName">
          <span class="col-1 text-caption text-bold">بازاریاب:</span>
          <span class="text-body3 q-mx-md">{{ model.value.marketerName }}</span>
        </div>
      </div>
    </q-card-section>

    <q-card-section v-if="model.value.id">
      <detail-log />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

import DetailLog from "./_DetailLog.vue";

const props = defineProps({
  model: Object,
  formStore: Object,
});

const $q = useQuasar();

const tab = ref("log");
const color = () => {
  return $q.dark.isActive ? "text-yellow" : "text-primary";
};
</script>
