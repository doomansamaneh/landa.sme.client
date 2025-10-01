<template>
  <q-card class="no-border q-pt-sm q-px-sm">
    <q-card-section>
      <div class="row justify-between items-center">
        <span class="text-body1">
          {{ $t("shared.labels.search") }}
        </span>
        <q-btn no-caps dense flat icon="close" v-close-popup />
      </div>
    </q-card-section>

    <q-card-section class="q-pt-sm q-pb-none">
      <q-scroll-area
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
        style="height: 60px"
      >
        <div>
          <div class="row items-center q-gutter-md no-wrap">
            <q-btn
              no-caps
              v-for="option in dateRangeOptions"
              :key="option.value"
              @click="handleDateRangeClick(option.value)"
              rounded
              unelevated
              padding="8px 12px"
              :color="isActive(option.value) ? 'primary' : ''"
              :text-color="
                !isActive(option.value) && !$q.dark.isActive
                  ? 'grey-10'
                  : 'white'
              "
              class="text-on-dark text-body2 bordered-btn"
              :class="{ 'bordered-btn': !isActive(option.value) }"
              style="min-width: 80px"
            >
              <span>{{ option.label }}</span>
            </q-btn>

            <q-btn
              no-caps
              rounded
              unelevated
              padding="8px 12px"
              class="bordered-btn text-on-dark text-body2"
              style="min-width: 90px"
              @click="openCheckoutModal"
            >
              <span>{{ $t("shared.labels.settlement") }}</span>
              <q-icon
                size="xs"
                class="q-ml-sm"
                name="o_expand_more"
              />
            </q-btn>
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-section>
      <q-scroll-area
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
        style="height: calc(100vh - 340px)"
      >
        <div class="column q-col-gutter-lg">
          <div class="q-pl-none q-ml-md">
            <q-checkbox
              class="text-body2 q-mb-md"
              v-model="searchModel.waitToSendTax"
              :label="$t('shared.labels.waitToSendTax')"
            />
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                {{ $t("shared.labels.amountFrom") }}
              </q-item-label>
              <custom-input
                v-model="searchModel.amountFrom"
                display-format="n0"
              />
            </div>
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                {{ $t("shared.labels.amountTo") }}
              </q-item-label>
              <custom-input
                v-model="searchModel.amountTo"
                display-format="n0"
              />
            </div>
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                {{ $t("shared.labels.dateFrom") }}
              </q-item-label>
              <date-time v-model="searchModel.dateFrom" />
            </div>
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                {{ $t("shared.labels.dateTo") }}
              </q-item-label>
              <date-time v-model="searchModel.dateTo" />
            </div>
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              {{ $t("shared.labels.contractTitle") }}
            </q-item-label>
            <contract-lookup />
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              {{ $t("shared.labels.marketerName") }}
            </q-item-label>
            <q-input
              readonly
              outlined
              dense
              v-model="searchModel.customerName"
              @click="showContact = true"
            >
              <template #append>
                <q-icon
                  @click="showContact = true"
                  name="o_expand_more"
                />
              </template>
            </q-input>
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              {{ $t("shared.labels.saleType") }}
            </q-item-label>
            <sale-type-lookup />
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              {{ $t("shared.labels.productOrService") }}
            </q-item-label>
            <q-input
              readonly
              outlined
              dense
              v-model="searchModel.productName"
              @click="showProduct = true"
            >
              <template #append>
                <q-icon
                  @click="showProduct = true"
                  name="o_expand_more"
                />
              </template>
            </q-input>
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              {{ $t("shared.labels.customer") }}
            </q-item-label>
            <q-input
              readonly
              outlined
              dense
              v-model="searchModel.customerName"
              @click="showContact = true"
            >
              <template #append>
                <q-icon
                  @click="showContact = true"
                  name="o_expand_more"
                />
              </template>
            </q-input>
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              {{ $t("shared.labels.comment") }}
            </q-item-label>
            <custom-input v-model="searchModel.comment" />
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>

    <div class="row q-my-lg q-mx-lg">
      <q-btn
        no-caps
        padding="10px 12px"
        rounded
        unelevated
        outline
        class="q-mb-sm full-width"
        @click="clearSearch"
      >
        <div class="row items-center">
          <q-icon size="xs" name="o_close" class="q-mr-xs" />
          <span>{{ $t("shared.labels.clearSearch") }}</span>
        </div>
      </q-btn>

      <q-btn
        no-caps
        padding="10px 12px"
        rounded
        unelevated
        color="primary"
        class="q-mb-sm full-width"
        @click="applySearch"
      >
        <div class="row items-center">
          <q-icon size="xs" name="o_search" class="q-mr-xs" />
          <span>{{ $t("shared.labels.search") }}</span>
        </div>
      </q-btn>
    </div>
  </q-card>

  <q-dialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class="no-border q-mt-xl"
      position="bottom"
      style="height: 100vh"
    >
      <q-card-section>
        <div class="row justify-between items-center">
          <span class="text-body1">
            {{ $t("shared.labels.settlement") }}
          </span>
          <q-btn no-caps dense flat icon="close" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <div class="colunm">
          <q-option-group
            :options="options"
            type="checkbox"
            v-model="group"
            @update:model-value="handleCheckboxChange"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="showContact"
  >
    <q-card>
      <q-card-section>
        <contact-lookup />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="showProduct"
  >
    <q-card>
      <q-card-section>
        <product-lookup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { dateRange } from "src/constants";
  import { helper } from "src/helpers";
  import { useI18n } from "vue-i18n";
  import dateTime from "src/components/shared/forms/DateTimePicker.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import ContactLookup from "src/components/shared/lookups/MobileContactLookup.vue";
  import ProductLookup from "src/components/shared/lookups/MobileProductLookup.vue";

  const { t } = useI18n();

  const props = defineProps({
    gridStore: Object,
  });

  const dateRangeOptions = computed(() =>
    helper.getEnumOptions(dateRange)
  );

  const group = ref([]);
  const dialog = ref(false);
  const showContact = ref(false);
  const showProduct = ref(false);

  const options = [
    { label: "دارای مانده", value: "1", color: "warning" },
    { label: "تسویه ناقص", value: "2", color: "red" },
    { label: "تسویه کامل", value: "3", color: "green" },
  ];

  const handleCheckboxChange = () => {
    if (group.value.length >= 0) {
      dialog.value = false;
    }
  };

  const emit = defineEmits(["apply-search", "update-date-range"]);

  const searchModel = computed(
    () => props.gridStore.state.searchModel.value
  );

  async function applySearch() {
    emit("apply-search", searchModel.value);
  }

  async function clearSearch() {
    props.gridStore.setDefaultSearchModel();
    await applySearch();
  }

  async function removeItem(item) {
    //todo: how to find field type and dynamically set to it's default value
    let value = "";
    switch (item.name) {
      case "dateRange":
        value = 0;
        break;
      case "waitToSendTax":
        value = false;
        break;
    }
    searchModel.value[item.name] = value;
    await applySearch();
  }

  const openCheckoutModal = () => {
    dialog.value = true;
  };

  const handleDateRangeClick = async (value) => {
    searchModel.value.dateRange = value;
    const translatedLabel = t(
      `shared.labels.${searchModel.value.dateRange}`
    );
    emit("update-date-range", {
      value: searchModel.value.dateRange,
      label: translatedLabel,
    });

    await applySearch();
  };

  const isActive = (value) => {
    return searchModel.value.dateRange === value;
  };
</script>

<style lang="scss" scoped>
  .q-item__label--caption {
    font-size: 14px;
    letter-spacing: 0;
    color: #697588;
  }
</style>
