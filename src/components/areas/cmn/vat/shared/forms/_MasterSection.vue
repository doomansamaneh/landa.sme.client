<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label
        class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
      >
        عنوان
      </q-item-label>
      <custom-input
        hide-bottom-space
        v-model="model.value.title"
        :rules="[(val) => val !== null && val !== '']"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <q-option-group
        inline
        :options="helper.getEnumOptions(vatType, 'vatType')"
        type="radio"
        v-model="model.value.isForSale"
      />
    </div>
  </div>

  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md-2 col-sm-6 col-xs-6">
      <q-item-label
        class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
      >
        نرخ
      </q-item-label>
      <custom-input
        type="number"
        hide-bottom-space
        v-model="model.value.rate"
        :rules="[(val) => val !== null && val !== '']"
      >
        <template v-slot:append>
          <q-icon name="percent" />
        </template>
      </custom-input>
    </div>
  </div>

  <div class="row q-gutter-md q-mb-md">
    <q-checkbox dense size="48px" v-model="model.value.isActive" label="فعال" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { helper } from "src/helpers";
import { vatType } from "src/constants";

import CustomInput from "src/components/shared/forms/CustomInput.vue";

const props = defineProps({
  formStore: Object,
});

const model = computed(() => props.formStore.model);
</script>
