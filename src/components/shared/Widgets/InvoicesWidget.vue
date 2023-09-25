<template>
  <div class="row justify-between">
    <q-card class="row justify-between q-py-lg q-px-xl q-mb-lg no-shadow full-width">
      <div class="row items-center q-gutter-x-md">
        <div class="row items-center q-gutter-x-xs q-mr-md">
          <span class="text-h6">فاکتورهای فروش</span>
          <q-badge
            rounded
            outline
            label="15"
            class="q-ml-sm bg-dark text-on-dark text-body2"
          />
        </div>
        <span class="text-caption">جمع کل</span>
        <q-badge
          rounded
          outline
          label="60,740,410"
          color="primary"
          class="q-ml-sm bg-dark text-bold q-py-xs q-px-sm"
        />
        <span class="text-caption">دریافت شده</span>
        <q-badge
          rounded
          outline
          label="376,339,310"
          color="primary"
          class="q-ml-sm bg-dark text-bold q-py-xs q-px-sm"
        />
        <span class="text-caption">مانده امسال</span>
        <q-badge
          rounded
          outline
          label="23,101,100"
          color="primary"
          class="q-ml-sm bg-dark text-bold q-py-xs q-px-sm"
        />
        <span class="text-caption">مانده از قبل</span>
        <q-badge
          rounded
          outline
          label="32,314,300"
          color="primary"
          class="q-ml-sm bg-dark text-bold q-py-xs q-px-sm"
        />
      </div>
      <div class="">
        <q-btn
          unelevated
          rounded
          class="bordered-btn bg-dark q-py-xs"
        ><q-icon
            name="o_add"
            size="16px"
            class="q-mr-xs"
          />ایجاد فاکتور</q-btn>
      </div>
    </q-card>
  </div>
</template>

