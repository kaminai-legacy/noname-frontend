<template>
  <div>
    <transition name="fade" mode="out-in">
      <FlashMessage message="loading..." v-if="loading && !messages.length" key="loading" />
      <ul v-else>
        <li v-for="message in messages" :key="message.id" class="flex py-2 space-x-2 border-b">
          <div>
            <img
              v-if="message.user.avatar"
              :src="message.user.avatar"
              class="w-10 h-10 rounded-full"
              alt=""
            />
            <AvatarIcon class="w-10 h-10 text-gray-400 rounded-full" v-else />
          </div>
          <div>
            <div class="flex space-x-2">
              <span class="font-bold">{{ message.user.name }}</span>
              <span class="text-gray-400">{{ message.createdAt }}</span>
            </div>
            <div class="text-gray-600">{{ message.body }}</div>
          </div>
        </li>
      </ul>
    </transition>
    <transition name="fade">
      <FlashMessage :error="error" v-if="error" key="error" />
    </transition>
    <transition name="fade">
      <BasePagination
        :meta="meta"
        :links="links"
        :store="store"
        action="paginateMessages"
        v-if="meta && parseInt(meta.last_page) > 1"
      />
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Messages',
}
</script>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useMessageStore } from '@/store/message'

import FlashMessage from '@/components/main_layout/FlashMessage.vue'
import AvatarIcon from '@/components/common/icons/AvatarIcon.vue'
import BasePagination from '@/components/main_layout/BasePagination.vue'

const store = useMessageStore()
const { messages, meta, links, loading, error } = storeToRefs(store)

const currentPage = 1
store.getMessages(currentPage)
</script>
