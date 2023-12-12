<template>
  <!-- <div class="container fit">

    <q-card class="no-shadow bordered">
      <q-card-section class="row justify-between">
        <q-avatar
          rounded
          color="blue"
          text-color="white"
          icon="o_pie_chart"
          size="lg"
        />
        <div class="row items-center">
          <q-btn
            unelevated
            round
            size="sm"
            icon="o_more_vert"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none column q-gutter-y-sm">
        <div class="text-body2">جمع فاکتورها</div>
        <div class="text-h6 text-bold">60,740,410</div>
        <div class="row items-center">
          <q-icon
            name="o_arrow_upward"
            color="green"
          />
          <div class="text-body2 text-bold text-green">+72%</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow bordered">
      <q-card-section class="row justify-between">
        <q-avatar
          rounded
          color="green"
          text-color="white"
          icon="o_arrow_downward"
          size="lg"
        />
        <div class="row items-center">
          <q-btn
            unelevated
            round
            size="sm"
            icon="o_more_vert"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none column q-gutter-y-sm">
        <div class="text-body2">دریافت شده</div>
        <div class="text-h6 text-bold">376,339,310</div>
        <div class="row items-center">
          <q-icon
            name="o_arrow_upward"
            color="green"
          />
          <div class="text-body2 text-bold text-green">+28%</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow bordered">
      <q-card-section class="row justify-between">
        <q-avatar
          rounded
          color="orange"
          text-color="white"
          icon="o_pie_chart"
          size="lg"
        />
        <div class="row items-center">
          <q-btn
            unelevated
            round
            size="sm"
            icon="o_more_vert"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none column q-gutter-y-sm">
        <div class="text-body2">مانده امسال</div>
        <div class="text-h6 text-bold">23,101,100</div>
        <div class="row items-center">
          <q-icon
            name="o_arrow_upward"
            color="green"
          />
          <div class="text-body2 text-bold text-green">+72%</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow bordered">
      <q-card-section class="row justify-between">
        <q-avatar
          rounded
          color="orange"
          text-color="white"
          icon="o_acute"
          size="lg"
        />
        <div class="row items-center">
          <q-btn
            unelevated
            round
            size="sm"
            icon="o_more_vert"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none column q-gutter-y-sm">
        <div class="text-body2">مانده از قبل</div>
        <div class="text-h6 text-bold">376,339,310</div>
        <div class="row items-center">
          <q-icon
            name="o_arrow_downward"
            color="negative"
          />
          <div class="text-body2 text-bold text-negative">+28%</div>
        </div>
      </q-card-section>
    </q-card>

  </div> -->

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
      <div class="text-body2 text-bold">تبریک میگم، %47.4 رشد داشته اید. <span class="text-caption">در ماه
          گذشته</span></div>
    </q-card-section>

    <q-card-section class="row q-pt-none q-px-lg q-pt-none q-pb-lg">
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
            <q-item-label class="text-h6 text-bold">392,529,180</q-item-label>
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
            <q-item-label class="text-h6 text-bold">153,444,310</q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-avatar
              rounded
              color="orange"
              text-color="white"
              icon="o_account_balance_wallet"
              size="xl"
              class="orange-shadow"
            />
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">مانده امسال</q-item-label>
            <q-item-label class="text-h6 text-bold">392,529,180</q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-avatar
              rounded
              color="red"
              text-color="white"
              icon="o_account_balance_wallet"
              size="xl"
              class="red-shadow"
            />
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">مانده از قبل</q-item-label>
            <q-item-label class="text-h6 text-bold">32,314,300</q-item-label>
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
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: end;
  gap: 24px;
}
</style>
