<template>
  <div v-access="`sls.invoice.view`" class="row justify-between">
    <q-card class="row justify-between q-pa-lg q-mb-lg bordered fit">
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
        <q-icon
          name="open_in_new"
          class="cursor-pointer q-ml-sm"
          @click="gotoInvoice"
        />
        <span class="text-caption">مانده از قبل</span>
        <q-badge
          rounded
          outline
          label="32,314,300"
          color="primary"
          class="q-ml-sm bg-dark text-bold q-py-xs q-px-sm"
        />
        <q-icon
          name="open_in_new"
          class="cursor-pointer q-ml-sm"
          @click="gotoInvoice"
        />
      </div>
      <div class="">
        <q-btn
          to="/sls/invoice/create"
          unelevated
          rounded
          class="bordered-btn bg-dark q-py-xs"
        >
          <q-icon name="o_add" size="16px" class="q-mr-xs" />
          ایجاد فاکتور
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";

  const router = useRouter();

  const gotoInvoice = () => {
    router.push("/Sls/Invoice");
  };
</script>
