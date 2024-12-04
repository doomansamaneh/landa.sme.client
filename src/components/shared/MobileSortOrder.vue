<template>
  <q-card style="width: 300px" class="no-border q-pt-sm q-px-sm">
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-body1 no-letter-spacing">جهت مرتب‌ سازی</div>
        <div>
          <q-btn
            size="8px"
            round
            unelevated
            text-color="white"
            class="red-gradient red-shadow col-1"
            v-close-popup
          >
            <q-icon size="16px" name="o_close" />
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-px-none">
      <q-item clickable class="text-body2 no-letter-spacing q-px-md">
        <q-item-section>صعودی</q-item-section>
        <q-item-section avatar>
          <q-icon size="20px" color="primary" name="check" />
        </q-item-section>
      </q-item>
      <q-separator size="1px" />
      <q-item clickable class="text-body2 no-letter-spacing q-pa-md">
        <q-item-section>نزولی</q-item-section>
        <q-item-section avatar>
          <q-icon size="20px" color="primary" name="check" />
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>
