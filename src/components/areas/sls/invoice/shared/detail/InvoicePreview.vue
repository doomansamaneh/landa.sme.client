<template>
  <tool-bar>
    <template #header>
      <span
        v-if="$q.screen.gt.xs"
        class="q-mr-sm"
        :class="$q.screen.gt.xs ? 'text-h6' : 'text-body1'"
      >
        فاکتور #1 برای خشایار شمالی
      </span>
      <div
        v-if="$q.screen.lt.sm"
        :class="$q.screen.lt.sm ? 'text-h6' : 'text-body1'"
      >
        <q-btn
          round
          dense
          unelevated
          icon="o_info"
          @click="showCustomerDetail"
        />
      </div>
      <q-btn padding="6px 12px" flat @click="$router.go(-1)">
        <q-icon name="arrow_back" size="sm" />
      </q-btn>
    </template>
    <template #buttons>
      <q-btn
        to="/sls/invoice/create"
        class="bg-primary text-white text-caption"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        <q-icon name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
      </q-btn>

      <q-btn class="bordered-btn_bg-dark text-caption" rounded unelevated>
        <q-icon name="more_horiz" class="q-mr-xs" />
        {{ $t("shared.labels.more") }}
        <q-menu fit :offset="[0, 20]">
          <q-list dense padding style="width: 200px">
            <q-item clickable v-close-popup tabindex="0">
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_refresh" size="14px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تازه‌سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup tabindex="0">
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_close" size="14px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">غیر‌فعال‌سازی</div>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup tabindex="0">
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_check" size="14px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">فعال سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup tabindex="0">
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_download" size="16px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تبدیل به اکسل</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar>
  <div class="row q-col-gutter-lg q-mt-lg">
    <div class="col-md col-sm-12 col-xs-12">
      <q-card class="bordered no-shadow">
        <q-card-section>
          <div class="row q-gutter-y-md q-py-md">
            <div
              class="col-md col-sm col-xs-12 row items-center"
              :class="$q.screen.lt.sm ? 'justify-center' : ''"
            >
              <img
                style="width: 72px"
                src="/landa-sme-logo.png"
                alt="landa-sme"
              />
            </div>
            <div
              class="col-md col-sm-5 col-xs-12 row items-center justify-center"
            >
              <span class="text-subtitle1 text-bold">
                {{ $t("page.payment-detail.invoice-label") }}
              </span>
            </div>
            <div
              class="col-md col-sm col-xs-12 row items-center"
              :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
            >
              <div class="column q-gutter-sm text-right text-caption">
                <div
                  class="row items-center"
                  :class="$q.screen.lt.sm ? 'justify-center' : 'justify-start'"
                >
                  <span>{{ $t("page.payment-detail.invoice-date") }}</span>
                  {{ item?.dateString }}
                </div>
                <div
                  class="row items-center"
                  :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
                >
                  <span>
                    {{ $t("page.payment-detail.invoice-number") }}
                  </span>
                  {{ item?.no }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="q-pb-none">
          <div class="column">
            <div class="row q-col-gutter-lg">
              <div
                class="col-md col-sm col-xs-12 text-body3"
                :class="$q.screen.lt.sm ? 'text-center' : ''"
              >
                <div class="text-weight-bold q-mb-sm">
                  {{ $t("page.payment-detail.seller") }}
                  <span class="text-weight-thin"> حسابداری آنلاین لاندا </span>
                </div>
                <div>
                  <span class="line-height-xs">
                    شهر جدید اندیشه، شهرک صدف، بلوار دکتر قریب، مجتمع اداری
                    زیتون، واحد 105
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
                  <span class="text-weight-light">
                    {{ item?.customerName }}
                  </span>
                </div>
                <div>
                  <span class="line-height-xs">-</span>
                  <div class="q-pt-xs">
                    <q-icon name="phone" class="dark-2 q-pr-xs" />
                    -
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
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
              <tbody>
                <tr>
                  <td class=""><span class="">1</span></td>
                  <td>
                    <div
                      :style="$q.screen.lt.sm ? 'width:300px' : 'width:auto'"
                      class="ellipsis-2-lines"
                    >
                      <div>
                        <span>
                          {{ item?.subject }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{{ item?.amount }}</div>
                  </td>
                  <td>
                    <div>دستگاه</div>
                  </td>
                  <td>
                    <div>
                      {{ item?.amount.toLocaleString() }}
                    </div>
                  </td>
                  <td>
                    <div>
                      {{ item?.payedAmount.toLocaleString() }}
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
                      {{ item?.discountAmount }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="text-right" colspan="5">
                    <span class="q-pl-xs text-bold"> جمع کل: </span>
                    <span class="">
                      <span class="">
                        (یازده میلیون و هفتصد و هفده هزار و پانصد
                        <span class="text-bold">
                          {{ $t("shared.labels.rial") }}
                        </span>
                        )
                      </span>
                    </span>
                  </td>
                  <td><span class="">11,717,500</span></td>
                </tr>
              </tbody>
            </table>
            <table class="text-caption">
              <tr>
                <td colspan="6">
                  <span class="text-bold">توضیحات:</span>
                </td>
              </tr>
              <tr>
                <td class="sign-place">
                  <span> مهر و امضای فروشنده</span>
                </td>
                <td class="sign-place">
                  <span>مهر و امضای خریدار</span>
                </td>
              </tr>
            </table>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <q-card class="bordered no-shadow">
        <q-card-section>
          <div class="column q-gutter-y-sm">
            <div class="column q-gutter-y-xs">
              <span class="text-caption text-bold">خریدار</span>
              <a href="#" class="link text-body3">
                {{ item?.customerName }}
              </a>
            </div>

            <div class="column q-gutter-y-xs" v-if="item?.contractTitle">
              <span class="text-caption text-bold">قرارداد</span>
              <span class="text-body3">
                {{ item?.contractTitle }}
              </span>
            </div>

            <div class="column q-gutter-y-xs">
              <span class="text-caption text-bold">بازاریاب</span>
              <span class="text-body3">مهندس ملکی</span>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <q-tabs
            v-model="tab"
            inline-label
            outside-arrows
            dense
            indicator-color="primary"
            class="text-on-dark"
          >
            <q-tab name="main-info" class="q-py-sm">
              <template #default>
                <q-icon name="o_description" size="xs" class="q-mr-sm" />
                <div class="text-body3 text-bold">اطلاعات اصلی</div>
              </template>
            </q-tab>
            <q-tab name="tax" class="q-py-sm">
              <template #default>
                <q-icon name="o_paid" size="xs" class="q-mr-sm" />
                <div class="text-body3 text-bold">مالیات</div>
              </template>
            </q-tab>
            <q-tab name="history" class="q-py-sm">
              <template #default>
                <q-icon name="o_history" size="xs" class="q-mr-sm" />
                <div class="text-body3 text-bold">تاریخچه</div>
              </template>
            </q-tab>
          </q-tabs>

          <q-tab-panels v-model="tab" animated keep-alive class="transparent">
            <q-tab-panel name="main-info" class="no-padding">
              <div class="row q-py-lg q-gutter-sm">
                <q-btn color="primary" padding="4px 12px" unelevated>
                  <q-icon name="o_add" size="xs" class="q-mr-xs" />
                  <span>دریافت</span>
                </q-btn>

                <q-btn color="primary" padding="4px 12px" unelevated>
                  <q-icon name="o_check" size="xs" class="q-mr-xs" />
                  <span>تسویه حساب</span>
                </q-btn>

                <q-btn color="primary" padding="4px 12px" unelevated flat>
                  <q-icon name="o_description" size="xs" class="q-mr-xs" />
                  <span>سند حسابداری</span>
                </q-btn>
              </div>

              <div class="row text-body3 q-gutter-x-sm">
                <div class="col-7 flex">جمع کل:</div>
                <div class="col text-bold">3,000,000</div>
              </div>

              <div class="row items-center q-gutter-x-xs q-my-md">
                <q-icon name="o_arrow_downward" color="primary" size="xs" />
                <span class="text-body3 text-bold">دریافتها</span>
              </div>

              <div class="row text-body3 q-gutter-x-sm q-mt-md">
                <div class="col-7 row items-center">
                  <q-btn
                    size="sm"
                    dense
                    round
                    unelevated
                    flat
                    color="red"
                    icon="o_delete"
                    class="q-mr-xs"
                  />
                  <span class="text-body3">دریافت - تسویه حساب:</span>
                </div>
                <div class="col text-body3">27,000,000</div>
              </div>

              <div class="row text-body3 q-gutter-x-sm q-mt-md">
                <div class="col-7 flex">
                  <a href="#" class="link">دریافت - 27/09/1402:</a>
                </div>
                <div class="col">3,000,000</div>
              </div>

              <q-separator color="positive" size="2px" class="q-mt-md" />

              <div class="row text-body3 q-gutter-x-sm q-mt-md">
                <div class="col-7 row items-center">
                  <span class="text-body3 text-bold">جمع دریافتی:</span>
                </div>
                <div class="col text-body3 text-bold">30,000,000</div>
              </div>

              <q-separator color="red" size="2px" class="q-mt-md" />

              <div class="row text-body3 q-gutter-x-sm q-mt-md">
                <div class="col-7 row items-center">
                  <span class="text-body3 text-bold">مانده:</span>
                </div>
                <div class="col text-body3 text-bold">0</div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="tax" class="no-padding">
              <div class="row q-py-lg">
                <q-btn
                  color="red"
                  padding="4px 12px"
                  unelevated
                  class="red-shadow"
                >
                  <q-icon name="o_arrow_upward" size="xs" class="q-mr-xs" />
                  <span>ارسال به سامانه مودیان</span>
                </q-btn>
              </div>
            </q-tab-panel>

            <q-tab-panel name="history" class="no-padding">
              <div class="q-my-lg">
                <div class="invoice-preview-timeline">
                  <q-timeline color="accent">
                    <q-timeline-entry
                      avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                      v-for="item in items"
                      :key="item"
                    >
                      <template #default>
                        <q-card class="bordered-1 no-shadow q-ml-sm">
                          <q-card-section
                            class="row justify-between items-center q-gutter-sm"
                          >
                            <div class="row items-center q-gutter-x-sm">
                              <q-icon
                                :name="item.icon"
                                size="sm"
                                color="accent"
                              />
                              <div class="text-caption text-bold">
                                {{ item.name }}
                              </div>
                              <div class="row items-center">
                                <span class="text-caption">چند دقیقه پیش</span>
                                <q-tooltip
                                  transition-show="scale"
                                  transition-hide="scale"
                                  :delay="700"
                                  class="custom-tooltip text-caption"
                                >
                                  {{ item.date }}
                                </q-tooltip>
                              </div>
                            </div>
                            <q-item-label class="row text-caption-sm" caption>
                              {{ item.systemInfo }}
                            </q-item-label>
                          </q-card-section>
                          <q-card-section
                            v-if="item.commentValue"
                            class="q-pt-none"
                          >
                            <p
                              class="text-caption line-height-xs no-letter-spacing"
                              contenteditable="true"
                              v-show="!editCommentBtn"
                            >
                              {{ item.comment }}
                            </p>
                            <div class="q-gutter-y-md" v-show="editCommentBtn">
                              <q-editor
                                v-model="editCommentValue"
                                class="text-caption"
                              />
                              <div class="q-gutter-x-sm">
                                <q-btn
                                  @click="editCommentBtn = false"
                                  padding="4px 12px"
                                  flat
                                  rounded
                                  class="bg-primary text-white text-body3"
                                >
                                  <q-icon
                                    name="o_comment"
                                    size="xs"
                                    class="q-mr-sm"
                                  />
                                  <span>ذخیره</span>
                                </q-btn>
                                <q-btn
                                  @click="editCommentBtn = false"
                                  unelevated
                                  rounded
                                  class="text-on-dark"
                                >
                                  <q-icon
                                    name="o_close"
                                    size="xs"
                                    class="q-mr-xs"
                                  />
                                  <span>انصراف</span>
                                </q-btn>
                              </div>
                            </div>
                            <div
                              v-if="!editCommentBtn"
                              class="row justify-start"
                            >
                              <q-btn
                                @click="editComment"
                                padding="4px 12px"
                                unelevated
                                rounded
                                class="text-on-dark text-body3"
                              >
                                <q-icon
                                  name="o_edit"
                                  size="xs"
                                  class="q-mr-sm"
                                />
                                <span>ویرایش</span>
                              </q-btn>
                              <q-btn
                                @click="deleteAlert"
                                padding="4px 12px"
                                unelevated
                                rounded
                                class="text-on-dark text-body3"
                              >
                                <q-icon
                                  name="o_delete"
                                  size="xs"
                                  class="q-mr-sm"
                                />
                                <span>حذف</span>
                              </q-btn>
                            </div>
                          </q-card-section>
                        </q-card>
                      </template>
                    </q-timeline-entry>
                  </q-timeline>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <q-dialog v-model="customerDetail">
    <q-card>
      <q-card-section>
        <div class="column q-gutter-sm">
          <span> شماره فاکتور: 1 </span>

          <span>به نام: خشایار شمالی</span>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

import ToolBar from "src/components/shared/ToolBar.vue";
import DeleteAlert from "src/components/areas/crm/customer/desktop/preview/DeleteAlert.vue";

const $q = useQuasar();

const props = defineProps({
  item: Array,
});

const customerDetail = ref(false);
const tab = ref("main-info");
const editor = ref("");
const editCommentBtn = ref(false);

const items = [
  {
    name: "خشایار شمالی",
    icon: "o_add",
    date: "1402/07/22 - 15:05:30",
    value: "ایجاد مخاطب",
    systemInfo: "MacOS 192.188.90.90",
  },
  {
    name: "خشایار شمالی",
    icon: "o_maps_ugc",
    date: "1402/07/22 - 15:05:30",
    value: "ایجاد یادداشت جدید",
    commentValue: "true",
    comment:
      "این یک متن تستی است که توسط خشایار شمالی برای آزمایش کامنت‌ها در تایم لاین سیستم حسابداری آنلاین لاندا ایجاد شده است و فاقد هرگونه اعتباری است.",
    systemInfo: "MacOS 192.188.90.90",
  },
  {
    name: "خشایار شمالی",
    icon: "o_edit",
    date: "1402/07/21",
    value: "ویرایش مخاطب",
    systemInfo: "MacOS 192.188.90.90",
  },
  {
    name: "خشایار شمالی",
    icon: "o_edit",
    date: "1402/07/20",
    value: "ویرایش مخاطب",
    systemInfo: "MacOS 192.188.70.290",
  },
  {
    name: "خشایار شمالی",
    icon: "o_edit",
    date: "1402/07/18",
    value: "ویرایش مخاطب",
  },
  {
    name: "خشایار شمالی",
    icon: "o_edit",
    date: "1402/07/10",
    value: "ویرایش مخاطب",
  },
];

const editCommentValue = ref(items[1].comment);

const saveComment = () => {
  if (editor.value.trim() !== "") {
    const newComment = {
      name: "خشایار شمالی",
      icon: "comment",
      date: "1402/07/24",
      commentValue: true,
      comment: editor.value,
      systemInfo: "MacOS 192.188.90.90",
    };

    items.push(newComment);
    editor.value = "";
  }
};

const deleteComment = (comment) => {
  const index = items.indexOf(comment);
  if (index !== -1) {
    items.splice(index, 1);
  }
};

const editComment = () => {
  editCommentBtn.value = !editCommentBtn.value;
};

const deleteAlert = () => {
  $q.dialog({
    component: DeleteAlert,
  });
};

const showCustomerDetail = () => {
  customerDetail.value = true;
};
</script>

<style lang="scss" scoped>
.sme-logo {
  width: 72px;
}

.sign-place {
  width: 50%;
  padding-bottom: 120px;
}

table,
td,
th {
  border: none;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 24px 8px;
}
</style>
