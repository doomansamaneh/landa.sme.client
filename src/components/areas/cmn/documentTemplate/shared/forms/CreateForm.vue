<template>
  <form-toolbar-container
    :title="title"
    @submit-call-back="handleSave"
  />

  <q-form ref="form" autofocus>
    <div class="row q-col-gutter-md">
      <div class="col-md-4">
        <div class="column q-gutter-md">
          <q-card bordered>
            <q-card-section>
              <custom-input
                :label="$t('shared.labels.templateName')"
                v-model="model.title"
                required
              />
              <div class="column q-gutter-md q-pt-md">
                <div>
                  <q-checkbox
                    dense
                    size="44px"
                    v-model="model.isDefault"
                    :label="$t('shared.labels.default')"
                  />
                </div>
                <div>
                  <q-checkbox
                    class="q-pb-sm"
                    dense
                    size="44px"
                    v-model="model.isActive"
                    :label="$t('shared.labels.isActive')"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card bordered class="overflow-hidden">
            <q-card-section class="q-pa-none">
              <q-list separator class="rounded-borders">
                <q-expansion-item
                  icon="o_description"
                  label="سربرگ"
                  default-opened
                  class="settings-expansion-item"
                  group="settings"
                >
                  <q-card-section class="column q-gutter-md q-pt-sm">
                    <custom-input
                      :label="$t('shared.labels.invoiceTitleInPrint')"
                      v-model="headerTitle"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showHeader"
                      label="سربرگ"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showLogo"
                      label="لوگو"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showInvoiceInfo"
                      label="شماره و تاریخ"
                    />
                  </q-card-section>
                </q-expansion-item>

                <q-expansion-item
                  icon="o_people"
                  label="فروشنده و خریدار"
                  class="settings-expansion-item"
                  group="settings"
                >
                  <q-card-section class="column q-gutter-md q-pt-sm">
                    <q-checkbox
                      class="q-pb-sm"
                      dense
                      size="44px"
                      v-model="designer.isAdvancedModeSellerBuyer"
                      label="حالت پیشرفته"
                      @update:model-value="
                        onAdvancedModeSellerBuyerChange
                      "
                    />
                    <q-toggle
                      dense
                      v-model="designer.showSellerInfo"
                      label="فروشنده"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showCustomerInfo"
                      label="خریدار"
                    />
                  </q-card-section>
                </q-expansion-item>

                <q-expansion-item
                  icon="o_table_chart"
                  label="اقلام فاکتور"
                  class="settings-expansion-item"
                  group="settings"
                >
                  <q-card-section class="column q-gutter-md q-pt-sm">
                    <q-checkbox
                      class="q-pb-sm"
                      dense
                      size="44px"
                      v-model="designer.isAdvancedModeInvoiceItems"
                      label="حالت پیشرفته"
                      @update:model-value="
                        onAdvancedModeInvoiceItemsChange
                      "
                    />
                    <q-toggle
                      dense
                      v-model="designer.showInvoiceItems"
                      label="اقلام فاکتور"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showRemained"
                      label="مانده"
                    />

                    <q-list separator class="rounded-borders">
                      <template
                        v-for="col in columnsForDisplay"
                        :key="`col-${col.field}`"
                      >
                        <q-item
                          :draggable="col.isSelected"
                          :class="{
                            'draggable-item': col.isSelected,
                          }"
                          @dragstart="
                            col.isSelected &&
                              onColumnDragStart(
                                getColumnIndex(col.field),
                                $event
                              )
                          "
                          @dragover.prevent
                          @drop.prevent="
                            col.isSelected &&
                              onColumnDrop(
                                getColumnIndex(col.field),
                                $event
                              )
                          "
                          @dragend="
                            col.isSelected && onColumnDragEnd($event)
                          "
                          class="q-px-none"
                        >
                          <q-item-section avatar>
                            <q-icon
                              name="o_drag_indicator"
                              color="grey-6"
                            />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>
                              {{ col.label }}
                            </q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-checkbox
                              :model-value="
                                columnCheckboxState[col.field]
                              "
                              @update:model-value="toggleColumn(col)"
                              checked-icon="task_alt"
                              unchecked-icon="panorama_fish_eye"
                              size="md"
                              dense
                              @click.stop
                            />
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-list>
                  </q-card-section>
                </q-expansion-item>

                <q-expansion-item
                  icon="o_description"
                  label="پاورقی"
                  class="settings-expansion-item"
                  group="settings"
                >
                  <q-card-section class="column q-gutter-md q-pt-sm">
                    <q-toggle
                      dense
                      v-model="designer.showFooter"
                      label="پاورقی"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showSummary"
                      label="شرح"
                    />

                    <custom-input
                      :label="$t('shared.labels.invoiceDescription')"
                      v-model="footerNote"
                      type="textarea"
                      autogrow
                    />

                    <q-toggle
                      dense
                      v-model="designer.showContract"
                      label="قرارداد"
                    />
                    <q-toggle
                      dense
                      v-model="designer.showSignature"
                      label="امضا"
                    />
                  </q-card-section>
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="col-md">
        <q-card bordered class="preview-card">
          <q-inner-loading :showing="isLoadingTemplate">
            <q-spinner size="50px" color="primary" />
          </q-inner-loading>
          <div v-html="renderedTemplate"></div>
        </q-card>
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { useQuasar } from "quasar";
  import { useDocumentTemplate } from "src/components/areas/cmn/documentTemplate/shared/_composables/useDocumentTemplate";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";

  // -------------------------
  // Props
  // -------------------------
  const props = defineProps({
    action: String,
    title: String,
  });

  // -------------------------
  // Constants
  // -------------------------
  const defaultTemplate = `<div class="q-card__section q-card__section--vert q-pb-none" name="header"><table style="width: 100%;"><tbody><tr><td style="width: 25%;" name="logo"><img src="{{logoSrc}}" alt="logo"></td><td><div class="text-center text-body2 text-bold">{{headerTitle}}</div></td><td style="width: 25%;" name="invoiceInfo"><div><span>شماره:</span><span class="q-px-sm text-weight-600">{{no}}</span></div><div><span>تاریخ:</span><span class="q-px-sm text-weight-600">{{date}}</span></div></td></tr></tbody></table></div><div class="q-card__section q-card__section--vert q-gutter-y-sm"><div class="q-table__middle scroll"><table class="print-preview-table" data-mode="simple" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 13px;"><tbody name="sellerInfo"><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;"><div>فروشنده: <strong>{{sellerName}}</strong></div><div>نشانی: <strong>{{sellerLocation}} - </strong><span class="text-wrap">{{sellerAddress}}</span></div></td></tr></tbody><tbody name="customerInfo"><tr><td style="border-width: 1px; border-style: solid; border-image: initial; padding: 3px;"><div>مشتری: <strong>{{customerName}}</strong><span> / شناسه ملی: {{customerNationalNo}}</span></div><div>نشانی: <strong>{{customerLocation}} - </strong><span class="text-wrap">{{customerAddress}}</span><span> / <strong>کد پستی:</strong> {{customerPostalCode}}</span></div><div>تلفن: {{customerPhone}}</div></td></tr></tbody></table></div><div class="q-table__middle scroll" name="invoiceItems"><table class="print-preview-table" data-mode="simple" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 12.4px;"><thead><tr><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">ردیف</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">کالا / خدمت</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">تعداد/مقدار</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">مبلغ واحد</th><th style="border-width: 1px; border-style: solid; border-image: initial; padding: 5px;">جمع کل (ریال) </th></tr></thead><tbody>{{#items}}<tr><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{rowNo}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><div class="text-wrap">{{productDisplay}} <small>{{commentDisplay}}</small></div></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{quantity}} <small>({{productUnitTitle}})</small></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{price}}</td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;">{{totalPrice}}</td></tr>{{/items}}<tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">سرجمع: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalNetPrice}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">تخفیف: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalDiscount}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">ارزش افزوده: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalVat}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;">جمع مقدار: </td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalQuantity}}</strong></td></tr><tr><td colspan="4" class="text-right" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: end;"><strong>جمع کل:</strong></td><td style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>{{totalPrice}}</strong> {{currencyTitle}}</td></tr></tbody></table></div><div class="q-table__middle scroll" name="footer"><table class="print-preview-table" style="width: 100%; border-width: 1px; border-style: solid; border-image: initial; border-collapse: collapse; font-size: 13px;"><tbody><tr name="remained"><td colspan="100%" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; text-align: left;"><span><strong style="padding: 0px 5px;">جمع دریافتی</strong> {{remainedPayedAmount}}</span><span><strong style="padding: 0px 5px;">مانده</strong><span class="text-weight-600">{{remainedAmount}}</span></span><span><strong style="padding: 0px 5px;">مانده از قبل</strong><span class="text-weight-600">{{remainedOtherRemained}}</span></span><span><strong style="padding: 0px 5px;">جمع مانده</strong> {{remainedTotalRemained}}</span></td></tr><tr name="summary"><td colspan="100%" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial;"><strong>شرح</strong><div><strong name="contract">{{contractTitle}}<span style="padding: 5px;"> / </span></strong><span class="text-wrap">{{summary}}</span></div><div class="text-wrap">{{footerNote}}</div></td></tr><tr name="signature"><td colspan="100%" class="text-body2 vertical-top" style="padding: 5px; border-width: 1px; border-style: solid; border-image: initial; width: 50%; height: 90px;">مهر و امضا فروشنده <div><img src="{{signatureSrc}}" alt="signature" style="width: 120px;"></div></td></tr></tbody></table></div></div>`;

  // -------------------------
  // Composables & Stores
  // -------------------------
  const $q = useQuasar();

  const form = ref(null);
  const model = ref({
    title: "",
    isActive: true,
    isDefault: false,
    body: "",
  });

  const formStore = useBaseInfoModel({
    model: model,
    baseRoute: "cmn/documentTemplate",
  });

  // Use the composable
  const {
    logoSrc,
    signatureSrc,
    draggedColumnIndex,
    isDragging,
    templateHtml,
    isLoadingTemplate,
    designer,
    previewData,
    columnsForDisplay,
    columnCheckboxState,
    renderedTemplate,
    getColumnIndex,
    toggleColumn,
    onColumnDragStart,
    onColumnDrop,
    onColumnDragEnd,
    onAdvancedModeSellerBuyerChange,
    onAdvancedModeInvoiceItemsChange,
    loadTemplateConfig,
    loadMediaAssets,
    buildFinalTemplate,
    replaceTemplateVariable,
    headerTitle,
    footerNote,
  } = useDocumentTemplate(defaultTemplate);

  // -------------------------
  // Event Handlers
  // -------------------------
  async function handleSave() {
    const finalTemplate = buildFinalTemplate();

    // Copy rendered template to clipboard
    try {
      const renderedHtml = renderedTemplate.value;
      await navigator.clipboard.writeText(renderedHtml);
      $q.notify({
        type: "positive",
        message: "قالب رندر شده با موفقیت کپی شد",
        position: "top",
      });
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "خطا در کپی کردن قالب",
        position: "top",
      });
    }

    model.value.body = finalTemplate;
    formStore.submitForm(form.value, props.action);
  }

  // -------------------------
  // Lifecycle
  // -------------------------
  onMounted(async () => {
    isLoadingTemplate.value = true;
    try {
      await loadMediaAssets();
      await loadTemplateConfig(model?.value?.body);
    } finally {
      isLoadingTemplate.value = false;
    }
  });
</script>

<style lang="scss">
  .draggable-item {
    cursor: grab !important;

    &:active,
    &.dragging {
      cursor: grabbing !important;
    }
  }

  [hidden] {
    display: none !important;
  }

  .preview-card {
    min-height: 450px;
  }
</style>
