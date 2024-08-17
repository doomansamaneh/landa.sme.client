<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      v-if="toolbar"
      :table-store="mobileGrid?.tableStore"
      :title="$t('main-menu-items.Acc_Report_Journal')"
      buttons
      margin
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
    </toolbar-mobile>

    <mobile
      :grid-store="gridStore"
      :crud-store="crudStore"
      :title="title"
      data-source="sls/report/getProductStock"
      ref="mobileGrid"
    />
  </template>

  <template v-else>
    <!-- v-if="toolbar" -->
    <toolbar-desktop
      :table-store="desktopGrid?.tableStore"
      :title_="title"
      :base-route="baseRoute"
      buttons
      margin
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
    </toolbar-desktop>

    <desktop
      :grid-store="gridStore"
      :title="title"
      :data-source="dataSource"
      ref="desktopGrid"
    />
  </template>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { userJournalBookState } from "src/components/areas/acc/_composables/userJournalBookState";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "components/shared/ToolBarMobile.vue";
  import Desktop from "../desktop/JournalBook.vue";

  const props = defineProps({ title: String });

  const $q = useQuasar();
  const desktopGrid = ref(null);
  const mobileGrid = ref(null);

  const dataSource = "acc/report/getJournalData";
  const accountStore = userJournalBookState();
  const gridStore = useBaseInfoGrid(accountStore);
</script>
