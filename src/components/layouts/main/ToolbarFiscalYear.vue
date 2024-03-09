<template>
  <q-btn
    class="bordered-btn bg-dark text-on-dark"
    :style="$q.screen.gt.sm ? 'width: 150px;' : 'width:60px;'"
    padding="5px 12px"
    rounded
    dense
    unelevated
  >
    <div
      class="row items-center"
      v-if="$q.screen.gt.sm"
    >
      <div style="width: 20px;">
        <q-icon
          name="o_calendar_today"
          class="q-pr-sm"
          size="16px"
        />
      </div>
      <div style="width: 100px;">
        {{ $t("main-menu-items.Acc_FiscalYear_View") }}: {{ fiscalYearStore.currentYear.value?.title }}
      </div>
    </div>
    <span
      v-else
      class="text-body2 no-letter-spacing"
    >
      {{ `${fiscalYearStore.currentYear.value?.title}` }}
    </span>

    <q-menu
      class="bordered border-radius-xl"
      style="width: 400px;"
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="$q.screen.gt.sm ? [0, 20] : [0, 10]"
      :anchor='$q.screen.gt.sm ? "bottom end" : "bottom middle"'
      :self='$q.screen.gt.sm ? "top end" : "top middle"'
    >
      <div class="fit bg-dark text-white">
        <div class="row justify-between q-px-lg q-pt-md">
          <q-inner-loading
            :showing="tableStore.showLoader.value"
            class="transparent z-max"
          >
            <q-spinner
              size="52px"
              color="primary"
            />
          </q-inner-loading>

          <div class="text-on-dark text-body2 text-bold">
            <q-icon
              class="q-mr-xs"
              name="o_playlist_add_check"
              size="sm"
            />
            <span class="text-bold text-on-dark">
              {{ $t("shared.labels.chooseFiscalYear") }}
            </span>
          </div>
        </div>

        <div class="years-container q-pa-lg text-on-dark">
          <q-btn
            v-for="year in tableStore.rows.value"
            :key="year.id"
            unelevated
            :label="year.title"
            :rounded="true"
            :class="activeYearStyle(year)"
            @click="fiscalYearStore.changeFiscalYear(year)"
            v-close-popup
          >
            {{ year.Title }}
          </q-btn>
        </div>

        <div
          v-if="tableStore.pagination.value.totalPages > 1"
          class="q-gutter-sm q-px-lg q-pb-lg"
        >
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
              class="custom-tooltip"
              :delay="600"
            >
              {{ $t("shared.labels.next") }}
            </q-tooltip>
          </q-btn>
          <q-btn
            :disable="tableStore.pagination.value.currentPage >= tableStore.pagination.value.totalPages"
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
              class="custom-tooltip"
              :delay="600"
            >
              {{ $t("shared.labels.previous") }}
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>


<script setup>
import { onMounted } from "vue"
import { useDataTable } from "src/composables/useDataTable"
import { useFiscalYear } from "src/components/areas/acc/_composables/useFiscalYear"

const fiscalYearStore = useFiscalYear()
const tableStore = useDataTable("acc/fiscalYear/getLookupData", fiscalYearStore.columns, fiscalYearStore)

const activeYearStyle = (year) => {
  if (fiscalYearStore.currentYear.value?.id === year.id) {
    return "bg-primary text-white"
  }
  return ""
}

onMounted(() => {
  tableStore.loadData()
})

async function reloadData() {
  await tableStore.reloadData()
}

async function previous(e) {
  tableStore.pagination.value.currentPage -= 1
  await reloadData()
  //e.carousel.previous()
}
async function next(e) {
  tableStore.pagination.value.currentPage += 1
  await reloadData()
  //e.carousel.next()
}

</script>

<style>
.years-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: end;
  align-items: center;
  row-gap: 16px;
  column-gap: 16px;
}
</style>

