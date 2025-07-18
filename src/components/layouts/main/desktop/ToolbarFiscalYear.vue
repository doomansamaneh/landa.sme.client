<template>
  <q-btn-dropdown
    no-caps
    transition-show="slide-down"
    transition-hide="slide-up"
    transition-duration="600"
    class="desktop-toolbar-gradient bordered text-body3 text-weight-500 text-on-dark q-py-xs q-px-sm"
    rounded
    unelevated
    dropdown-icon="expand_more"
    content-class="bordered border-radius-lg"
    @click="toggleMenu"
    :menu-offset="[0, 10]"
    menu-anchor="bottom middle"
    menu-self="top middle"
    style="white-space: nowrap"
  >
    <template #label>
      <div v-if="$q.screen.gt.xs">
        {{ $t("main-menu-items.Acc_FiscalYear_View") }}:
        {{ fiscalYearStore.currentYear.value?.title }}
      </div>
      <span v-else class="text-body2">
        {{ `${fiscalYearStore.currentYear.value?.title}` }}
      </span>
    </template>

    <template #default>
      <div :style="$q.screen.gt.xs ? 'width: 400px;' : ''">
        <div class="row justify-between q-px-lg q-pt-md">
          <q-inner-loading
            :showing="tableStore.showLoader.value"
            class="transparent z-max"
          >
            <q-spinner size="52px" color="primary" />
          </q-inner-loading>

          <div class="text-on-dark text-body2 text-bold">
            <q-icon class="q-mr-sm" name="o_event" size="sm" />
            <span class="text-bold text-on-dark">
              {{ $t("shared.labels.chooseFiscalYear") }}
            </span>
          </div>
        </div>

        <div class="years-container q-pa-lg text-on-dark">
          <q-btn
            no-caps
            v-for="year in tableStore.rows.value"
            :key="year.id"
            unelevated
            rounded
            :class="activeYearStyle(year)"
            @click="fiscalYearStore.changeFiscalYear(year)"
            v-close-popup
          >
            <div
              class="text-body1"
              :class="activeYearStyle(year) ? 'text-bold' : ''"
            >
              {{ year.title }}
            </div>
          </q-btn>
        </div>
        <div class="q-gutter-sm q-px-lg q-pb-lg">
          <q-btn
            no-caps
            unelevated
            round
            dense
            size="12px"
            :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
            icon="o_refresh"
            @click="reloadData"
          >
            <q-tooltip class="text-body2 custom-tooltip" :delay="600">
              {{ $t("shared.labels.refresh") }}
            </q-tooltip>
          </q-btn>

          <template v-if="tableStore.pagination.value.totalPages > 1">
            <q-btn
              no-caps
              :disable="tableStore.pagination.value.currentPage <= 1"
              unelevated
              round
              dense
              size="12px"
              color="primary"
              text-color="white"
              :icon="$q.lang.rtl ? 'chevron_right' : 'chevron_left'"
              @click="previous($event)"
            >
              <q-tooltip
                class="text-body2 custom-tooltip"
                :delay="600"
              >
                {{ $t("shared.labels.next") }}
              </q-tooltip>
            </q-btn>
            <q-btn
              no-caps
              :disable="
                tableStore.pagination.value.currentPage >=
                tableStore.pagination.value.totalPages
              "
              unelevated
              round
              dense
              size="12px"
              color="primary"
              text-color="white"
              :icon="$q.lang.rtl ? 'chevron_left' : 'chevron_right'"
              @click="next($event)"
            >
              <q-tooltip
                class="text-body2 custom-tooltip"
                :delay="600"
              >
                {{ $t("shared.labels.previous") }}
              </q-tooltip>
            </q-btn>
          </template>
          <q-btn
            no-caps
            unelevated
            round
            dense
            size="12px"
            color="primary"
            text-color="white"
            icon="add"
            to="/acc/fiscalYear/create"
          >
            <q-tooltip class="text-body2 custom-tooltip" :delay="600">
              {{ $t("shared.labels.addFiscalYear") }}
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </template>
  </q-btn-dropdown>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useFiscalYear } from "src/components/areas/acc/_composables/useFiscalYear";

  const fiscalYearStore = useFiscalYear();
  const tableStore = useDataTable({
    dataSource: "acc/fiscalYear/getLookupData",
    store: fiscalYearStore,
  });

  const activeYearStyle = (year) => {
    if (fiscalYearStore.currentYear.value?.id === year.id) {
      return "active-shine primary-gradient text-white text-body1 text-bold ";
    }
    return "";
  };

  function toggleMenu() {
    tableStore.loadData();
  }

  async function reloadData() {
    await tableStore.reloadData();
  }

  async function previous(e) {
    tableStore.pagination.value.currentPage -= 1;
    await reloadData();
    //e.carousel.previous()
  }
  async function next(e) {
    tableStore.pagination.value.currentPage += 1;
    await reloadData();
    //e.carousel.next()
  }
</script>

<style lang="scss">
  .years-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: end;
    align-items: center;
    row-gap: 16px;
    column-gap: 16px;
  }
</style>
