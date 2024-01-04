<template>
  <q-card
    class="bordered"
    v-for="(item, index) in gridStore.items.value"
    :key="item.id"
    :class="{ 'active-on-select': gridStore.isCardSelected(index) }"
    @click="gridStore.selectCard(index)"
  >
    <q-card-section>
      <!-- <div class="row items-center justify-center">
          <q-btn
            round
            unelevated
            color="green"
            class="no-pointer-events q-border-2"
          >
            <q-avatar size="56px">
              <img src="https://cdn.quasar.dev/img/avatar1.jpg">
            </q-avatar>
          </q-btn>
        </div> -->
      <div class="row justify-between">
        <div class="col">
          <span class="text-caption text-on-dark">{{ item.dateString }}</span>
        </div>
        <div class="col row justify-end">
          <span class="text-caption text-on-dark">{{ item.no }}</span>
        </div>
      </div>
      <q-separator class="q-mt-xs" />
      <div class="row items-center q-py-md">
        <div class="col row q-gutter-sm items-center">

          <q-badge
            class="text-caption text-on-dark bg-on-dark q-py-xs q-px-sm"
            :class="{ 'important-row': gridStore.isCardSelected(index) }"
            :label="index + 1"
          />

          <q-btn
            dense
            padding="2px 12px"
            class="border-radius-sm bg-orange-2 no-pointer-events"
            unelevated
          >
            <span class="text-body3 text-red">
              {{ item.statusTitle }}
            </span>
          </q-btn>

        </div>
        <div class="col">

          <div class="row justify-end q-gutter-sm items-center">
            <!-- <q-btn
                dense
                padding="4px 16px"
                class="border-radius-sm bg-orange-2 no-pointer-events"
                unelevated
              >
                <span class="text-body3 text-red">
                  {{ item.statusTitle }}
                </span>
              </q-btn> -->

            <q-btn
              round
              dense
              class="text-on-dark"
              flat
              icon="o_chevron_left"
            />

          </div>

        </div>
      </div>
      <div class="column q-gutter-sm">

        <div
          class="row items-center bg-on-dark border-radius-sm q-px-sm"
          :class="{ 'important-row': gridStore.isCardSelected(index) }"
        >
          <div class="col-4">
            <span class="text-caption text-on-dark">مشتری</span>
          </div>
          <div class="col">
            <q-item class="no-padding row justify-end items-center">
              <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ item.customerName }}</span>
            </q-item>
          </div>
        </div>

        <div class="row items-center border-radius-sm q-px-sm">
          <div class="col-4">
            <span class="text-caption text-on-dark">شرح</span>
          </div>
          <div class="col">
            <q-item class="no-padding row justify-end items-center">
              <span class="ellipsis-2-lines text-caption text-on-dark">{{ item.subject }}</span>
            </q-item>
          </div>
        </div>

        <div
          class="row items-center bg-on-dark border-radius-sm q-px-sm"
          :class="{ 'important-row': gridStore.isCardSelected(index) }"
        >
          <div class="col-4">
            <span class="text-caption text-on-dark">نوع</span>
          </div>
          <div class="col">
            <q-item class="no-padding row justify-end items-center">
              <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ item.typeTitle }}</span>
            </q-item>
          </div>
        </div>

        <div class="row items-center border-radius-sm q-px-sm">
          <div class="col-4">
            <span class="text-caption text-on-dark">تخفیف</span>
          </div>
          <div class="col">
            <q-item class="no-padding row justify-end items-center">
              <span class="ellipsis-2-lines text-caption text-on-dark">{{ item.discountAmount.toLocaleString() }}</span>
            </q-item>
          </div>
        </div>

        <div
          class="row items-center bg-on-dark border-radius-sm q-px-sm"
          :class="{ 'important-row': gridStore.isCardSelected(index) }"
        >
          <div class="col-4">
            <span class="text-caption text-on-dark">جمع کل</span>
          </div>
          <div class="col">
            <q-item class="no-padding row justify-end items-center">
              <span class="ellipsis-2-lines text-caption text-bold text-on-dark">{{ item.amount.toLocaleString() }}</span>
            </q-item>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useDataTable } from "src/composables/mobile/useDataTable";

const gridStore = useDataTable()

</script>

<style lang="scss" scoped>

</style>

