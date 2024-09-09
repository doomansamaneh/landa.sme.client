<template>
  <q-card bordered>
    <q-card-section class="q-gutter-md">
      <div class="q-gutter-sm">
        <span class="text-caption">ش پیگیری:</span>
        <span class="text-weight-700">{{ model?.rowNo }}</span>
      </div>
      <div v-if="model?.voucherId" class="row items-center">
        <span class="col-2 text-caption text-bold">
          سند حسابداری:
        </span>
        <span class="text-body3 q-mx-md">
          <custom-link
            :to="`/acc/voucher/preview/${model.voucherId}`"
            :title="model.voucherNo"
          />
        </span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section v-if="model?.id">
      <preview-log
        :entity-id="model.id"
        entity-name="Inv.[Production]"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import CustomLink from "src/components/shared/buttons/CustomLink.vue";
  import PreviewLog from "src/components/areas/_shared/log/PreviewLog.vue";

  const props = defineProps({
    model: Object,
  });
</script>
