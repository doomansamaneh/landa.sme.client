<template>
  <tool-bar
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
    :model="model"
  >
    <template #toolbar-custom>
      <slot name="toolbar-custom" :model="model"></slot>
    </template>
  </tool-bar>

  <mobile v-if="$q.screen.xs" :model="model" />
  <desktop v-else :model="model" />
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";
  import { useVoucherState } from "../../../_composables/useVoucherState";

  import ToolBar from "./ToolBar.vue";
  import Mobile from "src/components/areas/acc/voucher/mobile/preview/IndexView.vue";
  import Desktop from "src/components/areas/acc/voucher/desktop/preview/IndexView.vue";

  const props = defineProps({
    item: Object,
    voucherId: String,
    voucherItemId: String,
    title: String,
    inside: Boolean,
  });

  const baseRoute = "acc/voucher";
  const model = ref(null);
  const crudStore = useFormActions(baseRoute, model);
  const voucherStore = useVoucherState();

  const route = useRoute();
  const router = useRouter();

  const id = computed(
    () => props.item?.id ?? props.voucherId ?? route.params.id
  );

  function deleteCallBack() {
    voucherStore.state.firstLoad.value = false;
    router.back();
  }

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
