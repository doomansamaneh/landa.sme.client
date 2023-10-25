<template>
  <q-btn
    class="bordered-btn bg-dark text-on-dark q-mx-md"
    padding="4px 12px"
    unelevated
  >
    <q-icon
      name="o_calendar_today"
      class="q-pr-sm"
      size="16px"
    />
    سال مالی: 1402
    <q-menu
      auto-close
      class="no-shadow z-max"
      transition-show="jump-down"
      transition-hide="jump-up"
      :offset="[0, 24]"
      max-width="350px"
      max-height="300px"
    >
      <q-list
        dense
        padding
        class="user-profile"
      >
        <q-item
          tabindex="0"
          class="q-py-sm"
        >
          <q-item-section>
            <div class="row q-gutter-md q-pl-sm q-py-md">
              <q-btn
                v-for="year in years"
                :key="year"
                unelevated
                :label="year"
                :rounded="true"
                :class="activeYearStyle(year)"
                @click="setActiveYear(year)"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { ref, computed } from "vue"

const activeYear = ref(null);
const years = ["1398", "1399", "1400", "1401", "1402", "1403", "1404", "1405"];

const setActiveYear = (year) => {
  activeYear.value = year;
};

const activeYearStyle = (year) => {
  if (activeYear.value == year) {
    return "bg-primary text-white"
  }
  return ""
}
</script>
