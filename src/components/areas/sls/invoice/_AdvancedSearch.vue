<template>
  <q-card class="q-px-md q-mt-md no-shadow">
    <q-card-section class="row justify-between">
      <q-option-group
        class="row"
        type="radio"
        :options="dateRangeOptions"
        v-model="searchModel.dateRange"
        @update:model-value="applySearch"
      />
      <q-btn
        round
        flat
        class="bg-dark"
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-section>
    <q-slide-transition>
      <div class="q-mx-md"
        v-show="expanded"
        :duration="700"
      >
        <q-checkbox
          v-model="searchModel.waitToSendTax"
          :label='$t("shared.labels.waitToSendTax")'
        />
        <div class="q-gutter-y-sm q-pl-sm q-my-md">
          <div class="row q-gutter-x-sm">
            <q-input
              outlined
              dense
              clearable
              v-model="searchModel.amountFrom"
              :placeholder='$t("shared.labels.amountFrom")'
              style="max-width: 170px;"
            />
            <q-input
              outlined
              dense
              clearable
              v-model="searchModel.amountTo"
              :placeholder='$t("shared.labels.amountTo")'
              style="max-width: 170px;"
            />
          </div>
          <div class="row q-gutter-x-sm">
            <!-- @update:modelValue="aler('1')" -->

            <date-time
              v-model="searchModel.dateFrom"
              :placeholder='$t("shared.labels.dateFrom")'
              style="max-width: 170px;"
            />

            <date-time
              v-model="searchModel.dateTo"
              :placeholder='$t("shared.labels.dateTo")'
              style="max-width: 170px;"
            />

            <!-- <q-input
              outlined
              dense
              v-model="searchModel.dateFrom"
              mask="date"
              clearable
              style="max-width: 170px;"
              :placeholder='$t("shared.labels.dateFrom")'
            >
              <template v-slot:append>
                <q-icon
                  name="event"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="searchModel.dateFrom"
                      :calendar="calendar"
                      today-btn
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input> -->

          </div>
          <q-input
            outlined
            dense
            clearable
            v-model="searchModel.comment"
            :placeholder='$t("shared.labels.comment")'
            style="max-width: 350px;"
          />
        </div>
        <!-- <chip
          :search-model="searchModel"
          :remove-item="removeItem"
        /> -->
        <q-card-actions align="left" class="q-pb-lg">
          <q-btn
            class="bg-primary text-white"
            rounded
            padding="8px 16px"
            unelevated
            @click="applySearch"
            size="12px"
          >
            <q-icon
              name="search"
              class="q-mr-xs"
            />جستجو
          </q-btn>
          <q-btn
            class=""
            rounded
            unelevated
            padding="8px 16px"
            flat
            @click="clearSearch"
            size="12px"
          >
            <q-icon
              name="clear"
              class="q-mr-xs"
            />
            حذف فیلتر
          </q-btn>
        </q-card-actions>
      </div>

    </q-slide-transition>

    <!-- <q-card-actions align="right">
      <q-btn
        color="primary"
        label="Search"
        no-caps
        @click="applySearch"
      />
      <q-btn
        flat
        label="Clear Search"
        no-caps
        @click="clearSearch"
      />
    </q-card-actions> -->
  </q-card>

  <chip
    class="q-mt-md"
    :search-model="searchModel"
    :remove-item="removeItem"
  />

  <!-- <q-card-actions
    align="right"
    class="q-my-md"
  >
    <q-btn
      class="bg-primary text-white"
      rounded
      padding="8px 16px"
      unelevated
      @click="applySearch"
      size="12px"
    ><q-icon
        name="search"
        class="q-mr-sm"
      />جستوجو</q-btn>
    <q-btn
      class=""
      rounded
      unelevated
      padding="8px 16px"
      flat
      @click="clearSearch"
      size="12px"
    ><q-icon
        name="clear"
        class="q-mr-sm"
      />پاکسازی جستوجو</q-btn>
  </q-card-actions> -->
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { dateRange } from "src/constants"
import { helper } from "src/helpers"
import chip from "src/components/shared/SearchChip.vue"
import dateTime from "src/components/shared/Forms/DateTimePicker.vue"

const props = defineProps({
  gridStore: Object
})

const expanded = ref(false)

const searchModel = computed(() => props.gridStore.state.searchModel.value)

const dateRangeOptions = computed(() => helper.getEnumOptions(dateRange))

const emit = defineEmits(["apply-search"])

async function applySearch() {
  emit("apply-search", searchModel.value)
}

async function clearSearch() {
  props.gridStore.setDefaultSearchModel()
  await applySearch()
}

async function removeItem(item) {
  //todo: how to find field type and dynamically set to it's default value
  let value = "";
  switch (item.name) {
    case "dateRange":
      value = 0
      break
    case "waitToSendTax":
      value = false
      break
  }
  searchModel.value[item.name] = value
  await applySearch()
}

</script>
