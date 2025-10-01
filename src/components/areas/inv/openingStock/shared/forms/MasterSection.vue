<template>
  <div class="row q-col-gutter-xl">
    <div class="col">
      <div class="row q-col-gutter-md">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <date-time
            :label="$t('shared.columns.date')"
            v-model="model.date"
          />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <inventory-lookup
            :label="$t('shared.columns.inventoryTitle')"
            v-model:selectedId="model.inventoryId"
            v-model:selectedText="model.inventoryTitle"
          />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <inventory-lookup
            :label="$t('shared.columns.slTitle')"
            v-model:selectedId="model.slId"
            v-model:selectedText="model.slTitle"
          />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <custom-input
            :label="$t('shared.columns.summary')"
            v-model="model.summary"
            hide-bottom-space
            type="textarea"
          />
        </div>
      </div>

      <div class="row items-center q-py-md q-gutter-md">
        <q-btn
          no-caps
          class="primary-shadow"
          rounded
          unelevated
          color="primary"
          @click="formStore.addAllProducts()"
        >
          <q-icon name="o_add" size="20px" class="q-mr-xs" />
          {{ $t("shared.labels.addAllProducts") }}
        </q-btn>

        <q-btn
          no-caps
          v-if="model?.repositionItems?.length"
          color="red"
          class="text-on-dark"
          rounded
          unelevated
          @click="formStore.deleteAllProducts()"
        >
          <q-icon name="o_delete" size="20px" class="q-mr-xs" />
          {{ $t("shared.labels.deleteAll") }}
        </q-btn>
        <q-btn
          padding="8px 16px"
          no-caps
          v-else
          class="primary-gradient primary-shadow text-white"
          rounded
          unelevated
          @click="formStore.pushNewRow()"
        >
          <q-icon name="o_add" size="20px" class="q-mr-xs" />
          {{ $t("shared.labels.addRow") }}
        </q-btn>
      </div>
    </div>
    <div class="col q-gutter-y-md">
      <q-btn
        no-caps
        rounded
        unelevated
        href="/excelTemplate/import/openingStockTemplate.xlsx"
      >
        <q-icon
          name="file_download"
          class="q-pr-xs"
          size="xs"
          :class="hrefColor"
        />
        <span>{{ $t("shared.labels.downloadTemplate") }}</span>
      </q-btn>
      <upload-area ref="uploadArea" @upload="upload" />
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { baseUrl } from "src/constants";
  import { useRepositionModel } from "../../../_composables/useRepositionModel";

  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import UploadArea from "src/components/areas/_shared/common/UploadArea.vue";

  const { t } = useI18n();

  const props = defineProps({
    formStore: useRepositionModel,
  });

  const model = computed(() => props.formStore.model.value);
  const upload = async (file) => {
    await props.formStore.importProduct("ImportProduct", file);
  };
</script>
