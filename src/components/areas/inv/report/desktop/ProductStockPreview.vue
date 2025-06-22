<template>
  <!-- <tool-bar :inside="inside" buttons>
    <template #buttons>
      <q-btn
        class="primary-gradient primary-shadow text-white text-body2"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
        @click="modifyStock"
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        اصلاح موجودی
      </q-btn>

      <q-btn padding="6px 12px" class="text-body2" rounded unelevated>
        <q-icon size="20px" name="more_horiz" class="q-mr-xs" />
        {{ $t("shared.labels.more") }}

        <q-menu class="border-radius-lg" fit :offset="[0, 10]">
          <q-list>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="exportAll()"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_download" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2">
                  {{ $t("shared.labels.eportToExcel") }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar> -->
  <preview :item="item" :title="title" ref="dataGrid" v-if="item" />
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useDialog } from "src/composables/useDialog";
  import { useDataTableExport } from "src/composables/useDataTableExport";

  // import ToolBar from "src/components/shared/toolbars/ToolBarDesktop.vue";
  import Preview from "./_ProductStockPreview.vue";
  import ModifyStockForm from "src/components/areas/inv/modifyStock/shared/forms/ModifyStockForm.vue";

  const props = defineProps({
    inside: Boolean,
    item: Object,
    title: String,
  });

  const dialogSore = useDialog();
  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  const modifyStock = () => {
    dialogSore.openDialog({
      title: "main-menu-items.Inv_ModifyStock_View",
      component: ModifyStockForm,
      props: { id: props.item.id },
      actionBar: true,
      okCallback: async (response) => {
        await tableStore.value.reloadData();
      },
    });
  };

  const { exportAll } = useDataTableExport(tableStore.value);
</script>
