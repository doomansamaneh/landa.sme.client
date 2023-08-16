<template>
  <q-card class="card-desktop no-shadow q-my-xl">
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6">{{
            $t("page.renew-subscription.title")
          }}</q-item-label>
          <q-item-label class="dark-2 text-subtitle2">
            {{ $t("page.renew-subscription.caption") }}
          </q-item-label>
        </q-item-section>
        <q-card-actions>
          <div class="flex items-center q-gutter-x-md">
            <q-icon
              class="icon-hover dark-3 cursor-pointer"
              size="sm"
              name="arrow_back"
              @click="$router.go(-1)"
            >
              <q-tooltip class="custom-tooltip">{{
                $t("page.buttons.back")
              }}</q-tooltip>
            </q-icon>
          </div>
        </q-card-actions>
      </q-item>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-mx-md q-pt-lg">
      <q-form ref="form" autofocus>
        <div class="row q-mb-lg">
          <div class="col-2">
            <q-item-label>{{
              $t("page.renew-subscription.business-name-label")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="text-bold q-pl-xs">{{ businessTitle }}</span>
          </div>
        </div>
        <div class="row items-center q-mb-lg">
          <div class="col-2">
            <q-item-label>{{
              $t("page.renew-subscription.current-plan")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs">{{ planTitle }}</span>
          </div>
        </div>
        <div class="row items-center q-mb-lg">
          <div class="col-2">
            <q-item-label>{{
              $t("page.renew-subscription.to-date")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs">{{ toDate }}</span>
          </div>
        </div>
        <select-plan />
      </q-form>
    </q-card-section>

    <q-card-actions class="dark-1 q-pa-lg">
      <q-btn
        type="submit"
        @click="submitForm"
        unelevated
        rounded
        color="positive"
        no-caps
        padding="8px 16px"
        class=""
        ><q-icon name="o_monetization_on" class="q-pr-xs" size="xs" />
        {{ $t("page.renew-subscription.buttons.payment") }}
      </q-btn>
      <span class="text-caption q-pl-md"
        >پرداخت از همه کارتهای شتاب امکان پذیر است. برای پرداخت باید رمز دوم
        کارت خود را فعال کرده باشید.</span
      >
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue"
import { useQuasar } from "quasar"
import { useRoute } from "vue-router"
import { fetchWrapper } from "src/helpers"
import SelectPlan from "src/components/management/shared/SelectPlan.vue"

const route = useRoute()
const shape = ref("line")

const planTitle = ref(null)
const businessTitle = ref(null)
const toDate = ref(null)

const form = ref(null)

async function loadData() {
  const businessId = route.params.businessId
  await fetchWrapper
    .get(`business/GetBusiness/${businessId}`)
    .then((response) => {
      handleBusinessData(response.data.data)
    })
}

function handleBusinessData(data) {
  planTitle.value = data.lastPayment.planTitle
  businessTitle.value = data.title
  toDate.value = data.lastPayment.toDateString
}

onMounted(() => {
  loadData()
})

function submitForm() {
  form.value.validate().then((success) => {
    if (success) {
      alert("validation successfull")
    } else {
      alert("validation error")
    }
  })
}
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 700px !important;
}

.input {
  width: 400px;
}

.padding-x {
  padding: 24px 36px;
}

.pt-md {
  padding-top: 12px;
}

.margin-md {
  margin: 0 20px 12px 20px;
}
</style>
