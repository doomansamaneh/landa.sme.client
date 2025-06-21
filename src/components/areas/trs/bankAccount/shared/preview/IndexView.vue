<template>
  <toolbar-container
    v-if="model"
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
    :model="model"
    :crud-store="crudStore"
  />

  <q-card flat class="bordered shadow overflow-hidden">
    <card-title :title="title" />

    <div v-if="model" :ref="printStore.printRef">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-px-none">
        <account-item
          flat
          :columns="accountItemColumns"
          :filter-expression="filterExpression"
          :title="model.bankTitle"
          :sub-title="model.bankBranchTitle"
        />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { sqlOperator } from "src/constants";
  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemColumns } from "src/components/areas/acc/_composables/constants";

  import CardTitle from "src/components/shared/CardTitle.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import HeaderSection from "./HeaderSection.vue";
  import ToolbarContainer from "./ToolbarContainer.vue";

  const props = defineProps({
    item: Object,
    voucherId: String,
    voucherItemId: String,
    title: String,
    inside: Boolean,
    baseRoute: { type: String, default: "trs/bankAccount" },
  });

  const route = useRoute();
  const model = ref(null);
  const printStore = usePrint();

  const filterExpression = computed(() => [
    {
      fieldName: "vi.dlId",
      operator: sqlOperator.equal,
      value: model?.value.dlId,
    },
  ]);

  const crudStore = useFormActions(props.baseRoute, model);

  const id = computed(
    () => props.item?.id ?? props.voucherId ?? route.params.id
  );

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
