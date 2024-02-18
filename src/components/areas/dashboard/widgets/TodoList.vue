<template>
  <q-card class="no-shadow bordered">
        <q-card-section class="row justify-between items-center q-pa-lg">
          <div class="text-body1">لیست کارها</div>
          <div class="row items-center">
            <q-btn
              unelevated
              size="8px"
              round
              icon="o_add"
              color="primary"
              text-color="white"
              class="primary-shadow"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-lg q-pr-none">

          <q-scroll-area style="height: 480px;">
            <q-list class="column q-gutter-y-md">

              <q-item
                class="q-pl-none q-pr-lg"
                v-for="n in 9"
                :key="n"
              >

                <q-item-section
                  side
                  top
                >
                  <q-checkbox
                    round
                    size="sm"
                    v-model="check1"
                  />

                </q-item-section>

                <div class="q-pl-sm">

                  <div
                    class="text-body2 line-height-xs"
                    :class="checked"
                  >خرید سیب زمینی پیاز برای کارگاه + خرید دو تن جوانه گندم برای
                    آشپزخانه جهت تولید حلیم</div>
                  <div class="row q-gutter-x-md q-mt-sm items-center">
                    <span class="text-body3">23 شهریور 1402</span>
                    <q-badge
                      class="q-py-sm q-px-md"
                      rounded
                      color="positive"
                      label="انجام شده"
                    />
                  </div>

                </div>

              </q-item>

            </q-list>
          </q-scroll-area>

        </q-card-section>
      </q-card>
</template>

<script setup>
import { ref, computed } from "vue"

const check1 = ref(false)

const checked = computed(() => {
  return check1.value ? "text-strike" : "";
});
</script>

