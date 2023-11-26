<template>
  <q-btn
    class="bordered-btn border-radius-xs bg-dark text-on-dark q-mx-md"
    padding="4px 12px"
    unelevated
  >
    <q-icon
      name="o_calendar_today"
      class="q-pr-sm"
      size="16px"
    />
    <span>{{ `سال مالی: ${fiscalYearStore.currentYear.value?.title}` }}</span>

    <q-menu
      persistent
      style="width: 400px;"
      class="no-shadow z-max"
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="[0, 24]"
    >
      <div class="fit bg-dark text-white">

        <div class="row justify-between q-px-lg q-pt-md">
          
          <q-inner-loading
            :showing="tableStore.showLoader.value"
            class="inner-loader z-max"
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
            <span class="text-bold text-on-dark">انتخاب سال مالی</span>
          </div>
          <!-- <q-badge
              rounded
              outline
              :label="`تعداد سال‌ها: ${tableStore.pagination.value.totalItems}`"
              class="q-py-sm q-px-sm bg-dark text-on-dark text-body3"
            /> -->
        </div>

        <div class="years-container q-pa-lg text-on-dark">
          <q-btn
            v-for="year in tableStore.rows.value"
            :key="year.id"
            unelevated
            :label="year.title"
            :rounded="true"
            :class="activeYearStyle(year)"
            @click="fiscalYearStore.setFiscalYear(year)"
            v-close-popup
          >
            {{ year.Id }}
          </q-btn>
        </div>

        <div
          v-if="tableStore.pagination.value.totalPages > 1"
          position="bottom-right"
          class="q-gutter-sm q-px-lg q-pb-lg"
        >
          <q-btn
            v-if="tableStore.pagination.value.currentPage > 1"
            unelevated
            round
            dense
            size="12px"
            color="primary"
            text-color="white"
            icon="east"
            @click="previous($event)"
          />
          <q-btn
            v-if="tableStore.pagination.value.currentPage < tableStore.pagination.value.totalPages"
            unelevated
            round
            dense
            size="12px"
            color="primary"
            text-color="white"
            icon="west"
            @click="next($event)"
          />
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
  reloadData()
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

