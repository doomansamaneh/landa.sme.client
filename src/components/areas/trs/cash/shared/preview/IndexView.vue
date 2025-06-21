<template>
  <toolbar-container
    v-if="model"
    :inside="inside"
    :title="title"
    :model="model"
    back-button
  />

  <q-card flat class="bordered shadow overflow-hidden">
    <card-title :title="title" />

    <div :ref="printStore.printRef" v-if="model">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-px-none">
        <account-item
          flat
          :columns="accountItemDLColumns"
          :filter-expression="filterExpression"
          :title="title"
          :sub-title="model.slTitle"
        />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";

  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import HeaderSection from "./HeaderSection.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "trs/cash";
  const crudStore = useFormActions(baseRoute, model);
  const printStore = usePrint();
  const filterExpression = computed(() => [
    {
      fieldName: "vi.dlId",
      operator: sqlOperator.equal,
      value: model?.value.dlId,
    },
  ]);

  const route = useRoute();
  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
