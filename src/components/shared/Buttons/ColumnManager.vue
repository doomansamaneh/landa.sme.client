<template>
  <div class="flex items-center">
    <q-btn
      :disable="tableStore?.showLoader?.value"
      no-caps
      size="11px"
      round
      unelevated
    >
      <q-icon size="24px" name="o_settings" />
      <q-menu>
        <q-list style="min-width: 300px">
          <div class="flex items-center justify-between q-pa-sm">
            <q-item-label class="text-weight-bold">
              {{ $t("shared.labels.columnVisibility") }}
            </q-item-label>

            <q-btn
              no-caps
              size="11px"
              rounded
              unelevated
              @click="showAllColumns"
              class="bordered"
            >
              <q-icon
                class="q-mr-sm"
                :name="
                  isShowingAll ? 'o_visibility_off' : 'o_visibility'
                "
              />
              <q-item-label class="text-body2">
                {{
                  isShowingAll
                    ? $t("shared.labels.default")
                    : $t("shared.labels.showAll")
                }}
              </q-item-label>
            </q-btn>
          </div>

          <q-separator />
          <q-scroll-area
            :bar-style="helper.barStyle"
            :thumb-style="helper.thumbStyle"
            style="height: 300px"
          >
            <q-item
              v-for="column in allColumns"
              :key="column.name"
              clickable
              v-close-popup
              class="q-pa-none"
              @click="toggleColumnVisibility(column)"
            >
              <q-item-section avatar>
                <q-checkbox
                  :model-value="!column.hidden"
                  @update:model-value="toggleColumnVisibility(column)"
                  @click.stop
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{
                    column.label
                      ? $t(`shared.columns.${column.label}`)
                      : column.name
                  }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-scroll-area>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
  import { computed, ref, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { useColumnSettings } from "src/composables/useColumnSettings";

  const props = defineProps({
    tableStore: Object,
    pageName: {
      type: String,
      required: true,
      default: "defaultPage",
    },
    widgetName: {
      type: String,
      required: true,
      default: "defaultWidget",
    },
    tableId: {
      type: String,
      required: false,
      default: null,
    },
  });

  const {
    getColumnVisibility,
    saveColumnVisibility,
    getOriginalStates,
    saveOriginalStates,
  } = useColumnSettings(
    props.pageName,
    props.widgetName,
    props.tableId,
    props.tableStore,
  );

  const allColumns = computed(() => {
    return props.tableStore?.columns?.value || [];
  });

  const originalColumnStates = ref({});
  const isShowingAll = ref(false);

  const initializeOriginalStates = () => {
    if (props.tableStore?.columns?.value) {
      const savedOriginalStates = getOriginalStates();

      props.tableStore.columns.value.forEach((column) => {
        if (!(column.name in originalColumnStates.value)) {
          originalColumnStates.value[column.name] =
            savedOriginalStates[column.name] !== undefined
              ? savedOriginalStates[column.name]
              : column.hidden;
        }
      });

      saveOriginalStates(originalColumnStates.value);
    }
  };

  const loadColumnVisibility = () => {
    if (props.tableStore?.columns?.value) {
      const savedVisibility = getColumnVisibility();

      props.tableStore.columns.value.forEach((column) => {
        if (savedVisibility[column.name] !== undefined) {
          column.hidden = savedVisibility[column.name];
        }
      });

      props.tableStore.columns.value = [
        ...props.tableStore.columns.value,
      ];
    }
  };

  const saveCurrentColumnVisibility = () => {
    if (props.tableStore?.columns?.value) {
      const visibilitySettings = {};
      props.tableStore.columns.value.forEach((column) => {
        visibilitySettings[column.name] = column.hidden;
      });
      saveColumnVisibility(visibilitySettings);
    }
  };

  onMounted(() => {
    initializeOriginalStates();
    loadColumnVisibility();
  });

  const toggleColumnVisibility = (column) => {
    if (column && props.tableStore) {
      column.hidden = !column.hidden;
      props.tableStore.columns.value = [
        ...props.tableStore.columns.value,
      ];
      saveCurrentColumnVisibility();
    }
  };

  const showAllColumns = () => {
    if (props.tableStore?.columns?.value) {
      if (isShowingAll.value) {
        props.tableStore.columns.value.forEach((column) => {
          column.hidden =
            originalColumnStates.value[column.name] || false;
        });
        isShowingAll.value = false;
      } else {
        props.tableStore.columns.value.forEach((column) => {
          column.hidden = false;
        });
        isShowingAll.value = true;
      }
      props.tableStore.columns.value = [
        ...props.tableStore.columns.value,
      ];
      saveCurrentColumnVisibility();
    }
  };
</script>
