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
    <span>{{ `سال مالی: ${activeYear}` }}</span>

    <q-menu
      persistent
      style="width: 400px;"
      class="no-shadow z-max"
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="[0, 24]"
    >
      <q-carousel
        v-model="fiscalYear"
        ref="carousel"
        class="fit bg-dark text-white"
      >
        <template v-slot:control>
          <q-carousel-control
            v-if="years.length >= 10"
            position="bottom-right"
            :offset="[18, 18]"
            class="q-gutter-sm"
          >
            <q-btn
              unelevated
              round
              dense
              size="12px"
              color="primary"
              text-color="white"
              icon="east"
              @click="$refs.carousel.previous()"
            />
            <q-btn
              unelevated
              round
              dense
              size="12px"
              color="primary"
              text-color="white"
              icon="west"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </template>
        <q-carousel-slide
          v-for="(chunk, index) in chunkedYears"
          :key="index + 1"
          class="no-padding"
          :name="index + 1"
        >

          <div class="row justify-between q-px-lg q-pt-md">
            <div class="text-on-dark text-body2 text-bold">
              <q-icon class="q-mr-xs" name="o_playlist_add_check"  size="sm"/>
              <span class="text-bold text-on-dark">انتخاب سال مالی</span>
            </div>
            <q-badge
            rounded
            outline
            :label="`تعداد سال‌ها: ${years.length}`"
            class="q-py-sm q-px-sm bg-dark text-on-dark text-body3"
          />
          </div>
          <div class="years-container q-pa-lg text-on-dark">
            <q-btn
              v-for="year in chunk"
              :key="year"
              unelevated
              :label="year"
              :rounded="true"
              :class="activeYearStyle(year)"
              @click="setActiveYear(year)"
              v-close-popup
            />
          </div>
        </q-carousel-slide>
      </q-carousel>

    </q-menu>
  </q-btn>
</template>


<script setup>
import { ref, computed } from "vue"

const fiscalYear = ref(1)

const activeYear = ref(localStorage.getItem("FiscalYear"));
const years = ["1391", "1392", "1393", "1394", "1395", "1396", "1397", "1398", "1399", "1400", "1401", "1402", "1403", "1404", "1405"];

const chunkedYears = computed(() => {
  const chunkSize = 10;
  const chunks = [];
  for (let i = 0; i < years.length; i += chunkSize) {
    chunks.push(years.slice(i, i + chunkSize));
  }
  return chunks;
});

const setActiveYear = (year) => {
  localStorage.setItem("FiscalYear", year)
  activeYear.value = localStorage.getItem("FiscalYear");
};

const activeYearStyle = (year) => {
  if (activeYear.value == year) {
    return "bg-primary text-white"
  }
  return ""
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

