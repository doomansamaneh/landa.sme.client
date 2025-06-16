<template>
  <toolbar-container
    v-if="model"
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
    :model="model"
    :crud-store="crudStore"
  />

  <mobile
    v-if="$q.screen.xs"
    :title="title"
    :model="model"
    :base-route="baseRoute"
    :type="documentType.receipt"
  />
  <desktop
    v-else
    :title="title"
    :model="model"
    :base-route="baseRoute"
    :type="documentType.receipt"
  />
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";
  import { documentType } from "src/constants";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import Mobile from "src/components/areas/trs/receipt/mobile/preview/IndexView.vue";
  import Desktop from "src/components/areas/trs/receipt/desktop/preview/IndexView.vue";

  const props = defineProps({
    item: Object,
    voucherId: String,
    voucherItemId: String,
    title: String,
    inside: Boolean,
    baseRoute: { type: String, default: "trs/receipt" },
  });

  const route = useRoute();
  const model = ref(null);

  const crudStore = useFormActions(props.baseRoute, model);

  const id = computed(
    () => props.item?.id ?? props.voucherId ?? route.params.id
  );

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
