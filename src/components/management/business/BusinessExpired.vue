<template>
  <q-card class="card-desktop no-shadow q-my-xl">
    <q-card-section>
      <q-item class="">
        <q-item-section>
          <q-item-label class="text-h6">
            {{ $t("pages.business-expired") }}
          </q-item-label>
          <q-item-label class="dark-2 q-pt-xs text-subtitle2" caption>
            {{ business?.title }}
          </q-item-label>
        </q-item-section>
        <q-card-actions>
          <div class="flex items-center q-gutter-x-md">
            <back-button />
          </div>
        </q-card-actions>
      </q-item>
    </q-card-section>
    <q-separator />
    <q-card-section class="flex items-center justify-start q-gutter-lg"
      ><img src="/sad.svg" alt="expired" class="q-pt-md" />
      <span class="text-subtitle1">متاسفانه کسب و کار شما منقضی شده است.</span>

      <!-- <q-btn
        to="/business/addPayment"
        unelevated
        outline
        rounded
        size="16px"
        class="bg-primary text-white"
        >تمدید اشتراک</q-btn
      > -->
      <renew-subscribtion
        class="bg-green text-white"
        size="16px"
        :business="business"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { fetchWrapper } from "src/helpers"
import { useRoute } from "vue-router"
import BackButton from "src/components/shared/Buttons/GoBackLink.vue"
import RenewSubscribtion from "src/components/management/shared/RenewSubscribtionLink.vue"

const route = useRoute()

const business = ref(null)

async function loadData() {
  await fetchWrapper
    .get(`business/GetBusiness/${route.params.businessId}`)
    .then((response) => {
      business.value = response.data.data
    })
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 700px !important;
}

img {
  width: 120px;
}
</style>
