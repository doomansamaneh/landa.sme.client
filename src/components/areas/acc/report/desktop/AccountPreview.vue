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

  <q-card flat class="bordered shadow overflow-hidden">
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <custom-tab
          behavior="heading"
          title="گردش حساب"
          icon="o_repeat"
        />
      </div>
    </div>

    <q-separator size="1px" />

    <q-card-section>
      <div class="row q-mb-sm">
        <span class="col-1">کد:</span>
        <span class="text-body1 q-mx-md">
          {{ item?.code }}
        </span>
      </div>

      <div class="row q-mb-sm">
        <span class="col-1">عنوان:</span>
        <span class="text-body1 q-mx-md">
          {{ item?.title }}
        </span>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-px-none">
      <account-item
        flat
        ref="dataGrid"
        :filter-expression="filterExpersion"
        :columns="accountItemDLColumns"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import { sqlOperator } from "src/constants";
  import { accountItemDLColumns } from "../../_composables/constants";

  import AccountItem from "./AccountItem.vue";
  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import CustomTab from "src/components/shared/CustomTab.vue";

  const props = defineProps({
    inside: Boolean,
    item: Object,
  });

  const route = useRoute();
  const dataGrid = ref(null);

  const filterExpersion = computed(() => {
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

  const tableStore = computed(() => dataGrid?.value?.tableStore);
</script>
