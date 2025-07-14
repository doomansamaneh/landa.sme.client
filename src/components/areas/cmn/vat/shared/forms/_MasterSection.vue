<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <custom-input
        :label="$t('shared.labels.title')"
        hide-bottom-space
        v-model="model.value.title"
        required
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
      <custom-input
        :label="$t('shared.labels.rate')"
        type="number"
        hide-bottom-space
        v-model="model.value.rate"
        required
      >
        <template v-slot:append>
          <q-icon name="percent" />
        </template>
      </custom-input>
    </div>
  </div>

  <div class="row q-gutter-md q-mb-md">
    <q-checkbox
      dense
      size="48px"
      v-model="model.value.isActive"
      :label="$t('shared.labels.isActive')"
    />
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { helper } from "src/helpers";
  import { vatType } from "src/constants";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model);
  const { t: $t } = useI18n();
</script>
