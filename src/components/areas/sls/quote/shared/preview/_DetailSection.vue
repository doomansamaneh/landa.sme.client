<template>
  <q-card class="bordered" style="margin-top: 0">
    <q-card-section>
      <slot name="header">
        <div class="column q-gutter-y-sm">
          <div class="row items-center">
            <span class="col-2 text-caption text-bold">شماره:</span>
            <span class="text-body3 q-mx-md">
              {{ model.no }}
            </span>
          </div>

          <div class="row items-center">
            <span class="col-2 text-caption text-bold">مشتری:</span>
            <span class="text-body3 q-mx-md">
              <custom-link
                :to="`/crm/customer/preview/${model.customerId}`"
                :title="model.customerName"
              />
            </span>
          </div>

          <div v-if="model.invoiceId" class="row items-center">
            <span class="col-2 text-caption text-bold">فاکتور:</span>
            <span class="text-body3 q-mx-md">
              <custom-link
                :to="`/sls/invoice/preview/${model.invoiceId}`"
                :title="model.invoiceNo"
              />
            </span>
          </div>

          <div v-if="model.marketerName" class="row items-center">
            <span class="col-2 text-caption text-bold">
              بازاریاب:
            </span>
            <span class="text-body3 q-mx-md">
              {{ model.marketerName }}
            </span>
          </div>

          <div v-if="model.contractTitle" class="row items-center">
            <span class="col-2 text-caption text-bold">قرارداد:</span>
            <span class="text-body3 q-mx-md">
              {{ model.contractTitle }}
            </span>
          </div>

          <div v-if="model.inventoryTitle" class="row items-center">
            <span class="col-2 text-caption text-bold">انبار:</span>
            <span class="text-body3 q-mx-md">
              {{ model.inventoryTitle }}
            </span>
          </div>
        </div>
      </slot>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <detail-log
        v-if="model.id"
        :entity-id="model.id"
        entity-name="Sls.[Quote]"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import DetailLog from "src/components/areas/_shared/log/PreviewLog.vue";
  import CustomLink from "src/components/shared/buttons/CustomLink.vue";

  const props = defineProps({
    model: Object,
  });
</script>
