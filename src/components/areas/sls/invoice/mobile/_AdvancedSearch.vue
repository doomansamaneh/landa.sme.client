<template>
  <q-card class="q-pa-sm">
    <q-card-section>

      <div class="row justify-between items-center">
        <span class="text-body1 no-letter-spacing">
          جستجو در فاکتورها
        </span>
        <q-btn
          dense
          flat
          icon="close"
          v-close-popup
        />
      </div>

    </q-card-section>

    <q-card-section class="q-pt-sm q-pb-none">
      <q-scroll-area
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
        style="height: 60px;"
      >
        <div>
          <div class="row items-center q-gutter-md no-wrap">

            <q-btn
              rounded
              unelevated
              padding="8px 12px"
              :color="activeBtn ? 'primary' : ''"
              :text-color="!activeBtn ? 'grey-10' : 'white'"
              class="text-on-dark text-body2"
              :class="!activeBtn ? 'bordered-btn' : ''"
              @click="makeBtnActive"
              style="min-width: 60px;"
            >
              <span>{{ $t("shared.labels.all") }}</span>
            </q-btn>

            <q-btn
              rounded
              unelevated
              padding="8px 12px"
              :color="activeBtn ? 'primary' : ''"
              :text-color="!activeBtn ? 'grey-10' : 'white'"
              class="text-on-dark text-body2"
              :class="!activeBtn ? 'bordered-btn' : ''"
              @click="makeBtnActive"
              style="min-width: 60px;"
            >
              <span>{{ $t("shared.labels.today") }}</span>
            </q-btn>

            <q-btn
              rounded
              unelevated
              padding="8px 12px"
              :color="activeBtn ? 'primary' : ''"
              :text-color="!activeBtn ? 'grey-10' : 'white'"
              class="text-on-dark text-body2"
              :class="!activeBtn ? 'bordered-btn' : ''"
              @click="makeBtnActive"
              style="min-width: 80px;"
            >
              <span>{{ $t("shared.labels.thisWeek") }}</span>
            </q-btn>

            <q-btn
              rounded
              unelevated
              padding="8px 12px"
              :color="activeBtn ? 'primary' : ''"
              :text-color="!activeBtn ? 'grey-10' : 'white'"
              class="text-on-dark text-body2"
              :class="!activeBtn ? 'bordered-btn' : ''"
              @click="makeBtnActive"
              style="min-width: 70px;"
            >
              <span>{{ $t("shared.labels.thisMonth") }}</span>
            </q-btn>

            <q-btn
              rounded
              unelevated
              padding="8px 12px"
              class="bordered-btn text-on-dark text-body2"
              style="min-width: 90px;"
              @click="openCheckoutModal"
            >
              <span>تسویه</span>
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
        <div class="column q-col-gutter-md">

          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-item-label
                caption
                class="q-mb-sm"
              >
                مبلغ از
              </q-item-label>
              <custom-input
                v-model="searchModel.amountFrom"
                display-format="n0"
              />
            </div>
            <div class="col">
              <q-item-label
                caption
                class="q-mb-sm"
              >
                مبلغ تا
              </q-item-label>
              <custom-input
                v-model="searchModel.amountTo"
                display-format="n0"
              />
            </div>
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-item-label
                caption
                class="q-mb-sm"
              >
                تاریخ از
              </q-item-label>
              <date-time v-model="searchModel.dateFrom" />
            </div>
            <div class="col">
              <q-item-label
                caption
                class="q-mb-sm"
              >
                تاریخ تا
              </q-item-label>
              <date-time v-model="searchModel.dateTo" />
            </div>
          </div>

          <div>
            <q-item-label
              caption
              class="q-mb-sm"
            >
              قرارداد
            </q-item-label>
            <q-input
              outlined
              dense
            >
              <template #append>
                <q-icon name="expand_more" />
              </template>
            </q-input>
          </div>

          <div>
            <q-item-label
              caption
              class="q-mb-sm"
            >
              بازاریاب
            </q-item-label>
            <q-input
              outlined
              dense
            >
              <template #append>
                <q-icon name="expand_more" />
              </template>
            </q-input>
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-item-label
                caption
                class="q-mb-sm"
              >
                نوع
              </q-item-label>
              <q-input
                outlined
                dense
              />
            </div>
            <div class="col">
              <q-item-label
                caption
                class="q-mb-sm"
              >
                وضعیت
              </q-item-label>
              <q-input
                outlined
                dense
              >
                <template #append>
                  <q-icon name="expand_more" />
                </template>
              </q-input>
            </div>


          </div>

          <div>
            <q-item-label
              caption
              class="q-mb-sm"
            >
              کالا و خدمات
            </q-item-label>
            <q-input
              outlined
              dense
            >
              <template #append>
                <q-icon name="expand_more" />
              </template>
            </q-input>
          </div>

          <div>
            <q-item-label
              caption
              class="q-mb-sm"
            >
              مخاطب
            </q-item-label>
            <q-input
              outlined
              dense
            />
          </div>

          <div>
            <q-item-label
              caption
              class="q-mb-sm"
            >
              شرح
            </q-item-label>
            <custom-input
              v-model="searchModel.comment"
              :placeholder='$t("shared.labels.comment")'
            />
          </div>

        </div>
      </q-scroll-area>

    </q-card-section>


    <div class="row q-my-lg q-mx-lg">

      <q-btn
        padding="10px 12px"
        rounded
        unelevated
        outline
        class="q-mb-sm full-width"
        @click="clearSearch"
      >
        <div class="row items-center">
          <q-icon
            size="xs"
            name="o_close"
            class="q-mr-xs"
          />
          <span>
            حذف فیلتر
          </span>
        </div>
      </q-btn>

      <q-btn
        padding="10px 12px"
        rounded
        unelevated
        color="primary"
        class="q-mb-sm full-width"
        @click="applySearch"
      >
        <div class="row items-center">
          <q-icon
            size="xs"
            name="o_search"
            class="q-mr-xs"
          />
          <span>
            جستجو
          </span>
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
      class="q-mt-xl"
      position="bottom"
      style="height:100vh"
    >

      <q-card-section>
        <div class="row justify-between items-center">
          <span class="text-body1 no-letter-spacing">
            انتخاب تسویه
          </span>
          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
          />
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
</template>

<script setup>
import { computed, ref } from "vue"
import { dateRange } from "src/constants"
import { helper } from "src/helpers"
import chip from "src/components/shared/SearchChip.vue"
import dateTime from "src/components/shared/Forms/DateTimePicker.vue"
import customInput from "src/components/shared/Forms/CustomInput.vue"

const props = defineProps({
  gridStore: Object
})

const group = ref([])

const options = [
  { label: 'دارای مانده', value: '1', color: 'warning' },
  { label: 'تسویه ناقص', value: '2', color: 'red' },
  { label: 'تسویه کامل', value: '3', color: 'green' }
]

const handleCheckboxChange = () => {
  if (group.value.length >= 0) {
    dialog.value = false;
  }
}


const dialog = ref(false)
const emit = defineEmits(["apply-search"])

const activeBtn = ref(false)

const makeBtnActive = () => {
  activeBtn.value = !activeBtn.value
}

const searchModel = computed(() => props.gridStore.state.searchModel.value)


async function applySearch() {
  emit("apply-search", searchModel.value)
}

async function clearSearch() {
  props.gridStore.setDefaultSearchModel()
  await applySearch()
}

const openCheckoutModal = () => {
  dialog.value = true
}

</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}
</style>
