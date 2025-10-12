<template>
  <q-btn
    no-caps
    :size="$q.screen.xs ? '10px' : ''"
    class="q-px-md text-on-dark no-wrap bordered desktop-toolbar-gradient"
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
    <span v-else class="text-body2">
      {{ `${fiscalYearStore.currentYear.value?.title}` }}
    </span>
  </q-btn>

  <q-dialog
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

          <q-btn
            no-caps
            unelevated
            round
            dense
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>

      <q-card-section class="q-px-lg q-pt-none q-pb-lg">
        <div class="years-container">
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

        <div class="flex items-center justify-between q-mt-lg">
          <q-btn
            no-caps
            unelevated
            round
            dense
            color="primary"
            text-color="white"
            icon="add"
            to="/acc/fiscalYear/create"
          >
            <q-tooltip class="text-body2 custom-tooltip" :delay="600">
              {{ $t("shared.labels.addFiscalYear") }}
            </q-tooltip>
          </q-btn>

          <div class="q-gutter-xs">
            <q-btn
              no-caps
              unelevated
              round
              dense
              icon="o_refresh"
              @click="reloadData"
            >
              <q-tooltip
                class="text-body2 custom-tooltip"
                :delay="600"
              >
                {{ $t("shared.labels.refresh") }}
              </q-tooltip>
            </q-btn>

            <template
              v-if="tableStore.pagination.value.totalPages > 1"
            >
              <q-btn
                no-caps
                :disable="
                  tableStore.pagination.value.currentPage <= 1
                "
                unelevated
                round
                dense
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
          </div>
        </div>
      </q-card-section>

      <q-inner-loading
        :showing="tableStore?.showLoader?.value"
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
