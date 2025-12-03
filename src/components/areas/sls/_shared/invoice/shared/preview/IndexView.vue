<template>
  <template v-if="model?.id">
    <slot name="toolbar-container" :model="model"></slot>
  </template>

  <mobile
    v-if="$q.screen.xs"
    class="q-mb-sm"
    :model="model"
    :detail-url="detailUrl"
    :show-sale-header="showSaleHeader"
    :tax-api="taxApi"
    :show-receipt="showReceipt"
    :comment="comment"
  >
    <template #master-section>
      <slot name="master-section" :model="model"></slot>
    </template>

    <template #detail-section>
      <div class="q-mt-md">
        <slot name="detail-section" :model="model">
          <detail-section
            :model="model"
            :tax-api="taxApi"
            :detail-url="detailUrl"
            :show-receipt="showReceipt"
          />
        </slot>
      </div>
    </template>
  </mobile>

  <desktop
    v-else
    :title="title"
    :model="model"
    :show-sale-header="showSaleHeader"
    :tax-api="taxApi"
    :detail-url="detailUrl"
    :show-receipt="showReceipt"
    :comment="comment"
  >
    <template #master-section>
      <slot name="master-section" :model="model"></slot>
    </template>

    <template #detail-section>
      <slot name="detail-section" :model="model">
        <detail-section
          :model="model"
          :tax-api="taxApi"
          :detail-url="detailUrl"
          :show-receipt="showReceipt"
        />
      </slot>
    </template>
  </desktop>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import Mobile from "../../mobile/preview/IndexView.vue";
  import Desktop from "../../desktop/preview/IndexView.vue";
  import DetailSection from "./_DetailSection.vue";

  const props = defineProps({
    item: Object,
    id: String,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
    detailUrl: String,
    showSaleHeader: Boolean,
    showReceipt: Boolean,
    taxApi: Boolean,
    entityName: { type: String, default: "Doc.[Document]" },
    comment: String,
  });

  const route = useRoute();
  const id = computed(
    () => props.item?.id ?? props.id ?? route.params.id
  );
  const model = ref({});
  const crudStore = useFormActions(props.baseRoute, model, true);

  function calculateTotal() {
    const totalPrice = helper.getSubtotal(
      model.value.invoiceItems,
      "totalPrice"
    );
    const totalDiscount = helper.getSubtotal(
      model.value.invoiceItems,
      "discount"
    );
    const totalVat = helper.getSubtotal(
      model.value.invoiceItems,
      "vatAmount"
    );

    model.value.totalPrice = totalPrice;
    model.value.totalDiscount = totalDiscount;
    model.value.totalVat = totalVat;
    model.value.totalNetPrice = totalPrice
      .plus(totalDiscount)
      .minus(totalVat);
  }

  onMounted(async () => {
    await crudStore.getPreviewById(id.value);
    calculateTotal();
  });

  defineExpose({ model });
</script>
