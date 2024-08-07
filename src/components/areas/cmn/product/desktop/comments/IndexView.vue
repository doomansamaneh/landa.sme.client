<template>
  <q-card flat>
    <q-card-section>
      <div class="text-body1 q-mb-md">
        <q-icon name="o_comment" size="sm" class="icon q-pr-sm" />
        یادداشت
      </div>
      <div class="row">
        <div class="col-md-9 col-sm-12 col-xs-12">
          <q-editor
            v-model="editor"
            placeholder="در اینجا می‌توانید یادداشت بگذارید..."
          />
          <q-btn
            @click="saveComment"
            flat
            rounded
            class="primary-gradient text-white q-mt-md"
          >
            <q-icon name="o_comment" size="xs" class="q-mr-sm" />
            <span>ذخیره</span>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-pb-md text-body1">
        <q-icon name="o_history" size="sm" class="icon q-pr-sm" />
        تاریخچه
      </div>
      <div class="profile-timeline">
        <q-timeline color="accent">
          <q-timeline-entry
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            v-for="item in items"
            :key="item"
          >
            <template #default>
              <div class="row">
                <div class="col-md-9 col-sm-12 col-xs-12">
                  <q-card
                    class="bordered-1 no-shadow q-ml-xl q-pa-md"
                    :class="{ 'q-mr-md': $q.screen.gt.sm }"
                  >
                    <q-card-section
                      class="row justify-between items-center"
                    >
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
                          <span class="text-caption">
                            چند دقیقه پیش
                          </span>
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
                      <div
                        class="q-gutter-y-md"
                        v-show="editCommentBtn"
                      >
                        <q-editor v-model="editCommentValue" />
                        <div class="q-gutter-x-sm">
                          <q-btn
                            @click="editCommentBtn = false"
                            flat
                            rounded
                            class="primary-gradient text-white"
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
                        class="row justify-end"
                      >
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
                          @click="deleteAlert"
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
                </div>
              </div>
            </template>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";

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
