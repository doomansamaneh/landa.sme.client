<template>
  <q-card bordered>
    <q-card-section>
      <div
        class="row q-col-gutter-md justify-between items-center text-body3"
      >
        <div class="col-5">
          <div>
            شماره:
            <span class="text-weight-500">
              {{ model?.no }}
            </span>
          </div>
          <div>
            تاریخ:
            <span class="text-weight-500">
              {{ model?.date?.substring(0, 10) }}
            </span>
          </div>
        </div>
        <div class="row col justify-end q-gutter-sm">
          <row-no-badge :no="model?.rowNo" />
        </div>
      </div>
    </q-card-section>

    <q-separator size="1px" />

    <q-card-section class="q-gutter-y-sm">
      <div v-if="model?.customerName">
        <span class="text-body3">
          {{ model?.customerName }}
        </span>
      </div>
      <div>
        <span class="text-body3">
          {{ model?.subject }}
        </span>
      </div>
      <div class="col no-wrap">
        <q-scroll-area
          :bar-style="{ opacity: 0 }"
          :thumb-style="{ opacity: 0 }"
          style="height: 21px"
        >
          <div class="row no-wrap q-pr-xs items-center q-gutter-xs">
            <status-badge
              class="text-weight-500 text-caption"
              padding="0 8px"
              :title="model?.statusTitle"
            />

            <type-badge
              class="text-weight-500 text-caption"
              padding="0 8px"
              :title="model?.typeTitle"
            />

            <contract-badge
              class="text-weight-500 text-caption"
              padding="0 8px"
              :title="model?.contractTitle"
            />
          </div>
        </q-scroll-area>
      </div>
    </q-card-section>

    <q-card-section>
      <template
        v-for="(item, index) in model?.paymentItems"
        :key="item.id"
      >
        <div class="row items-start q-gutter-sm">
          <span class="text-bold caption-on-dark text-body3">
            #{{ index + 1 }}
          </span>

          <div class="col">
            <div class="flex items-center">
              <div v-if="item?.bankAccountDisplay">
                {{ item.bankAccountDisplay }}
              </div>
            </div>

            <div class="flex items-center">
              <div class="">
                {{
                  $t(
                    `shared.paymentMethod.${getItemType(item.typeId)}`
                  )
                }}
                <span v-if="item.bankBranchDisplay">
                  | شعبه بانک:
                  {{ item.bankBranchDisplay }}
                </span>

                <span v-if="item.sayad">
                  | ش صیاد:
                  {{ item.sayad }}
                </span>

                <span v-if="item.comment">
                  |
                  {{ item.comment }}
                </span>
              </div>

              <div
                v-if="
                  item.bankBranchDisplay &&
                  item.bankBranchDisplay !== ' / '
                "
              >
                شعبه:
                <span>
                  {{ item.bankBranchDisplay }}
                </span>
              </div>

              <div
                v-if="
                  item.checkSpentDisplay &&
                  item.checkSpentDisplay !== ' / '
                "
              >
                چک:
                <span>
                  {{ item.checkSpentDisplay }}
                </span>
              </div>

              <div v-if="item.fee > 0">
                کارمزد: {{ helper.formatNumber(item.fee) }}
                <span class="text-body3">ریال</span>
              </div>
            </div>

            <div class="text-right text-weight-500 q-mt-md">
              {{ helper.formatNumber(item.amount) }}
              <span class="text-weight-300 text-body3">ریال</span>
            </div>
          </div>
        </div>

        <q-separator
          v-if="index < model?.paymentItems?.length - 1"
          class="q-my-sm"
        />
      </template>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-right">
        <span class="text-weight-600">
          {{ helper.formatNumber(model?.amount) }}
          <span class="text-caption">
            {{ model?.currencyTitle }}
          </span>
        </span>
      </div>
    </q-card-section>
  </q-card>

  <detail-section
    class="q-mt-md"
    :model="model"
    tax-api
    :detail-url="detailUrl"
    :show-receipt="showReceipt"
  />
</template>

<script setup>
  import { helper } from "src/helpers";
  import { documentType, paymentMethod } from "src/constants";

  import DetailSection from "../../shared/preview/_DetailSection.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import StatusBadge from "src/components/areas/_shared/badges/StatusBadge.vue";
  import TypeBadge from "src/components/areas/_shared/badges/TypeBadge.vue";
  import RowNoBadge from "src/components/areas/_shared/badges/RowNoBadge.vue";

  const props = defineProps({
    model: Object,
    title: String,
    detailUrl: String,
    showSaleHeader: Boolean,
    showReceipt: Boolean,
    taxApi: Boolean,
  });

  const getItemType = (typeId) => {
    for (const key in paymentMethod) {
      if (paymentMethod[key].id === typeId) {
        return key;
      }
    }
    return paymentMethod[0];
  };
</script>
