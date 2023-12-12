<template>
  <q-card class="fit bordered">
    <q-card-section class="q-pa-lg">
      <q-icon
        name="o_balance"
        color="primary"
        class="q-mr-xs"
        size="24px"
      /><span class="text-h6">
        صورت سود و زیان
      </span>
    </q-card-section>
    <div class="q-px-lg">
      <q-tree
        :nodes="nodes"
        node-key="label"
        node-icon="search"
        accordion
        selected-color="primary"
        no-connectors
        icon="o_arrow_forward_ios"
      >
        <template #default-header="prop">
          <div class="q-pa-sm">{{ prop.node.label }}</div>
        </template>
        <template #header-root="prop">
          <div class="q-pa-sm">
            {{ prop.node.label }}
          </div>
          <q-space />
            <span>5,922,779</span>
        </template>
        <!-- <template #default-body="prop">

          {{ prop.node.label }}

        </template> -->
      </q-tree>
    </div>
    <q-card-section class="row justify-between q-pa-lg">
      <div class="text-bold">
        <q-icon
          name="o_arrow_downward"
          color="primary"
          size="20px"
        /><span>
          درآمد خالص
        </span>
      </div>
      <div class="text-bold">5,010,381,279</div>
    </q-card-section>
  </q-card>
</template>

<script setup>

const nodes = [
  {
    label: '6- فروش و درآمد',
    // header: 'root',
    children: [
      {
        label: '601- فروش',
        header: 'root',
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
          }
        ]
      }
    ]
  },
  {
    label: '7- بهای تمام شده کالای فروش رفته و خدمات ارائه شده',
    // header: 'root',
    children: [
      {
        label: '701- بهای تمام شده کالای فروش رفته',
        header: 'root',
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
  },
  {
    label: '8- هزینه‌ها',
    // header: 'root',
    children: [
      {
        label: '805- هزینه‌های توزیع و فروش',
        header: 'root',
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
        header: 'root',
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
        header: 'root',
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
  }
]


</script>
