<template>
  <tool-bar :inside="inside" buttons>
    <template #buttons>
      <q-btn
        :to="`/sls/invoice/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        اصلاح موجودی
      </q-btn>

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
  <preview :item="item" ref="dataGrid" v-if="item" />
</template>

<script setup>
  import { ref, computed } from "vue";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import Preview from "./_ProductStockPreview.vue";

  const props = defineProps({
    inside: Boolean,
    item: Object,
  });

  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid?.value?.tableStore);
</script>
