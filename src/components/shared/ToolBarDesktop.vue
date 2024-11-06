<template>
  <div :style="toolbarMargin">
    <q-page-sticky
      class="bg-main z-1"
      :style="inside"
      position="top"
      expand
      :class="isAtTop || inside ? '' : 'toolbar-glass-effect_'"
    >
      <q-toolbar
        :style="[
          inside ? '' : 'margin-top: 10px; margin-bottom: 10px;',
          xPadding,
        ]"
      >
        <template v-if="buttons">
          <div v-if="title && !inside">
            <slot name="header">
              <span
                class="text-weight-700"
                :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'"
              >
                <slot name="header-title">
                  <back-button v-if="backButton" class="q-mr-sm" />

                  <span
                    @mouseover="showItemsNumebr"
                    @mouseout="hideItemsNumebr"
                    class="no-letter-spacing"
                  >
                    {{ title }}
                  </span>
                  <q-btn
                    v-if="tableStore?.pagination.value.totalItems > 0 && itemsNumber"
                    rounded
                    unelevated
                    dense
                    padding="0px 10px"
                    outline
                    :label="tableStore?.pagination.value.totalItems"
                    class="q-ml-sm bg-dark text-on-dark text-body2 no-pointer-events"
                  />
                </slot>
              </span>
            </slot>
          </div>
        </template>

        <template v-else>
          <slot name="header">
            <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'">
              <slot name="header-title">
                <span class="text-weight-700 no-letter-spacing">
                  {{ title }}
                </span>
                <q-btn
                  v-if="tableStore?.pagination.value.totalItems > 0"
                  rounded
                  unelevated
                  dense
                  padding="0px 10px"
                  outline
                  :label="tableStore?.pagination.value.totalItems"
                  class="q-ml-sm bg-dark text-on-dark text-body2 no-pointer-events"
                />
              </slot>
            </span>
            <q-space></q-space>
            <back-button v-if="backButton" class="q-ml-md" />
          </slot>
        </template>

        <div v-if="buttons" class="q-space" />

        <div v-if="buttons" class="row items-center q-gutter-sm">
          <slot name="buttons">
            <slot name="buttons-create">
              <menu-button-add
                class="primary-gradient primary-shadow text-white"
                :to="`/${baseRoute}/create`"
              />
            </slot>

            <template v-if="tableStore?.activeRow?.value != null">
              <slot
                name="bootons-edit"
                :row="tableStore?.activeRow?.value"
              >
                <menu-button-edit
                  :to="`/${baseRoute}/edit/${tableStore?.activeRow?.value.id}`"
                />
              </slot>
            </template>

            <template v-if="selectedIds?.length > 0">
              <slot name="buttons-batch-action"></slot>
              <slot name="buttons-delete-batch">
                <menu-button-delete
                  @click="
                    localCrudStore.deleteBatch(
                      selectedIds,
                      tableStore?.reloadData
                    )
                  "
                  :badge-count="selectedIds?.length"
                />
              </slot>
            </template>

            <template
              v-else-if="tableStore?.activeRow?.value != null"
            >
              <slot name="bootons-delete">
                <menu-button-delete
                  @click="
                    localCrudStore.deleteById(
                      tableStore.activeRow.value.id,
                      tableStore?.reloadData
                    )
                  "
                />
              </slot>
            </template>

            <q-btn
              padding="6px 12px"
              class="text-body2 no-letter-spacing"
              rounded
              unelevated
            >
              <q-icon size="20px" name="more_horiz" class="q-mr-sm" />
              {{ $t("shared.labels.more") }}

              <q-menu class="border-radius-lg" cover>
                <q-list dense padding style="width: 250px">
                  <menu-item
                    icon="o_refresh"
                    :title="$t('shared.labels.refresh')"
                    @click="tableStore?.reloadData"
                  />

                  <template
                    v-if="activation && selectedIds?.length > 0"
                  >
                    <q-separator class="q-my-sm" />

                    <menu-item
                      icon="o_check"
                      :title="$t('shared.labels.activate')"
                      @click="
                        localCrudStore.activate(
                          selectedIds,
                          tableStore?.reloadData
                        )
                      "
                    />

                    <menu-item
                      icon="o_check"
                      :title="$t('shared.labels.deactivate')"
                      @click="
                        localCrudStore.deactivate(
                          selectedIds,
                          tableStore?.reloadData
                        )
                      "
                    />
                  </template>

                  <slot
                    name="buttons-custom"
                    :row="tableStore?.activeRow?.value"
                  />

                  <q-separator class="q-my-sm" />

                  <menu-item
                    icon="o_download"
                    :title="$t('shared.labels.eportToExcel')"
                    @click="tableStore.exportAll()"
                  />

                  <menu-item
                    icon="o_download"
                    :title="
                      $t('shared.labels.exportExcelCurrentPage')
                    "
                    @click="tableStore.exportCurrentPage()"
                  />
                </q-list>
              </q-menu>
            </q-btn>
          </slot>
        </div>
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useQuasar } from "quasar";

  import { useDataTable } from "src/composables/useDataTable";
  import { useFormActions } from "src/composables/useFormActions";

  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import MenuButtonAdd from "./buttons/MenuButtonAdd.vue";
  import MenuButtonEdit from "./buttons/MenuButtonEdit.vue";
  import MenuButtonDelete from "./buttons/MenuButtonDelete.vue";
  import MenuItem from "./buttons/MenuItem.vue";

  const $q = useQuasar();

  const isAtTop = ref(true);
  const itemsNumber = ref(false);

  const props = defineProps({
    title: String,
    baseRoute: String,
    tableStore: useDataTable,
    crudStore: Object,
    activation: Boolean,
    backButton: Boolean,
    buttons: Boolean,
    inside: Boolean,
    margin: Boolean,
  });

  const selectedIds = computed(() =>
    props.tableStore?.selectedRows?.value.map((item) => item.id)
  );

  const _crudStore = useFormActions(props.baseRoute);
  const localCrudStore = computed(
    () => props.crudStore ?? _crudStore
  );

  const toolbarMargin = computed(() => {
    const baseMargin = $q.screen.lt.md
      ? "margin-bottom: 56px;"
      : "margin-bottom: 34px;";
    const margin = $q.screen.lt.sm ? "margin-bottom: 34px;" : "";
    return props.margin ? baseMargin : margin;
  });

  const xPadding = computed(() => {
    return props.inside
      ? "padding: 0 0 16px 0"
      : $q.screen.gt.sm
      ? "padding-left: 38px; padding-right: 38px;"
      : "padding-left: 20px; padding-right: 20px;";
  });

  const inside = computed(() => {
    if (props.inside) {
      return "background: transparent; transform: 0px; z-index: 0; right: 0; position: relative;";
    } else {
      return "";
    }
  });

  const handleScroll = () => {
    const currentPosition =
      window.scrollY || document.documentElement.scrollTop;
    isAtTop.value = currentPosition === 0;
  };

  const showItemsNumebr = () => {
    itemsNumber.value = true;
  };

  const hideItemsNumebr = () => {
    itemsNumber.value = false;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>
