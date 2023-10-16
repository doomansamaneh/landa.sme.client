<template>
  <q-page-sticky
    class="z-1 bg-main q-px-xl q-py-md"
    position="top"
    expand
  >
    <q-toolbar class="rwo justify-between q-py-md q-mx-sm">
      <div class="row items-center q-gutter-md">
        <q-avatar size="48px">
          <img
            class="avatar"
            src="https://cdn.quasar.dev/img/avatar4.jpg"
          >
        </q-avatar>
        <div class="column q-mt-md">
          <q-item-label><span class="text-body2">خشایار شمالی</span></q-item-label>
          <q-item-label caption><span class="text-body2">توسعه دهنده وب</span></q-item-label>
        </div>
      </div>
      <div class="row text-h6">اطلاعات بیشتر</div>
    </q-toolbar>
  </q-page-sticky>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey q-mt-xl"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab
      name="profile"
      label="نمایه"
    />
    <q-tab
      name="quotes"
      label="پیش‌فاکتورها"
    />
    <q-tab
      name="invoices"
      label="فاکتورهای فروش"
    />
    <q-tab
      name="accountSummary"
      label="خلاصه حساب"
    />
    <q-tab
      name="history"
      label="تاریخچه"
    />
  </q-tabs>
  <q-tab-panels
    class="bordered border-radius-xs"
    v-model="tab"
    animated
  >
    <q-tab-panel name="profile">
      <div class="row justify-center">
        <div class="col-4 profile-section q-pa-xl">
          <div class="column items-center">
            <q-avatar size="150px">
              <img
                class="avatar"
                src="https://cdn.quasar.dev/img/avatar4.jpg"
              >
            </q-avatar>
            <div class="column items-center q-mt-md">
              <q-item-label><span class="text-subtitle1">خشایار شمالی</span></q-item-label>
              <q-item-label caption><span class="text-body2">توسعه دهنده وب</span></q-item-label>
            </div>
            <div class="column q-py-lg q-gutter-md">
              <q-btn
                flat
                class="bg-primary text-white"
              >آپلود تصویر جدید</q-btn>
              <q-btn
                outline
                class="text-on-dark"
              >حذف</q-btn>
            </div>
          </div>
        </div>
        <div class="row">
          <q-separator
            vertical
            inset
            class="q-mx-lg"
          />
        </div>
        <div class="col q-py-lg q-pr-lg q-pl-xl q-pr-xl">
          <div class="row justify-between items-center">
            <div class="text-on-dark text-bold text-body1">اطلاعات پایه</div>
            <div class="q-gutter-md">
              <q-btn
                flat
                class="bg-primary text-white"
              >
                <q-icon
                  name="o_edit"
                  size="xs"
                  class="q-mr-xs"
                />
                <span>ویرایش</span>
              </q-btn>
            </div>
          </div>
          <q-separator class="q-mt-md" />
          <div class="q-pt-md">
            <q-list
              bordered
              class="rounded-borders"
            >
              <q-expansion-item
                group="basicInfo"
                default-opened
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_headset_mic"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section class="text-subtitle1">
                    تماس
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <q-btn
                      unelevated
                      class="bg-primary text-white full-width q-pa-md"
                    >
                      <q-icon
                        name="o_add"
                        class="q-mr-xs"
                      />
                      <span>افزودن آیتم جدید</span>
                    </q-btn>
                    <div
                      v-for="item in phoneItems"
                      :key="item"
                    >
                      <div class="row bordered-1 q-pa-md q-my-md items-center">
                        <div class="col">
                          <div class="text-caption">
                            <q-icon
                              v-if="item.original"
                              name="o_check_circle"
                              class="q-mr-xs"
                              size="sm"
                              color="primary"
                            />
                            <span class="text-bold q-mr-sm">{{ `${item.name}:` }}</span>
                            <span class="">{{ item.value }}</span>
                          </div>
                        </div>
                        <div class="col-2 row justify-end items-center">
                          <div class="row q-gutter-x-sm">
                            <q-btn
                              outline
                              round
                              class="text-on-dark"
                              size="sm"
                              icon="o_edit"
                            />
                            <q-btn
                              outline
                              round
                              color="negative"
                              class="text-on-dark"
                              size="sm"
                              icon="o_delete"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                group="basicInfo"
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_my_location"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    نشانی
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <q-btn
                      unelevated
                      class="bg-primary text-white full-width q-pa-md"
                    >
                      <q-icon
                        name="o_add"
                        class="q-mr-xs"
                      />
                      <span>افزودن آیتم جدید</span>
                    </q-btn>
                    <div class="row bordered-1 q-pa-md q-mt-lg items-center">
                      <div class="col">
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">آدرس خانه:</span>
                          <span>تهران - شهرری - خیابان شهید رجایی - شهرک سیزده آبان - خیابان شهید رحیمی - خیابان شهید
                            عنایی - کوچه مهر 2 - پلاک 22</span>
                        </div>
                      </div>
                      <div class="col-2 row justify-end items-center">
                        <div class="row q-gutter-x-sm">
                          <q-btn
                            outline
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
                          <q-btn
                            outline
                            round
                            color="negative"
                            class="text-on-dark"
                            size="sm"
                            icon="o_delete"
                          />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                group="basicInfo"
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_credit_card"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    حساب بانکی
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <q-btn
                      unelevated
                      class="bg-primary text-white full-width q-pa-md"
                    >
                      <q-icon
                        name="o_add"
                        class="q-mr-xs"
                      />
                      <span>افزودن آیتم جدید</span>
                    </q-btn>
                    <div class="row bordered-1 q-pa-md q-mt-lg">
                      <div class="col q-gutter-sm">
                        <div class="row text-caption items-center">
                          <q-icon
                            name="o_account_balance"
                            color="primary"
                            size="xs"
                          />
                          <span class="text-bold q-ml-sm">بانک تجارت</span>
                        </div>
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">شماره حساب:</span>
                          <span>0481038280</span>
                        </div>
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">شماره کارت:</span>
                          <span>5859831129809389</span>
                        </div>
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">شماره شبا:</span>
                          <span>0000128550232209</span>
                        </div>
                      </div>
                      <div class="col-2 row justify-end items-center">
                        <div class="row q-gutter-x-sm">
                          <q-btn
                            outline
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
                          <q-btn
                            outline
                            round
                            color="negative"
                            class="text-on-dark"
                            size="sm"
                            icon="o_delete"
                          />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                group="basicInfo"
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_business"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    کسب و کار
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <div class="q-gutter-md text-caption">
                      <div class="row items-center">
                        <div class="col-3 text-bold">شناسه ملی:</div>
                        <div class="col">0481038280</div>
                      </div>
                      <div class="row items-center">
                        <div class="col-3 text-bold">شناسه اقتصادی:</div>
                        <div class="col">0481038280</div>
                      </div>
                      <div class="row items-center">
                        <div class="col-3 text-bold">شناسه کارگاه بیمه:</div>
                        <div class="col">0481038280</div>
                      </div>
                      <div class="row items-center">
                        <div class="col-3 text-bold">شماره ثبت:</div>
                        <div class="col">0481038280</div>
                      </div>
                      <div class="row items-center">
                        <div class="col-3 text-bold">تاریخ ثبت:</div>
                        <div class="col">0481038280</div>
                      </div>
                      <div class="row">
                        <div class="col-3 text-bold">شرح:</div>
                        <div class="col">این یک متن آزمایشی است که توسط خشایار شمالی برای آزمایش شرح نوشته شده است و معنای
                          خاصی ندارد.</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                group="basicInfo"
                class="basic-info"
              >
                <template #header>
                  <q-item-section
                    class="q-py-sm"
                    avatar
                  >
                    <q-icon
                      name="o_star"
                      size="xs"
                    />
                  </q-item-section>

                  <q-item-section>
                    فیلدهای سفارشی
                  </q-item-section>
                </template>
                <q-card class="no-border no-shadow">
                  <q-card-section>
                    <q-btn
                      unelevated
                      class="bg-primary text-white full-width q-pa-md"
                    >
                      <q-icon
                        name="o_add"
                        class="q-mr-xs"
                      />
                      <span>افزودن آیتم جدید</span>
                    </q-btn>
                    <div class="row bordered-1 q-pa-md q-mt-lg items-center">
                      <div class="col">
                        <div class="text-caption">
                          <span class="text-bold q-mr-sm">تلفن خانه:</span>
                          <span>02155511102</span>
                        </div>
                      </div>
                      <div class="col-2 row justify-end items-center">
                        <div class="row q-gutter-x-sm">
                          <q-btn
                            outline
                            round
                            class="text-on-dark"
                            size="sm"
                            icon="o_edit"
                          />
                          <q-btn
                            outline
                            round
                            color="negative"
                            class="text-on-dark"
                            size="sm"
                            icon="o_delete"
                          />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
    </q-tab-panel>

    <q-tab-panel name="quotes">
      <div class="text-h6">Alarms</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="invoices">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="accountSummary">
      <div class="text-h6">Movies</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </q-tab-panel>

    <q-tab-panel name="history">
      <div
        style="margin: 24px 68px 0 68px;"
        class="q-gutter-y-md"
      >
        <div class="text-body1"><q-icon
            name="o_comment"
            size="sm"
            class="icon q-pr-sm"
          />یادداشت</div>
        <q-editor
          v-model="editor"
          placeholder="در اینجا می‌توانید یادداشت بگذارید..."
        />
        <q-btn
          @click="saveComment"
          flat
          class="bg-primary text-white"
        >
          <q-icon
            name="o_comment"
            size="xs"
            class="q-mr-sm"
          />
          <span>ذخیره</span>
        </q-btn>
      </div>
      <div class="q-my-xl q-mx-lg">
        <div
          class="q-pb-md text-body1"
          style="margin: 0 40px;"
        ><q-icon
            name="o_history"
            size="sm"
            class="icon q-pr-sm"
          />تاریخچه</div>
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
                    />
                    <div>{{ item.name }}</div>
                    <div>{{ item.date }}</div>
                  </div>
                  <div class="row">
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
                  <div
                    class="q-gutter-y-md"
                    v-show="editCommentBtn"
                  >
                    <q-editor v-model="editCommentValue" />
                    <q-btn
                      @click="editCommentBtn = false"
                      flat
                      class="bg-primary text-white"
                    >
                      <q-icon
                        name="o_comment"
                        size="xs"
                        class="q-mr-sm"
                      />
                      <span>ذخیره</span>
                    </q-btn>
                  </div>
                  <div class="row justify-end">
                    <q-btn
                      @click="editComment"
                      unelevated
                      rounded
                      class="text-on-dark"
                    >
                      <q-icon
                        name="o_edit"
                        size="xs"
                        class="q-mr-sm"
                      />
                      <span>ویرایش</span>
                    </q-btn>
                    <q-btn
                      @click="() => deleteComment(item)"
                      unelevated
                      rounded
                      class="text-on-dark"
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
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref, onMounted } from "vue"
import "src/helpers/extensions";
const date = new Date()

const tab = ref('profile')
const editor = ref('')
const editCommentBtn = ref(false)
const phoneItems = [
  { name: "تلفن خانه", value: "02155511102", original: true },
  { name: "موبایل", value: "09338603196" },
  { name: "تلفن محل کار", value: "02144990022" },
]
const items = [
  { name: "خشایار شمالی", icon: "o_add", date: "1402/07/22 - 15:05:30", value: "ایجاد مخاطب", systemInfo: "MacOS 192.188.90.90" },
  { name: "خشایار شمالی", icon: "comment", date: "1402/07/22 - 15:05:30", value: "ایجاد یادداشت جدید", commentValue: "true", comment: "این یک متن تستی است که توسط خشایار شمالی برای آزمایش کامنت‌ها در تایم لاین سیستم حسابداری آنلاین لاندا ایجاد شده است و فاقد هرگونه اعتباری است.", systemInfo: "MacOS 192.188.90.90" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/21", value: "ویرایش مخاطب", systemInfo: "MacOS 192.188.90.90" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/20", value: "ویرایش مخاطب", systemInfo: "MacOS 192.188.70.290" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/18", value: "ویرایش مخاطب" },
  { name: "خشایار شمالی", icon: "o_edit", date: "1402/07/10", value: "ویرایش مخاطب" },
]
const editCommentValue = ref(items[1].comment)

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
}

const deleteComment = (comment) => {
  const index = items.indexOf(comment);
  if (index !== -1) {
    items.splice(index, 1);
  }
}

const editComment = () => {

  editCommentBtn.value = !editCommentBtn.value


}

</script>

<style lang="scss">
.profile-section {
  width: 400px;
}
</style>

