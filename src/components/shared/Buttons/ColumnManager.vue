<template>
  <div class="flex items-center">
    <q-btn no-caps size="11px" round unelevated>
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
            <!--           <q-item clickable v-close-popup @click="showAllColumns">
            <q-item-section avatar>
              <q-icon :name="isShowingAll ? 'visibility_off' : 'visibility'" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ isShowingAll ? $t("shared.labels.showDefault") : $t("shared.labels.showAll") }}
              </q-item-label>
            </q-item-section>
          </q-item>
            <q-separator /> -->
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

            <!-- <q-item clickable v-close-popup @click="hideAllColumns">
            <q-item-section avatar>
              <q-icon name="visibility_off" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ $t("shared.labels.hideAll") }}
              </q-item-label>
            </q-item-section>
          </q-item> -->
          </q-scroll-area>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
  import { computed, ref, onMounted } from "vue";
  import { helper } from "src/helpers";

  const props = defineProps({
    tableStore: Object,
  });

  const allColumns = computed(() => {
    return props.tableStore?.columns?.value || [];
  });

  // Track original column visibility state
  const originalColumnStates = ref({});
  const isShowingAll = ref(false);

  // Initialize original states when component mounts
  const initializeOriginalStates = () => {
    if (props.tableStore?.columns?.value) {
      props.tableStore.columns.value.forEach((column) => {
        if (!(column.name in originalColumnStates.value)) {
          originalColumnStates.value[column.name] = column.hidden;
        }
      });
    }
  };

  onMounted(() => {
    initializeOriginalStates();
  });

  const toggleColumnVisibility = (column) => {
    if (column && props.tableStore) {
      column.hidden = !column.hidden;
      // Trigger reactivity update
      props.tableStore.columns.value = [
        ...props.tableStore.columns.value,
      ];
    }
  };

  const showAllColumns = () => {
    if (props.tableStore?.columns?.value) {
      if (isShowingAll.value) {
        // Return to original state
        props.tableStore.columns.value.forEach((column) => {
          column.hidden =
            originalColumnStates.value[column.name] || false;
        });
        isShowingAll.value = false;
      } else {
        // Show all columns
        props.tableStore.columns.value.forEach((column) => {
          column.hidden = false;
        });
        isShowingAll.value = true;
      }
      // Trigger reactivity update
      props.tableStore.columns.value = [
        ...props.tableStore.columns.value,
      ];
    }
  };

  const hideAllColumns = () => {
    if (props.tableStore?.columns?.value) {
      props.tableStore.columns.value.forEach((column) => {
        column.hidden = true;
      });
      isShowingAll.value = false;
      // Trigger reactivity update
      props.tableStore.columns.value = [
        ...props.tableStore.columns.value,
      ];
    }
  };
</script>
