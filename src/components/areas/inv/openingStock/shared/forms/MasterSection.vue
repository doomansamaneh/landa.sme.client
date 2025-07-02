<template>
  <div class="row q-col-gutter-xl">
    <div class="col">
      <div class="row q-col-gutter-md">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <date-time label="تاریخ" v-model="model.date" />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <inventory-lookup
            label="انبار"
            v-model:selectedId="model.inventoryId"
            v-model:selectedText="model.inventoryTitle"
          />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <inventory-lookup
            label="حساب معین"
            v-model:selectedId="model.slId"
            v-model:selectedText="model.slTitle"
          />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <custom-input
            label="شرح"
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
          افزودن همه کالاها
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
          حذف همه
        </q-btn>
        <q-btn
          no-caps
          v-else
          class="primary-shadow"
          rounded
          unelevated
          color="primary"
          @click="formStore.pushNewRow()"
        >
          <q-icon name="o_add" size="20px" class="q-mr-xs" />
          افزودن ردیف
        </q-btn>
      </div>
    </div>
    <div class="col q-gutter-y-md">
      <q-btn
        no-caps
        rounded
        unelevated
        :href="`${baseUrl}/excelTemplate/import/openingStockTemplate.xlsx`"
      >
        <q-icon
          name="file_download"
          class="q-pr-xs"
          size="xs"
          :class="hrefColor"
        />
        <span>دانلود الگوی بارگزاری</span>
      </q-btn>
      <upload-area ref="uploadArea" @upload="upload" />
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { baseUrl } from "src/constants";
  import { useRepositionModel } from "../../../_composables/useRepositionModel";

  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import UploadArea from "src/components/areas/_shared/common/UploadArea.vue";

  const props = defineProps({
    formStore: useRepositionModel,
  });

  const model = computed(() => props.formStore.model.value);
  const upload = async (file) => {
    await props.formStore.importProduct("ImportProduct", file);
  };
</script>
