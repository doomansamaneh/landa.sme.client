<template>
  <div
    v-if="$q.screen.xs"
    class="row q-py-md items-center justify-between"
  >
    <div class="row q-gutter-sm items-center">
      <back-button />
      <div class="text-body1 no-letter-spacing text-weight-700">
        {{ $t("pages.payment-detail") }}
      </div>
    </div>

    <div class="flex items-center">
      <q-btn dense class="text-caption" round unelevated no-caps>
        <q-icon name="o_print" />
      </q-btn>
      <q-btn
        no-caps
        dense
        class="text-caption q-ml-sm"
        round
        unelevated
        @click="onBottomSheetShow"
      >
        <q-icon name="o_more_vert" />
      </q-btn>
    </div>
  </div>

  <q-card
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
        <q-item-label
          class="caption-on-dark text-body2 no-letter-spacing q-mt-sm"
        >
          {{ $t("page.payment-detail.caption") }}
        </q-item-label>
      </q-item-section>
      <q-card-actions class="no-padding">
        <div class="row items-center">
          <div>
            <q-btn
              round
              unelevated
              dense
              class="text-on-dark"
              @click="$emit('reload-data')"
            >
              <q-icon size="20px" name="o_description" />
              <q-tooltip class="custom-tooltip">
                {{ $t("page.payment-detail.buttons.excel") }}
              </q-tooltip>
            </q-btn>
          </div>
          <div>
            <q-btn
              class="text-on-dark"
              dense
              unelevated
              round
              @click="print"
            >
              <q-icon size="20px" name="o_print" />
              <q-tooltip class="custom-tooltip">
                {{ $t("page.payment-detail.buttons.print") }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="row items-center">
          <q-btn
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

    <q-card-section
      :class="{
        'q-mx-md q-my-lg': $q.screen.gt.xs,
        'no-padding': $q.screen.lt.sm,
      }"
    >
      <div
        :class="{
          'row justify-between': $q.screen.gt.xs,
          'column justify-center items-center q-pt-sm q-pb-lg q-gutter-y-md':
            $q.screen.xs,
        }"
      >
        <div>
          <img
            class="sme-logo"
            src="/landa-sme-logo.png"
            alt="landa-sme-logo"
          />
        </div>

        <div class="text-subtitle1 text-bold">
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
        'q-mx-md q-my-lg': $q.screen.gt.xs,
        'no-padding': $q.screen.lt.sm,
      }"
    >
      <div
        class="row"
        :class="$q.screen.gt.xs ? 'q-col-gutter-lg' : 'q-my-md'"
      >
        <div
          class="col-md col-sm col-xs-12 text-body3"
          :class="$q.screen.lt.sm ? 'text-center q-mb-md' : ''"
        >
          <div class="q-mb-sm">
            {{ $t("page.payment-detail.seller") }}:
            <span class="text-weight-600">حسابداری آنلاین لاندا</span>
          </div>
          <div>
            <span class="line-height-xs"></span>
            <div class="q-pt-xs">
              <q-icon name="phone" class="dark-2 q-pr-xs" />
              88944338
            </div>
          </div>
        </div>
        <div
          class="col-md col-sm col-xs-12 text-body3"
          :class="$q.screen.lt.sm ? 'text-center' : ''"
        >
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
        'no-padding q-mx-md': $q.screen.gt.xs,
        'no-padding': $q.screen.lt.sm,
      }"
    >
      <q-scroll-area
        class="window-height"
        :bar-style="helper.barStyle"
        :thumb-style="helper.thumbStyle"
        visible
      >
        <table
          class="overflow-hidden invoice-preview-table text-caption"
        >
          <thead class="text-left">
            <tr>
              <th>
                <div class="">
                  {{ $t("page.payment-detail.row") }}
                </div>
              </th>
              <th>
                <span>عنوان</span>
              </th>
              <th>
                <div class="">
                  {{ $t("page.payment-detail.amount") }}
                </div>
              </th>
              <th>
                <div class="">
                  {{ $t("page.payment-detail.unit") }}
                </div>
              </th>
              <th>
                <div style="width: 70px">
                  {{ $t("page.payment-detail.unit-price") }}
                </div>
              </th>
              <th>
                <div class="">
                  {{ $t("page.payment-detail.total") }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="text-body3 no-letter-spacing">
            <tr>
              <td class=""><span class="">1</span></td>
              <td>
                <div
                  :style="
                    $q.screen.lt.sm ? 'width:300px' : 'width:auto'
                  "
                  class="ellipsis-2-lines"
                >
                  <div>
                    <span class="no-letter-spacing">
                      {{ model.planTitle }}
                    </span>
                  </div>
                  <div>
                    <span class="no-letter-spacing">
                      دوره: ({{ model.fromDateString }} -
                      {{ model.toDateString }})
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div>{{ model.month }}</div>
              </td>
              <td>
                <div>ماه</div>
              </td>
              <td>
                <div>
                  {{ helper.formatNumber(model.planCost) }}
                </div>
              </td>
              <td>
                <div>
                  {{
                    helper.formatNumber(model.month * model.planCost)
                  }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-right" colspan="5">
                <span class="text-bold">
                  {{ $t("page.payment-detail.sub-total") }}
                </span>
              </td>
              <td class="">
                <span class="">
                  {{
                    helper.formatNumber(model.planCost * model.month)
                  }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="text-right" colspan="5">
                <span class="text-bold">تخفیف:</span>
              </td>
              <td>
                <span class="">
                  {{
                    helper.formatNumber(
                      model.planCost * model.month - model.amount
                    )
                  }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="text-right" colspan="5">
                <span class="q-pl-xs text-bold">جمع کل:</span>
                <span class="">
                  <span class="no-letter-spacing">
                    ({{ numberToWords(model.amount) }}
                    <span class="text-bold">
                      {{ $t("shared.labels.rial") }}
                    </span>
                    )
                  </span>
                </span>
              </td>
              <td>
                <span class="">
                  {{ helper.formatNumber(model.amount) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </q-scroll-area>
    </q-card-section>
  </q-card>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #body>
      <q-list padding>
        <q-item clickable v-ripple @click="$emit('reload-data')">
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" size="36px">
              <q-icon size="xs" name="o_refresh" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.refresh") }}
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" size="36px">
              <q-icon size="xs" name="o_description" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing">
            {{ $t("page.payment-detail.buttons.excel") }}
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { helper } from "src/helpers";
  import { numberToWords } from "@persian-tools/persian-tools";
  import { useFormActions } from "src/composables/useFormActions";

  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import BottomSheet from "src/components/shared/BottomSheet.vue";

  const bottomSheetStatus = ref(false);

  const onBottomSheetShow = () => {
    bottomSheetStatus.value = true;
  };

  const onBottomSheetHide = () => {
    bottomSheetStatus.value = false;
  };

  const model = ref({});
  const route = useRoute();
  const actionStore = useFormActions("business", model, true);
  const loadData = async () => {
    const id = route.params.paymentId;
    const responseData = await actionStore.getById(
      id,
      "business/GetPayment",
      false
    );
  };

  onMounted(() => {
    loadData();
  });
</script>

<style scoped>
  .business-name {
    max-width: 250px;
  }

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
