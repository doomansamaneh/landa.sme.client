<template>
  <q-card bordered>
    <q-card-section class="q-gutter-md">
      <div v-if="model?.voucherId" class="row items-center">
        <span class="col-2 text-caption text-bold">
          {{ $t("shared.labels.accountingDocument") }}:
        </span>
        <span class="text-body3 q-mx-md">
          <custom-link
            :to="`/acc/voucher/preview/${model?.voucherId}`"
            :title="model?.voucherNo"
          />
        </span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section v-if="model?.id">
      <preview-log
        :entity-id="model.id"
        entity-name="Inv.[Reposition]"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import PreviewLog from "src/components/areas/_shared/log/PreviewLog.vue";
  import CustomLink from "src/components/shared/buttons/CustomLink.vue";

  const props = defineProps({
    model: Object,
  });
</script>
