<template>
  <toolbar back-button title="کاردکس کالا" />

  <q-card class="bordered">
    <q-card-section class="q-pa-xl">
      <div class="row q-col-gutter-md">
        <div class="col-2">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >کد</q-item-label
          >
          <q-field dense outlined>
            <template v-slot:control>
              <div>0310c</div>
            </template>
          </q-field>
        </div>
        <div class="col-3">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >عنوان</q-item-label
          >
          <q-field dense outlined>
            <template v-slot:control>
              <div>نرم افزار حسابداری</div>
            </template>
          </q-field>
        </div>
        <div class="col-2">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >گروه</q-item-label
          >
          <q-field dense outlined>
            <template v-slot:control>
              <div>برق و کامپیوتر</div>
            </template>
          </q-field>
        </div>
        <div class="col-2">
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >موجودی اول دوره</q-item-label
          >
          <q-field dense outlined>
            <template v-slot:control>
              <div>10.00</div>
            </template>
          </q-field>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <div>
    <q-tabs
      v-model="tab"
      class="border-radius-xs bg-primary text-white q-mt-lg"
      indicator-color="white"
      align="justify"
      inline-label
      narrow-indicator
    >
      <q-tab name="turnover-detail" label="ریز گردش" icon="o_manage_search" />
      <q-tab name="sales" label="آمار فروش" icon="o_assignment" />
      <q-tab name="history" label="تاریخچه" icon="o_history" />
    </q-tabs>

    <q-tab-panels
      class="bordered rounded-borders q-mt-md"
      v-model="tab"
      animated
    >
      <q-tab-panel class="no-padding" name="turnover-detail">
        <data-grid :toolbar="false" :grid-store="gridStore" />
      </q-tab-panel>

      <q-tab-panel name="sales">
        <h2>آمار فروش</h2>
      </q-tab-panel>

      <q-tab-panel name="history">
        <div style="margin: 24px 56px 0 56px" class="q-gutter-y-md">
          <div class="text-body1">
            <q-icon name="o_comment" size="sm" class="icon q-pr-sm" />یادداشت
          </div>
          <q-editor
            v-model="editor"
            placeholder="در اینجا می‌توانید یادداشت بگذارید..."
          />
          <q-btn
            @click="saveComment"
            flat
            rounded
            class="bg-primary text-white"
          >
            <q-icon name="o_comment" size="xs" class="q-mr-sm" />
            <span>ذخیره</span>
          </q-btn>
        </div>
        <div class="q-my-xl q-mx-md">
          <div class="q-pb-md text-body1" style="margin: 0 38px">
            <q-icon name="o_history" size="sm" class="icon q-pr-sm" />تاریخچه
          </div>
          <div class="profile-timeline">
            <q-timeline color="accent">
              <q-timeline-entry
                avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                v-for="item in items"
                :key="item"
              >
                <template #default>
                  <q-card class="bordered-1 no-shadow q-mx-xl q-pa-md">
                    <q-card-section class="row justify-between items-center">
                      <div class="row items-center q-gutter-sm">
                        <q-icon
                          :name="item.icon"
                          size="sm"
                          color="accent"
                          class="q-mr-sm"
                        />
                        <div class="text-caption text-bold">
                          {{ item.name }}
                        </div>
                        <div class="row items-center">
                          <span class="text-caption">چند دقیقه پیش</span>
                          <q-tooltip
                            transition-show="scale"
                            transition-hide="scale"
                            anchor="center left"
                            self="center right"
                            :offset="[10, 10]"
                            :delay="700"
                            class="glass text-on-dark text-caption"
                          >
                            {{ item.date }}
                          </q-tooltip>
                        </div>
                      </div>
                      <div class="row text-caption">
                        {{ item.systemInfo }}
                      </div>
                    </q-card-section>
                    <q-card-section v-if="item.commentValue">
                      <p
                        class="line-height-sm"
                        contenteditable="true"
                        v-show="!editCommentBtn"
                      >
                        {{ item.comment }}
                      </p>
                      <div class="q-gutter-y-md" v-show="editCommentBtn">
                        <q-editor v-model="editCommentValue" />
                        <div class="q-gutter-x-sm">
                          <q-btn
                            @click="editCommentBtn = false"
                            flat
                            rounded
                            class="bg-primary text-white"
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
                            <q-icon name="o_close" size="xs" class="q-mr-xs" />
                            <span>انصراف</span>
                          </q-btn>
                        </div>
                      </div>
                      <div v-if="!editCommentBtn" class="row justify-end">
                        <q-btn
                          @click="editComment"
                          unelevated
                          rounded
                          class="text-on-dark"
                        >
                          <q-icon name="o_edit" size="xs" class="q-mr-sm" />
                          <span>ویرایش</span>
                        </q-btn>
                        <q-btn
                          @click="deleteAlert"
                          unelevated
                          rounded
                          class="text-on-dark"
                        >
                          <q-icon name="o_delete" size="xs" class="q-mr-sm" />
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useProductGrid } from "src/components/areas/cmn/_composables/useProductGrid";

import Toolbar from "src/components/shared/ToolBar.vue";
import DeleteAlert from "src/components/areas/crm/customer/desktop/preview/DeleteAlert.vue";
import DataGrid from "src/components/areas/cmn/product/desktop/index/DataGrid.vue";

const gridStore = useProductGrid();

const tab = ref("turnover-detail");
const $q = useQuasar();
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
</script>
