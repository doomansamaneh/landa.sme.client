<template>
  <div class="q-my-lg">

    <q-input
      outlined
      rounded
      dense
      class="business-searchbox-mobile text-body2 q-my-md"
      :placeholder="$t('page.card-searchbar')"
    >
      <template v-slot:prepend>
        <q-icon
          name="search"
          class="search-icon cursor-pointer"
          size="sm"
          color="primary"
          @click="reloadData"
        />
      </template>
      <template v-slot:append>
        <q-icon
          name="clear"
          class="cursor-pointer"
          size="16px"
          color="primary"
          @click="clearSearch"
        />
        <q-btn
          round
          unelevated
          class="text-on-dark"
          dense
          icon="o_refresh"
          size="12px"
          @click="reloadData"
        />
      </template>
    </q-input>

    <div class="q-my-lg q-gutter-y-md">
      <q-card
        v-for="n in 7"
        :key="n"
        class="bordered row bg-dark rounded-borders q-pa-md"
      >
        <div class="col-6">
          <div class="row">
            <div class="col-4">
              <q-avatar
                size="36px"
                class="bg-on-dark"
              >
                <q-icon
                  name="o_history"
                  size="20px"
                />
              </q-avatar>
            </div>
            <div class="col">
              <div class="column q-gutter-xs">
                <div>
                  <q-item-label caption>
                    1402/04/09
                  </q-item-label>
                </div>
                <div>
                  <q-item-label caption>
                    1403/01/01
                  </q-item-label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="column q-gutter-xs">
            <q-item-label caption>
              490,000
              <span>{{ $t("page.payment-history.rial") }}</span>
              <q-tooltip
                class="custom-tooltip"
                :delay="600"
              >
                {{ $t("page.payment-history.amount-paid") }}</q-tooltip>
            </q-item-label>

            <div>
              <q-item-label caption>
                <q-icon
                  name="circle"
                  color="orange"
                  size="8px"
                />
                {{ $t("page.payment-history.trial") }}
              </q-item-label>

              <q-item-label
                caption
                v-if="false"
              >
                <q-icon
                  name="circle"
                  color="positive"
                  size="8px"
                />
                {{ $t("page.payment-history.paid") }}
              </q-item-label>
            </div>
          </div>
        </div>

        <div class="col-1">
          <div class="row justify-end q-gutter-xs">
            <q-btn
              size="13px"
              unelevated
              round
              dense
              icon="o_more_vert"
              @click="onBottomSheetShow"
            />
          </div>
        </div>
      </q-card>

    </div>

    <div class="row justify-center">
      <q-btn
        rounded
        unelevated
        @click="gotoNext"
        class="full-width primary-shadow bg-primary text-white"
      >
        <span class="text-body3">بارگزاری بیشتر</span>
      </q-btn>
    </div>

    <no-data-found v-if="false" />

    <q-inner-loading
      :showing="tableStore?.showLoader?.value"
      class="transparent z-max"
    >
      <q-spinner
        size="52px"
        color="primary"
      />
    </q-inner-loading>

  </div>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >

    <template #header>

    </template>

    <template #body>
      <q-list padding>

        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              size="36px"
            >
              <q-icon
                size="xs"
                name="o_visibility"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing"> {{ $t("page.payment-history.buttons.view") }}
          </q-item-section>
        </q-item>


      </q-list>
    </template>

  </bottom-sheet>

  <q-page-sticky
    position="bottom-right z-1"
    :offset="[18, 18]"
  >
    <q-btn
      v-if="showCreate"
      rounded
      unelevated
      padding="10px 20px"
      to="/sls/invoice/create"
      dense
      color="primary"
      class="text-body2 no-letter-spacing primary-shadow"
    >
      محل قرارگیری نام کسب و کار فعلی
    </q-btn>

  </q-page-sticky>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue"
import BottomSheet from "src/components/shared/BottomSheet.vue"

const bottomSheetStatus = ref(false)
const showCreate = ref(true)
let previousScrollPosition = 0

const onBottomSheetShow = () => {
  bottomSheetStatus.value = true
}

const onBottomSheetHide = () => {
  bottomSheetStatus.value = false;
}

const formatCurrency = (value) => {
  const language = localStorage.getItem("selectedLanguage")
  if (language === "fa-IR") {
    return value.toLocaleString("fa-IR", {
      minimumFractionDigits: 0
    })
  } else {
    return value.toLocaleString()
  }
}

const handleScroll = () => {
  const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
  showCreate.value = currentPosition <= 0 || currentPosition < previousScrollPosition;
  previousScrollPosition = currentPosition;
};

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 13px;
  letter-spacing: 0;
  color: #2d2d2d;
}

.q-item__section--side {
  padding-right: 12px;
}
</style>
