<template>
  <div
    v-if="$q.screen.xs"
    class="row q-py-md items-center justify-between"
    :class="$q.dark.isActive ? 'q-dark' : ''"
  >
    <div class="row q-gutter-sm items-center">
      <back-button />
      <div class="text-body1 text-weight-700">
        {{ $t("pages.payment-detail") }}
      </div>
    </div>

    <div class="flex items-center q-gutter-sm">
      <q-btn
        no-caps
        dense
        class="text-caption"
        round
        unelevated
        @click="printStore.downloadPdf()"
      >
        <q-icon name="o_print" />
      </q-btn>
      <q-btn
        no-caps
        dense
        class="text-caption"
        round
        unelevated
        @click="loadData"
      >
        <q-icon name="o_refresh" />
      </q-btn>
    </div>
  </div>

  <q-scroll-area
    v-if="$q.screen.lt.sm"
    style="height: calc(100vh)"
    :thumb-style="{ opacity: 0 }"
    :bar-style="{ opacity: 0 }"
  >
    <q-card
      :class="{
        'bordered q-my-xl': $q.screen.gt.xs,
        bordered: $q.screen.lt.sm,
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
        <q-card-section class="q-pa-lg">
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

        <q-separator
          :color="$q.dark.isActive ? 'grey-6' : 'grey-4'"
        />

        <q-card-section class="q-pt-lg q-px-lg q-pb-none">
          <div class="row q-col-gutter-lg">
            <div class="col-md col-sm col-xs text-body3 q-mb-md">
              <div class="q-mb-sm">
                {{ $t("page.payment-detail.seller") }}
                <span class="text-weight-600">
                  {{ appConfigStore.model.value.companySetting.name }}
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
            <div class="col-md col-sm col-xs text-body3">
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

        <q-card-section class="q-pa-lg">
          <q-markup-table flat class="invoice-preview-table">
            <thead class="text-left">
              <tr>
                <th>
                  {{ $t("page.payment-detail.row") }}
                </th>
                <th>
                  {{ $t("shared.labels.title") }}
                </th>
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
                        {{ $t("shared.labels.period") }}: ({{
                          model.fromDateString
                        }}
                        - {{ model.toDateString }})
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  {{ model.month }}
                </td>
                <td>{{ $t("shared.labels.month") }}</td>
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
                  <span class="text-bold">
                    {{ $t("shared.labels.discount") }}:
                  </span>
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
                  <span class="q-pl-xs text-bold">
                    {{ $t("shared.labels.total") }}:
                  </span>
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
  </q-scroll-area>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { usePrint } from "src/composables/usePrint";
  import { numberToWords } from "src/helpers/numberToWords.js";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
    loadData: Function,
  });

  const printStore = usePrint();
  const appConfigStore = useAppConfigModel();
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
