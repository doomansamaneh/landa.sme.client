<template>
  <tool-bar
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
    :model="model"
  />

  <mobile v-if="$q.screen.xs" class="q-mb-sm" :model="model" />
  <desktop v-else :title="title" :model="model" />
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "./ToolBar.vue";
  import Mobile from "../../mobile/preview/IndexView.vue";
  import Desktop from "../../desktop/preview/IndexView.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
    detailUrl: String,
  });

  const route = useRoute();
  const id = computed(() => props.item?.id ?? route.params.id);
  const model = ref({});
  const crudStore = useFormActions(props.baseRoute, model);

  onMounted(async () => {
    await crudStore.getPreviewById(id.value);
    model.value.entityName = "Doc.[Document]";
    model.value.totalPrice = helper.getSubtotal(
      model.value.invoiceItems,
      "totalPrice"
    );
    model.value.totalDiscount = helper.getSubtotal(
      model.value.invoiceItems,
      "discount"
    );
    model.value.totalVat = helper.getSubtotal(
      model.value.invoiceItems,
      "vatAmount"
    );
    model.value.totalNetPrice =
      model.value.totalPrice +
      model.value.totalDiscount -
      model.value.totalVat;
  });
</script>
