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
    <card-title title="گردش حساب" icon="o_repeat" />

    <q-separator size="1px" />

    <div v-if="model">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>

      <q-separator size="1px" />

      <account-item
        flat
        :columns="accountItemSLColumns"
        :filter-expression="filterExpression"
      />

      <q-separator />
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";

  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemSLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";

  import HeaderSection from "./_HeaderSection.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import ToolbarContainer from "./ToolbarContainer.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "acc/accountSL";
  const crudStore = useFormActions(baseRoute, model);

  const filterExpression = computed(() => [
    {
      fieldName: "vi.slId",
      operator: sqlOperator.equal,
      value: model?.value.id,
    },
  ]);

  const route = useRoute();
  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
