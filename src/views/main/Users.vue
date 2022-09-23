<template>
  <div class="p-5 xl:px-0">
    <transition name="fade" mode="out-in">
      <FlashMessage
        message="loading..."
        v-if="loading && !users.length"
        key="loading"
      />
      <ul v-else class="mt-5">
        <li
          v-for="user in users"
          :key="user.id"
          class="flex items-center justify-between py-2 border-b"
        >
          <div class="inline-flex items-center space-x-2">
            <img
              v-if="user.avatar"
              :src="user.avatar"
              class="w-10 h-10 rounded-full"
              alt=""
            />
            <AvatarIcon class="w-10 h-10 text-gray-400 rounded-full" v-else />
            <span class="text-gray-600">{{ user.name }}</span>
          </div>
          <a
            :href="`mailto:${user.email}`"
            :title="user.emailVerified ? 'Verified' : 'Not Verified'"
            class="inline-flex items-center space-x-2"
          >
            <span class="hidden sm:inline">{{ user.email }}</span>
            <MailIcon
              class="w-8 h-8"
              :class="user.emailVerified ? 'text-green-400' : 'text-gray-300'"
            />
          </a>
        </li>
      </ul>
    </transition>
    <transition name="fade">
      <FlashMessage :error="error" v-if="error" key="error" />
    </transition>
    <transition name="fade">
      <BasePagination
        path="users"
        :meta="meta"
        :links="links"
        action="user/paginateUsers"
        v-if="meta && meta.last_page > 1"
      />
    </transition>
  </div>
</template>

<!-- <script>
import { mapGetters } from "vuex";
import store from "@/store/index";
import MailIcon from "@/components/common/icons/MailIcon.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";
import AvatarIcon from "@/components/common/icons/AvatarIcon.vue";
import BasePagination from "@/components/common/BasePagination.vue";

export default {
  name: "UsersView",
  components: { FlashMessage, BasePagination, MailIcon, AvatarIcon },
  computed: {
    ...mapGetters("user", ["loading", "error", "users", "meta", "links"]),
  },
  beforeRouteEnter(to, from, next) {
    const currentPage = parseInt(to.query.page) || 1;
    store.dispatch("user/getUsers", currentPage).then(() => {
      to.params.page = currentPage;
      next();
    });
  },
};
</script> -->

<script lang="ts">
export default {
  name: "UsersView",
};
</script>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useUserStore } from "@/store/user";

import MailIcon from "@/components/common/icons/MailIcon.vue";
import FlashMessage from "@/components/common/FlashMessage.vue";
import AvatarIcon from "@/components/common/icons/AvatarIcon.vue";
import BasePagination from "@/components/common/BasePagination.vue";

const store = useUserStore();
const { users, meta, links, loading, error } = storeToRefs(store);

beforeEnter((to, from, next) => {
  const currentPage = parseInt(to.query.page) || 1;
  store.getUsers(currentPage).then(() => {
    to.params.page = currentPage;
    next();
  });
});
</script>

