<template>
  <tool-bar title="فاکتور فروش" back-button buttons>
    <template #buttons>
      <q-btn
        :to="`/sls/invoice/edit/${id}`"
        class="bg-primary primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
        <!-- ({{ tableStore?.activeRow?.value?.code }}) -->
      </q-btn>
    </template>
  </tool-bar>

  <div class="form-container">
    <div class="row q-col-gutter-lg">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section class="q-gutter-y-sm">
            <invoice-header :model="formStore.model" />
            <invoice-body :model="formStore.model" :form-store="formStore" />
            <invoice-footer :model="formStore.model" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <div class="column q-gutter-y-sm">
              <div class="column q-gutter-y-xs">
                <span class="text-caption text-bold">خریدار</span>
                <a href="#" class="link text-body3"> نام مشتری </a>
              </div>

              <div class="column q-gutter-y-xs" v-if="item?.contractTitle">
                <span class="text-caption text-bold">قرارداد</span>
                <span class="text-body3"> قرارداد </span>
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
              align="left"
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
                                  <span class="text-caption"
                                    >چند دقیقه پیش</span
                                  >
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
                              <div
                                class="q-gutter-y-md"
                                v-show="editCommentBtn"
                              >
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
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";

import ToolBar from "src/components/shared/ToolBarDesktop.vue";
import InvoiceHeader from "./_HeaderSection.vue";
import InvoiceBody from "./_BodySection.vue";
import InvoiceFooter from "./_FooterSection.vue";

const props = defineProps({
  item: Object,
});
const formStore = useInvoiceModel(true);
const route = useRoute();

const tab = ref("main-info");
const editor = ref("");
const editCommentBtn = ref(false);
const id = computed(() => props.item?.id ?? route.params.id);

// onMounted(() => {
//   formStore.crudStore.getById(id.value);
// });
</script>
