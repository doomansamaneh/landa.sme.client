<template>
  <q-card
    class="q-mb-md bordered"
    v-if="formStore.model.value.voucherItems.length === 0"
  >
    <q-card-section>
      <no-item-selected />
    </q-card-section>
  </q-card>

  <q-card
    v-for="(row, index) in formStore.model.value.voucherItems"
    :key="index"
    class="bordered q-mb-md"
  >
    <div class="q-pa-lg">
      <div class="row items-center q-mb-md">
        <div class="col-4">
          <span class="text-caption text-on-dark">
            {{ $t("shared.columns.slTitle") }}
          </span>
        </div>
        <div class="col">
          <span class="text-body2">{{ row.slDisplay }}</span>
        </div>
      </div>

      <div class="row items-center q-mb-md">
        <div class="col-4">
          <span class="text-caption text-on-dark">
            {{ $t("shared.columns.dlTitle") }}
          </span>
        </div>
        <div class="col">
          <span class="text-body2">{{ row.dlDisplay }}</span>
        </div>
      </div>

      <div class="row items-center q-mb-md" v-if="row.comment">
        <div class="col-4">
          <span class="text-caption text-on-dark">
            {{ $t("shared.labels.comment") }}
          </span>
        </div>
        <div class="col">
          <span class="text-body2">{{ row.comment }}</span>
        </div>
      </div>

      <div class="row items-center q-mb-md">
        <div class="col-4">
          <span class="text-caption text-on-dark">
            {{ $t("shared.columns.debit") }}
          </span>
        </div>
        <div class="col">
          <span class="text-body2">
            {{ helper.formatNumber(row.debit) }}
          </span>
        </div>
      </div>

      <div class="row items-center">
        <div class="col-4">
          <span class="text-caption text-on-dark">
            {{ $t("shared.columns.credit") }}
          </span>
        </div>
        <div class="col">
          <span class="text-body2">
            {{ helper.formatNumber(row.credit) }}
          </span>
        </div>
      </div>
    </div>

    <q-separator size="1px" />

    <q-card-actions class="q-pa-md" align="between">
      <q-btn
        no-caps
        label="ویرایش"
        class="text-body2"
        flat
        rounded
        @click="editItem(index, row)"
      />
      <q-btn
        no-caps
        size="12px"
        color="red"
        unelevated
        round
        class="text-on-dark"
        icon="o_delete"
        @click="formStore.deleteRow(index)"
      />
    </q-card-actions>
  </q-card>

  <q-btn
    no-caps
    padding="4px 12px"
    unelevated
    rounded
    dense
    class="bg-primary primary-shadow text-white"
    @click="addNewItem()"
  >
    <q-icon size="20px" name="o_add" class="q-mr-xs" />
    <div class="">{{ $t("shared.labels.addRow") }}</div>
  </q-btn>

  <q-dialog
    v-model="showDialog"
    maximized
    transition-duration="600"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-scroll-area
        :thumb-style="helper.thumbStyle"
        :bar-style="helper.barStyle"
        style="height: calc(100vh - 10%)"
      >
        <q-card-section class="row items-center q-pb-none">
          <span class="text-bold text-body1">{{ dialogTitle }}</span>
          <q-space />
          <q-btn
            no-caps
            round
            unelevated
            text-color="white"
            class="red-gradient red-shadow"
            padding="5px"
            v-close-popup
          >
            <q-icon size="16px" name="o_close" />
          </q-btn>
        </q-card-section>

        <q-card-section>
          <div>
            <div class="row items-center q-mb-md">
              <div class="col">
                <sl-lookup
                  v-model:selectedId="selectedItem.slId"
                  v-model:selectedText="selectedItem.slDisplay"
                  :autofocus="true"
                  :label="$t('shared.columns.slTitle')"
                  required
                  clearable
                  @rowSelected="
                    slChanged($event, selectedItem, selectedIndex)
                  "
                />
              </div>
            </div>

            <div class="row items-center q-mb-md">
              <div class="col">
                <dl-lookup
                  ref="dl"
                  v-model:selectedId="selectedItem.dlId"
                  v-model:selectedText="selectedItem.dlDisplay"
                  :label="$t('shared.columns.dlTitle')"
                />
              </div>
            </div>

            <div class="row items-center q-mb-md">
              <div class="col">
                <custom-input
                  v-model="selectedItem.comment"
                  autogrow
                  :label="$t('shared.labels.comment')"
                  required
                />
              </div>
            </div>

            <div class="row items-center q-mb-md">
              <div class="col">
                <custom-input-number
                  v-model="selectedItem.debit"
                  :label="$t('shared.columns.debit')"
                  required
                />
              </div>
            </div>

            <div class="row items-center">
              <div class="col">
                <custom-input-number
                  v-model="selectedItem.credit"
                  :label="$t('shared.columns.credit')"
                  required
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-scroll-area>

      <q-card-actions class="absolute-bottom q-pa-md bg-main">
        <q-btn
          no-caps
          type="submit"
          @click="saveItem"
          color="primary"
          unelevated
          padding="8px 16px"
          rounded
          class="text-body2 primary-shadow"
          v-close-popup
        >
          <q-icon name="o_save" size="20px" class="q-mr-sm" />
          {{ $t("shared.labels.save") }}
        </q-btn>
        <q-btn
          no-caps
          flat
          @click="cancelEdit"
          padding="8px 16px"
          v-close-popup
          rounded
        >
          {{ $t("shared.labels.cancel") }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-card v-if="formStore.totalDebit.value > 0" class="q-mt-md">
    <q-card-section>
      <div class="row items-center q-mb-sm">
        <div class="col-4">
          <span class="text-caption text-on-dark">
            {{ $t("shared.columns.debit") }}:
          </span>
        </div>
        <div class="col">
          <b>{{ helper.formatNumber(formStore.totalDebit.value) }}</b>
        </div>
      </div>
      <div class="row items-center q-mb-sm">
        <div class="col-4">
          <span class="text-caption text-on-dark">
            {{ $t("shared.columns.credit") }}:
          </span>
        </div>
        <div class="col">
          <b>
            {{ helper.formatNumber(formStore.totalCredit.value) }}
          </b>
        </div>
      </div>
      <div class="row items-center">
        <div class="col-4">
          <span class="text-caption text-on-dark">
            {{ $t("shared.labels.difference") }}:
          </span>
        </div>
        <div class="col">
          <b>{{ helper.formatNumber(formStore.totalDif.value) }}</b>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { sqlOperator } from "src/constants";
  import { helper } from "src/helpers";
  import { useI18n } from "vue-i18n";

  import NoItemSelected from "src/components/shared/dataTables/NoItemSelected.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import DlLookup from "src/components/shared/lookups/AccountDLLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    formStore: Object,
  });

  const { t } = useI18n();

  const dl = ref(null);
  const showDialog = ref(false);
  const selectedItem = ref({});
  const selectedIndex = ref(-1);

  const dialogTitle = computed(() => {
    return selectedIndex.value === -1
      ? t("shared.labels.addRow")
      : t("shared.labels.editRow");
  });

  const slChanged = (sl, row, index) => {
    if (dl.value) {
      const dlFilters = getDlFilters(row);
      dl.value.lookup.tableStore.setFilterExpression(dlFilters);
    }
  };

  const getDlFilters = (row) => {
    return [
      {
        fieldName: "slId",
        operator: sqlOperator.equal,
        value: row.slId,
      },
    ];
  };

  const addNewItem = () => {
    selectedIndex.value = -1;
    selectedItem.value = {};
    showDialog.value = true;
  };

  const editItem = (index, row) => {
    selectedIndex.value = index;
    selectedItem.value = { ...row };
    showDialog.value = true;
  };

  const saveItem = () => {
    if (selectedIndex.value === -1) {
      props.formStore.pushNewRow();
      const lastIndex =
        props.formStore.model.value.voucherItems.length - 1;
      Object.assign(
        props.formStore.model.value.voucherItems[lastIndex],
        selectedItem.value
      );
    } else {
      Object.assign(
        props.formStore.model.value.voucherItems[selectedIndex.value],
        selectedItem.value
      );
    }
  };

  const cancelEdit = () => {
    selectedIndex.value = -1;
    selectedItem.value = {};
  };
</script>
