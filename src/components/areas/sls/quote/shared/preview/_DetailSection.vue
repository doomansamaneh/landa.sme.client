<template>
  <q-card
    class="bordered"
    :class="$q.screen.xs ? 'form-container' : ''"
    style="margin-top: 0"
  >
    <q-card-section>
      <slot name="header">
        <div class="column q-gutter-y-sm">
          <div class="row items-center">
            <span class="col-2 text-caption text-bold">شماره:</span>
            <span class="text-body3 q-mx-md">
              {{ model.value.no }}
            </span>
          </div>

          <div class="row items-center">
            <span class="col-2 text-caption text-bold">مشتری:</span>
            <span class="text-body3 q-mx-md">
              <custom-link
                :to="`/crm/customer/preview/${model.value.customerId}`"
                :title="model.value.customerName"
              />
            </span>
          </div>

          <div
            v-if="model?.value?.invoiceId"
            class="row items-center"
          >
            <span class="col-2 text-caption text-bold">فاکتور:</span>
            <span class="text-body3 q-mx-md">
              <custom-link
                :to="`/sls/invoice/preview/${model.value.invoiceId}`"
                :title="model.value.invoiceNo"
              />
            </span>
          </div>

          <div
            v-if="model.value.marketerName"
            class="row items-center"
          >
            <span class="col-2 text-caption text-bold">
              بازاریاب:
            </span>
            <span class="text-body3 q-mx-md">
              {{ model.value.marketerName }}
            </span>
          </div>

          <div
            v-if="model.value.contractTitle"
            class="row items-center"
          >
            <span class="col-2 text-caption text-bold">قرارداد:</span>
            <span class="text-body3 q-mx-md">
              {{ model.value.contractTitle }}
            </span>
          </div>

          <div
            v-if="model.value.inventoryTitle"
            class="row items-center"
          >
            <span class="col-2 text-caption text-bold">انبار:</span>
            <span class="text-body3 q-mx-md">
              {{ model.value.inventoryTitle }}
            </span>
          </div>
        </div>
      </slot>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <detail-log />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import DetailLog from "src/components/areas/_shared/log/PreviewLog.vue";
  import CustomLink from "src/components/shared/buttons/CustomLink.vue";

  const props = defineProps({
    model: Object,
    formStore: Object,
  });
</script>
