<template>

  <q-card class="bordered no-shadow">
    <q-card-section class="q-pa-lg">
      <div class="row items-center justify-between">
        <div class="text-body1">فاکتورهای فروش</div>
        <q-btn
          to="/sls/invoice/create"
          unelevated
          rounded
          class="bordered-btn bg-dark q-py-xs"
        ><q-icon
            name="o_add"
            size="16px"
            class="q-mr-xs"
          />ایجاد فاکتور</q-btn>
      </div>
      <div class="text-body3 text-bold q-mt-sm">تبریک میگم، %47.4 رشد داشته اید. <span class="text-caption">در ماه
          گذشته</span></div>
    </q-card-section>

    <q-card-section class="row q-pt-none q-px-lg q-pt-sm q-pb-lg">
      <div class="col">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-avatar
              rounded
              color="grey"
              text-color="white"
              icon="o_receipt"
              size="xl"
              class="grey-shadow"
            />
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">جمع کل</q-item-label>
            <q-item-label style="font-size: 18px;" class="text-bold">392,529,180</q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-avatar
              rounded
              color="green"
              text-color="white"
              icon="o_arrow_downward"
              size="xl"
              class="green-shadow"
            />
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">دریافت شده</q-item-label>
            <q-item-label style="font-size: 18px;" class="text-bold">153,444,310</q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn push @click="hello" flat dense size="0">
            <q-avatar
              rounded
              color="orange"
              text-color="white"
              icon="o_account_balance_wallet"
              size="xl"
              class="orange-shadow"
            />
          </q-btn>
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">مانده امسال</q-item-label>
            <q-item-label style="font-size: 18px;" class="text-bold">392,529,180</q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn push @click="hello" flat dense size="0">
              <q-avatar
              rounded
              color="red"
              text-color="white"
              icon="o_account_balance_wallet"
              size="xl"
              class="red-shadow"
            />
            </q-btn>
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">مانده از قبل</q-item-label>
            <q-item-label style="font-size: 18px;" class="text-bold">32,314,300</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-card-section>
  </q-card>

</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const gotoInvoice = () => {
  router.push('/Sls/Invoice')
}

const hello = () => {
  alert("Hello")
}
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: end;
  gap: 24px;
}
</style>
