<template>
  <q-card class="no-shadow q-pa-md">
    <!-- <q-card-section> -->
    <div class="text-h6 q-ml-md">صورت سود و زیان</div>
    <!-- </q-card-section> -->
    <q-card-section>
      <div class="div-table-container">
        <div class="div-table">
          <div class="div-table-row">
            <div class="div-table-cell">
              6- فروش و درآمد
            </div>
          </div>
          <div class="div-table-row">
            <div class="div-table-cell">
              <div class="row items-center justify-between">
                <!-- <div class="col-5"> -->
                <q-tree
                  :nodes="sales"
                  accordion
                  class="text-caption"
                  node-key="label"
                />
                <!-- </div> -->
                <!-- <div class="col-2">
                  <span class="text-caption ">بدهکار</span>
                  <q-badge
                    rounded
                    color="negative"
                    outline
                    label="21,360,000"
                    class="q-ml-sm text-caption text-bold
                  bg-dark text-on-dark text-body2"
                  />
                </div>
                <div class="col-2">
                  <span class="text-caption ">بستانکار</span>
                  <q-badge
                    rounded
                    outline
                    color="secondary"
                    label="5,734,000"
                    class="q-ml-sm text-caption  text-bold
                  bg-dark text-on-dark text-body2"
                  />
                </div>
                <div class="col-2">
                  <span class="text-caption ">سود</span>
                  <q-badge
                    rounded
                    color="primary"
                    outline
                    label="15,626,000"
                    class="q-ml-sm text-caption  text-bold
                  bg-dark text-on-dark text-body2"
                  />
                </div> -->

              </div>
            </div>
          </div>
          <div class="div-table-row">
            <div class="div-table-cell">
              7- بهای تمام شده کالای فروش رفته و خدمات ارائه شده
            </div>
          </div>
          <div class="div-table-row">
            <div class="div-table-cell">
              <div class="row items-center justify-between">
                <!-- <div class="col-5"> -->
                <q-tree
                  :nodes="salesPrice"
                  accordion
                  class="text-caption"
                  node-key="label"
                />
                <!-- </div> -->
                <!-- <div class="col-2">
                  <span class="text-caption ">بدهکار</span>
                  <q-badge
                    rounded
                    color="negative"
                    outline
                    label="46,400,000"
                    class="q-ml-sm text-caption text-bold
                  bg-dark text-on-dark text-body2"
                  />
                </div>
                <div class="col-2">
                  <span class="text-caption ">بستانکار</span>
                  <q-badge
                    rounded
                    outline
                    color="secondary"
                    label="0"
                    class="q-ml-sm text-caption  text-bold
                  bg-dark text-on-dark text-body2"
                  />
                </div>
                <div class="col-2">
                  <span class="text-caption ">سود</span>
                  <q-badge
                    rounded
                    color="primary"
                    outline
                    label="46,400,000"
                    class="q-ml-sm text-caption  text-bold
                  bg-dark text-on-dark text-body2"
                  />
                </div> -->

              </div>
            </div>
          </div>
          <div class="div-table-row">
            <div class="div-table-cell">
              8- هزینه‌ها
            </div>
          </div>
          <div class="div-table-row">
            <div class="div-table-cell">
              <div class="row items-center justify-between">
                <q-tree
                  :nodes="cost"
                  accordion
                  class="text-caption"
                  node-key="label"
                />
              </div>
            </div>
          </div>
          <div class="div-table-row">
            <div class="div-table-cell">
              <div class="row justify-between">
                <div class="">درآمد خالص</div>
              <div class="">5,010,192,500</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const sales = [
  {
    label: '601- فروش',
    children: [
      {
        label: '60101- فروش کالا',
        children: [
          { label: 'گردش بدهکار: 0' },
          { label: 'گردش بستانکار: 21,360,000' },
        ]
      },
      {
        label: '60103- برگشت از فروش و تخفیفها',
        children: [
          { label: 'گردش بدهکار: 5,734,000' },
          { label: 'گردش بستانکار: 0' },
        ]
      },
    ]
  }
]

const salesPrice = [
  {
    label: '701- بهای تمام شده کالای فروش رفته',
    children: [
      {
        label: '70103- بهای تمام شده کالای فروش رفته',
        children: [
          { label: 'گردش بدهکار: 46,400,000' },
          { label: 'گردش بستانکار: 0' },
        ]
      },
    ]
  }
]

const cost = [
  {
    label: '805- هزینه‌های توزیع و فروش',
    children: [
      {
        label: '80502- هزینه های بازاریابی و پورسانت',
        children: [
          { label: 'گردش بدهکار: 757,500' },
          { label: 'گردش بستانکار: 0' },
        ]
      },
      {
        label: '80599- هزینه متفرقه توزیع و فروش',
        children: [
          { label: 'گردش بدهکار: 5,734,000' },
          { label: 'گردش بستانکار: 21,350,000' },
        ]
      },
    ]
  },
  {
    label: '807- هزینه‌های مالی',
    children: [
      {
        label: '80703- هزینه کارمزد وامها و خدمات بانکی',
        children: [
          { label: 'گردش بدهکار: 11,000' },
          { label: 'گردش بستانکار: 0' },
        ]
      }
    ]
  },
  {
    label: '809- سایر هزینه‌های عملیاتی',
    children: [
      {
        label: '80920- هزینه کسری کالا',
        children: [
          { label: 'گردش بدهکار: 5,000,000,000' },
          { label: 'گردش بستانکار: 0' },
        ]
      }
    ]
  }
]

</script>

<style lang="scss">
.div-table-container {
  border-radius: 4px;
  overflow: hidden;
}

.div-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.div-table-header {
  display: table-header-group;
  font-weight: bold;
}

.div-table-row {
  display: table-row;
}

.div-table-cell {
  display: table-cell;
  padding: 12px;
  text-align: left;
}

.q-tree {
  .q-focus-helper {
    display: none;
  }
}
</style>
