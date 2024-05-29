<template>
  <q-btn
    class="bordered-btn bg-dark text-on-dark"
    :style="$q.screen.gt.sm ? 'width: 150px;' : 'width:60px;'"
    padding="5px 12px"
    rounded
    dense
    unelevated
    @click="toggleMenu"
  >
    <div class="row items-center" v-if="$q.screen.gt.sm">
      <div style="width: 20px">
        <q-icon name="o_calendar_today" class="q-pr-sm" size="16px" />
      </div>
      <div style="width: 100px">
        {{ $t("main-menu-items.Acc_FiscalYear_View") }}:
        {{ fiscalYearStore.currentYear.value?.title }}
      </div>
    </div>
    <span v-else class="text-body2 no-letter-spacing">
      {{ `${fiscalYearStore.currentYear.value?.title}` }}
    </span>
  </q-btn>

  <q-dialog
    transition-duration="600"
    transition-show="slide-down"
    transition-hide="slide-up"
    position="top"
    ref="fiscalYearDialog"
  >
    <q-card
      :style="$q.screen.gt.xs ? 'width: 400px;' : ''"
      :class="$q.dark.isActive ? 'no-border' : ''"
    >
      <q-card-section class="q-pa-lg">
        <div class="flex items-center justify-between">
          <div class="text-on-dark text-body2 text-bold">
            <q-icon class="q-mr-sm" name="o_event" size="sm" />
            <span class="text-bold text-on-dark">
              {{ $t("shared.labels.chooseFiscalYear") }}
            </span>
          </div>

          <q-btn unelevated round dense icon="close" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="q-px-lg q-pt-none q-pb-lg">
        <div class="years-container">
          <q-btn
            v-for="year in tableStore.rows.value"
            :key="year.id"
            unelevated
            rounded
            :class="activeYearStyle(year)"
            @click="fiscalYearStore.changeFiscalYear(year)"
            v-close-popup
          >
            <div
              class="text-body1 no-letter-spacing"
              :class="activeYearStyle(year) ? 'text-bold' : ''"
            >
              {{ year.title }}
            </div>
          </q-btn>
        </div>
        <div class="q-gutter-sm q-mt-lg">
          <q-btn
            unelevated
            round
            dense
            size="12px"
            :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
            icon="o_refresh"
            @click="reloadData"
          >
            <q-tooltip
              class="text-body2 no-letter-spacing custom-tooltip"
              :delay="600"
            >
              {{ $t("shared.labels.refresh") }}
            </q-tooltip>
          </q-btn>

          <template v-if="tableStore.pagination.value.totalPages > 1">
            <q-btn
              :disable="tableStore.pagination.value.currentPage <= 1"
              unelevated
              round
              dense
              size="12px"
              color="primary"
              text-color="white"
              icon="chevron_right"
              @click="previous($event)"
            >
              <q-tooltip
              class="text-body2 no-letter-spacing custom-tooltip"
              :delay="600"
            >
              {{ $t("shared.labels.next") }}
            </q-tooltip>
            </q-btn>
            <q-btn
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
              icon="chevron_left"
              @click="next($event)"
            >
              <q-tooltip
              class="text-body2 no-letter-spacing custom-tooltip"
              :delay="600"
            >
              {{ $t("shared.labels.previous") }}
            </q-tooltip>
            </q-btn>
          </template>
        </div>
      </q-card-section>

      <q-inner-loading
        :showing="tableStore.showLoader.value"
        class="transparent z-max"
      >
        <q-spinner size="52px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { useFiscalYear } from "src/components/areas/acc/_composables/useFiscalYear";

  const fiscalYearStore = useFiscalYear();
  const tableStore = useDataTable({
    dataSource: "acc/fiscalYear/getLookupData",
    store: fiscalYearStore,
  });

  const fiscalYearDialog = ref(null);

  const activeYearStyle = (year) => {
    if (fiscalYearStore.currentYear.value?.id === year.id) {
      return "active-shine primary-gradient text-white";
    }
    return "";
  };

  function toggleMenu() {
    tableStore.loadData();
    fiscalYearDialog.value.show();
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
