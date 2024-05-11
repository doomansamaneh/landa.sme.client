<template>
  <tool-bar
    :inside="inside"
    buttons
    :title="`${item.title} - ${item.code}`"
  >
    <template #buttons>
      <q-btn
        padding="6px 12px"
        class="text-body2 no-letter-spacing"
        rounded
        unelevated
      >
        <q-icon size="20px" name="more_horiz" class="q-mr-xs" />
        {{ $t("shared.labels.more") }}

        <q-menu class="border-radius-lg" fit :offset="[0, 10]">
          <q-list>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="tableStore.exportAll()"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_download" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 no-letter-spacing">
                  {{ $t("shared.labels.eportToExcel") }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar>

  <customer-account-item
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
  ></customer-account-item>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import { sqlOperator } from "src/constants";
  import { useCustomerAccountItemGrid } from "src/components/areas/acc/_composables/useCustomerAccountItemGrid";

  import CustomerAccountItem from "./CustomerAccountItem.vue";
  import ToolBar from "src/components/shared/ToolBarDesktop.vue";

  const props = defineProps({
    inside: Boolean,
    item: Object,
  });

  const route = useRoute();
  const dataGrid = ref(null);
  const filterExpersions = computed(() => {
    const dlId = route.params.dlId;
    const itemId = props.item?.id ?? dlId;
    if (itemId) {
      return [
        {
          fieldName: "vi.dlId",
          operator: sqlOperator.equal,
          value: itemId,
        },
      ];
    }

    return null;
  });
  const dataSource = "acc/report/getItemData";
  const gridStore = useCustomerAccountItemGrid(
    filterExpersions?.value
  );

  const tableStore = computed(() => dataGrid?.value?.tableStore);
</script>
