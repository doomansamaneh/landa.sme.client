<template>
  <q-card
    v-if="$q.screen.gt.xs"
    :class="{
      'bordered q-my-xl': $q.screen.gt.xs,
      'no-border no-shadow bg-transparent': $q.screen.lt.sm,
    }"
    :style="$q.screen.gt.sm ? 'width:800px' : 'width:auto'"
  >
    <q-item
      class="card-header q-px-lg q-py-lg"
      v-if="$q.screen.gt.xs"
    >
      <q-item-section>
        <q-item-label class="text-h6 text-weight-700 text-on-dark">
          {{ $t("pages.payment-detail") }}
        </q-item-label>
        <q-item-label class="caption-on-dark text-body2 q-mt-sm">
          {{ $t("page.payment-detail.caption") }}
        </q-item-label>
      </q-item-section>
      <q-card-actions class="no-padding">
        <div class="row items-center">
          <div>
            <q-btn
              no-caps
              class="text-on-dark"
              dense
              unelevated
              round
              @click="printStore.downloadPdf()"
            >
              <q-icon size="20px" name="o_print" />
              <q-tooltip class="custom-tooltip">
                {{ $t("shared.labels.print") }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="row items-center">
          <q-btn
            no-caps
            round
            unelevated
            dense
            class="text-on-dark"
            @click="loadData"
          >
            <q-icon size="20px" name="o_refresh" />
            <q-tooltip class="custom-tooltip">
              {{ $t("shared.labels.refresh") }}
            </q-tooltip>
          </q-btn>
        </div>
        <back-button />
      </q-card-actions>
    </q-item>

    <q-separator
      :color="$q.dark.isActive ? 'grey-6' : 'grey-4'"
      v-if="$q.screen.gt.xs"
    />

    <div :ref="printStore.printRef">
      <q-card-section
        :class="{
          'q-pa-lg': $q.screen.gt.xs,
          'no-padding': $q.screen.lt.sm,
        }"
      >
        <div class="row justify-between items-center">
          <div>
            <img
              class="sme-logo"
              src="/landa-sme-logo.png"
              alt="landa-sme-logo"
            />
          </div>

          <div class="text-body2 text-bold">
            {{ $t("shared.labels.invoice") }}
          </div>

          <div class="column q-gutter-xs">
            <div class="text-body3">
              <span>{{ $t("shared.labels.no") }}:</span>
              {{ model.orderId }}
            </div>

            <div class="text-body3">
              <span>{{ $t("shared.labels.date") }}</span>
              :
              {{ model.fromDateString }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator :color="$q.dark.isActive ? 'grey-6' : 'grey-4'" />

      <q-card-section
        :class="{
          'q-pt-lg q-px-lg q-pb-none': $q.screen.gt.xs,
          'no-padding': $q.screen.lt.sm,
        }"
      >
        <div
          class="row"
          :class="$q.screen.gt.xs ? 'q-col-gutter-lg' : 'q-my-md'"
        >
          <div class="col-md col-sm col-xs-12 text-body3 q-mb-md">
            <div class="q-mb-sm">
              {{ $t("page.payment-detail.seller") }}:
              <span class="text-weight-600">
                حسابداری آنلاین لاندا
              </span>
            </div>
            <div>
              <span class="line-height-xs"></span>
              <div class="q-pt-xs">
                <q-icon name="phone" class="dark-2 q-pr-xs" />
                88944338
              </div>
            </div>
          </div>
          <div class="col-md col-sm col-xs-12 text-body3">
            <div class="q-mb-sm">
              {{ $t("page.payment-detail.customer") }}:
              <span class="text-weight-600">
                {{ model.businessTitle }}
              </span>
            </div>
            <div>
              <span class="line-height-xs"></span>
              <div class="q-pt-xs"></div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section
        :class="{
          'q-pa-lg': $q.screen.gt.xs,
          'no-padding': $q.screen.lt.sm,
        }"
      >
        <q-markup-table flat class="invoice-preview-table">
          <thead class="text-left">
            <tr>
              <th>
                {{ $t("page.payment-detail.row") }}
              </th>
              <th>عنوان</th>
              <th>
                {{ $t("page.payment-detail.amount") }}
              </th>
              <th>
                {{ $t("page.payment-detail.unit") }}
              </th>
              <th>
                {{ $t("page.payment-detail.unit-price") }}
              </th>
              <th>
                {{ $t("page.payment-detail.total") }}
              </th>
            </tr>
          </thead>
          <tbody class="text-body3">
            <tr>
              <td>1</td>
              <td>
                <div>
                  <div>
                    {{ model.planTitle }}
                  </div>
                  <div>
                    <span class="">
                      دوره: ({{ model.fromDateString }} -
                      {{ model.toDateString }})
                    </span>
                  </div>
                </div>
              </td>
              <td>
                {{ model.month }}
              </td>
              <td>ماه</td>
              <td>
                {{ helper.formatNumber(model.planCost) }}
              </td>
              <td>
                {{
                  helper.formatNumber(model.month * model.planCost)
                }}
              </td>
            </tr>
            <tr>
              <td class="text-right" colspan="5">
                <span class="text-bold">
                  {{ $t("page.payment-detail.sub-total") }}
                </span>
              </td>
              <td>
                {{
                  helper.formatNumber(model.planCost * model.month)
                }}
              </td>
            </tr>
            <tr>
              <td class="text-right" colspan="5">
                <span class="text-bold">تخفیف:</span>
              </td>
              <td>
                {{
                  helper.formatNumber(
                    model.planCost * model.month - model.amount
                  )
                }}
              </td>
            </tr>
            <tr>
              <td class="text-right" colspan="5">
                <span class="q-pl-xs text-bold">جمع کل:</span>
                <span v-if="model?.amount">
                  ({{ numberToWords(model?.amount) }}
                  <span class="text-bold">
                    {{ $t("shared.labels.rial") }}
                  </span>
                  )
                </span>
              </td>
              <td>
                {{ helper.formatNumber(model.amount) }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { usePrint } from "src/composables/usePrint";
  import { numberToWords } from "@persian-tools/persian-tools";

  const props = defineProps({
    model: Object,
    loadData: Function,
  });

  const printStore = usePrint();
</script>

<style scoped>
  .sme-logo {
    width: 72px;
  }

  table,
  td,
  th {
    border: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border-radius: 4px;
    overflow: hidden;
  }

  th,
  td {
    padding: 24px 8px;
  }
</style>
