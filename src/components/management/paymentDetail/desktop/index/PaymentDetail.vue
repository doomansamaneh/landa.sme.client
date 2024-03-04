<template>
  <q-card
    :class="{
      'bordered q-my-xl': $q.screen.gt.xs,
      'no-border no-shadow bg-transparent': $q.screen.lt.sm,
    }"
    :style="$q.screen.gt.sm ? 'width:800px' : 'width:auto'"
  >
    <q-item class="card-header q-px-lg q-py-lg" v-if="$q.screen.gt.xs">
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
        <div class="row items-center q-mr-md">
          <div class="q-mr-xs">
            <q-btn
              round
              unelevated
              dense
              class="text-on-dark"
              icon="o_description"
              @click="$emit('reload-data')"
            >
              <q-tooltip class="custom-tooltip">
                {{ $t("page.payment-detail.buttons.excel") }}</q-tooltip
              >
            </q-btn>
          </div>
          <div class="">
            <q-btn
              class="text-on-dark"
              dense
              unelevated
              round
              icon="o_print"
              @click="print"
            >
              <q-tooltip class="custom-tooltip">{{
                $t("page.payment-detail.buttons.print")
              }}</q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="row items-center q-mr-xs">
          <q-btn
            round
            unelevated
            dense
            class="text-on-dark"
            icon="o_refresh"
            @click="$emit('reload-data')"
          >
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
          'column justify-center items-center q-py-lg q-gutter-y-md':
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
          {{ $t("page.payment-detail.invoice-label") }}
        </div>

        <div class="column q-gutter-xs">
          <div class="text-body3">
            <span>{{ $t("page.payment-detail.invoice-date") }}</span
            >1401/02/09
          </div>

          <div class="text-body3">
            <span>{{ $t("page.payment-detail.invoice-number") }}</span
            >20108
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
      <div class="row" :class="$q.screen.gt.xs ? 'q-col-gutter-lg' : 'q-my-md'">
        <div
          class="col-md col-sm col-xs-12 text-body3"
          :class="$q.screen.lt.sm ? 'text-center q-mb-md' : ''"
        >
          <div class="text-weight-bold q-mb-sm">
            {{ $t("page.payment-detail.seller") }}
            <span class="text-weight-thin"> حسابداری آنلاین لاندا </span>
          </div>
          <div>
            <span class="line-height-xs">
              شهر جدید اندیشه، شهرک صدف، بلوار دکتر قریب، مجتمع اداری زیتون،
              واحد 105
            </span>
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
          <div class="text-weight-bold q-mb-sm">
            {{ $t("page.payment-detail.customer") }}
            <span class="text-weight-light"> خشایار شمالی </span>
          </div>
          <div>
            <span class="line-height-xs"
              >شهرری، خیابان شهید رجایی، شهرک سیزده آبان، خیابان رحیمی، خیابان
              عنایتی، کوچه محمدی، پلاک 22</span
            >
            <div class="q-pt-xs">
              <q-icon name="phone" class="dark-2 q-pr-xs" />
              09338603196
            </div>
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
        style="height: 100vh"
        class="full-width"
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
      >
        <table class="overflow-hidden invoice-preview-table text-caption">
          <thead class="text-left">
            <tr>
              <th>
                <div class="">{{ $t("page.payment-detail.row") }}</div>
              </th>
              <th>
                <span>کالا/خدمت</span>
              </th>
              <th>
                <div class="">{{ $t("page.payment-detail.amount") }}</div>
              </th>
              <th>
                <div class="">{{ $t("page.payment-detail.unit") }}</div>
              </th>
              <th>
                <div style="width: 70px">
                  {{ $t("page.payment-detail.unit-price") }}
                </div>
              </th>
              <th>
                <div class="">{{ $t("page.payment-detail.total") }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="text-body3 no-letter-spacing">
            <template v-for="(item, index) in items" :key="index">
              <tr>
                <td class=""><span class="">1</span></td>
                <td>
                  <div
                    :style="$q.screen.lt.sm ? 'width:300px' : 'width:auto'"
                    class="ellipsis-2-lines"
                  >
                    <div>
                      <span class="no-letter-spacing">
                        {{ item.subject }}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div>{{ item.amount }}</div>
                </td>
                <td>
                  <div>عدد</div>
                </td>
                <td>
                  <div>
                    {{ item.amount.toLocaleString() }}
                  </div>
                </td>
                <td>
                  <div>
                    {{ item.payedAmount.toLocaleString() }}
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
                  <span class="">10,750,000</span>
                </td>
              </tr>
              <tr>
                <td class="text-right" colspan="5">
                  <span class="text-bold">تخفیف:</span>
                </td>
                <td>
                  <span class="">
                    {{ item?.discountAmount.toLocaleString() }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="text-right" colspan="5">
                  <span class="q-pl-xs text-bold"> جمع کل: </span>
                  <span class="">
                    <span class="no-letter-spacing">
                      ({{ numberToWords(item.payedAmount) }}
                      <span class="text-bold">
                        {{ $t("shared.labels.rial") }}
                      </span>
                      )
                    </span>
                  </span>
                </td>
                <td>
                  <span class="">{{ item.payedAmount.toLocaleString() }}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import BackButton from "src/components/shared/buttons/GoBackLink.vue";
import { numberToWords } from "@persian-tools/persian-tools";

const items = ref([
  {
    subject: "طرح 2 حسابداری آنلاین لاندا ویژه کسب‌وکارهای کوچک",
    amount: 490000,
    discountAmount: 150000,
    payedAmount: 490000,
  },
]);
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
