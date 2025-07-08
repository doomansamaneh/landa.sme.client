<template>
  <data-grid
    :data-table-store="tableStore"
    :create-url="createUrl"
    :base-route="baseRoute"
    :preview-page="previewPage"
    show-avatar
  >
    <template #row-avatar="{ item }">
      <div v-if="notActive">
        <q-avatar
          :key="item.selected"
          size="36px"
          text-color="white"
          :class="item.selected ? 'primary-gradient' : status(item)"
          @click.prevent.stop="setActiveRow(item)"
        >
          <span v-if="!item.selected" class="text-body2 text-on-dark">
            {{ getItemIndex(item) + 1 }}
          </span>
          <transition appear name="slide-fade">
            <q-icon v-if="item.selected" size="24px" name="check" />
          </transition>
        </q-avatar>
      </div>
      <div v-else class="col-auto q-mr-sm">
        <transition name="slide" appear mode="out-in">
          <q-avatar
            :key="item.selected"
            size="36px"
            text-color="white"
            :class="item.selected ? 'primary-gradient' : status(item)"
            @click.prevent.stop="setActiveRow(item)"
          >
            <q-icon
              v-if="!item.selected"
              :name="item.isActive ? 'o_done' : 'o_close'"
              round
              dense
              size="24px"
              unelevated
              text-color="white"
            />
            <transition appear name="slide-fade">
              <q-icon v-if="item.selected" size="24px" name="check" />
            </transition>
          </q-avatar>
        </transition>
      </div>
    </template>

    <template #row-body="{ item }">
      <div v-for="col in tableStore.columns?.value" :key="col.name">
        <span
          v-if="col.field && col.label && col.name !== 'isActive'"
          class="q-px-sm"
        >
          {{ col.label }}:
          {{ formatValue(col, item[col.field]) }}
        </span>
      </div>
    </template>

    <template #row-toolbar="{ item }">
      <slot name="row-toolbar" :item="item">
        <mobile-row-toolbar
          :title="`${item[tableStore.columns?.value[0]?.field]}`"
          :menu-items="getItemMenu(item)"
        />
      </slot>
    </template>
  </data-grid>
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { dataType } from "src/constants/enums";
  import { helper } from "src/helpers/helper";

  import { usePreviewMenuContext } from "../../../menus/usePreviewMenuContext";
  import { useBaseInfoPreviewMenu } from "../../../_menus/useBaseInfoPreviewMenu";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";

  const router = useRouter();

  const props = defineProps({
    tableStore: Object,
    crudStore: Object,
    dataSource: String,
    baseRoute: String,
    createUrl: String,
    notActive: Boolean,
    previewPage: {
      type: Boolean,
      default: false,
    },
  });

  const formatValue = (col, value) => {
    if (col.type === dataType.number) {
      return helper.formatNumber(value ?? 0);
    }
    return value;
  };

  function getItemMenu(item) {
    const context = usePreviewMenuContext(item, props.baseRoute, {
      onDeleteSuccess: async () =>
        await props.tableStore?.reloadData(),
    });
    return useBaseInfoPreviewMenu(context.value);
  }

  const status = (item) => {
    if (props.notActive) return "bg-on-dark";
    return item?.isActive ? "green-gradient" : "red-gradient";
  };

  function setActiveRow(item) {
    if (props.tableStore.selectedRows?.value?.length > 0) {
      props.tableStore.selectRow(item, !item.selected);
    } else {
      const isSame = props.tableStore.activeRow?.value === item;
      props.tableStore.setActiveRow(isSame ? null : item);
    }
  }

  function getItemIndex(item) {
    return props.tableStore.rows.value.findIndex(
      (row) => row === item
    );
  }
</script>
