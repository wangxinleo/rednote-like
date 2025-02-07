<template>
  <div class="feeds-page">
    <div class="channel-container" v-if="!unshowChannel">
      <div class="scroll-container channel-scroll-container">
        <div class="content-container">
          <div
            v-for="channel in channels"
            :key="channel.id"
            :class="['channel', { active: channel.isActive }]"
            @click="handleChannelClick(channel)"
          >
            {{ channel.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="loading-container" v-if="loading">
      <el-skeleton :rows="5" animated />
    </div>
    <div class="feeds-container" v-else>
      <Waterfall :list="list" :width="240" :hasAroundGutter="false" style="max-width: 1260px">
        <template #item="{ item }">
          <div class="card">
            <LazyImg :url="item.imageUrl" style="border-radius: 8px" @click="toMain(item)" />
            <div class="footer">
              <a class="title"><span>{{ item.title }}</span></a>
              <div class="description">{{ item.description }}</div>
              <div class="author-wrapper">
                <a class="author">
                  <img class="author-avatar" :src="item.author.avatar" />
                  <span class="name">{{ item.author.name }}</span>
                </a>
                <div class="action-wrapper">
                  <span 
                    class="like-wrapper" 
                    :class="{ 'like-active': item.isLiked }"
                    @click="handleLike(item)"
                  >
                    <el-icon><Star /></el-icon>
                    <span class="count">{{ item.likes }}</span>
                  </span>
                  <span class="time">{{ formatTime(item.createTime) }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Waterfall>
      <div v-if="hasMore" class="observer-target" ref="observerTarget">
        <el-skeleton :rows="1" animated />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Star } from "@element-plus/icons-vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { getChannels, getFeeds } from "@/api/feeds";
import type { Channel, FeedItem } from "@/api/feeds";

const props = defineProps<{
  type: string;
  userId?: string;
  unshowChannel?: boolean;
}>();

const router = useRouter();
const channels = ref<Channel[]>([]);
const list = ref<FeedItem[]>([]);
const loading = ref(true);
const loadingMore = ref(false);
const currentPage = ref(1);
const currentChannelId = ref(1);
const hasMore = ref(true);
const PAGE_SIZE = 20;

const observerTarget = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const fetchChannels = async () => {
  try {
    const res = await getChannels();
    channels.value = res.data;
  } catch (error) {
    console.error('Failed to fetch channels:', error);
  }
};

const fetchFeeds = async (isLoadMore = false) => {
  if (!isLoadMore) {
    loading.value = true;
  } else {
    loadingMore.value = true;
  }
  
  try {
    const res = await getFeeds({
      channelId: currentChannelId.value,
      page: currentPage.value,
      pageSize: PAGE_SIZE,
      type: props.type,
      userId: props.userId
    });
    
    if (isLoadMore) {
      list.value = [...list.value, ...res.data.list];
    } else {
      list.value = res.data.list;
    }
    
    hasMore.value = res.data.total > list.value.length;
  } catch (error) {
    console.error('Failed to fetch feeds:', error);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const handleChannelClick = (channel: Channel) => {
  channels.value = channels.value.map(c => ({
    ...c,
    isActive: c.id === channel.id
  }));
  currentChannelId.value = channel.id;
  currentPage.value = 1;
  fetchFeeds();
};

const handleLike = async (item: FeedItem) => {
  try {
    // TODO: 调用点赞/取消点赞接口
    item.isLiked = !item.isLiked;
    item.likes += item.isLiked ? 1 : -1;
  } catch (error) {
    console.error('Failed to toggle like:', error);
  }
};

const toMain = (item: FeedItem) => {
  router.push({ 
    path: "/main",
    query: { id: item.id.toString() }
  });
};

const formatTime = (time: string) => {
  const date = new Date(time);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // 转换为秒
  const diffSeconds = Math.floor(diff / 1000);
  
  if (diffSeconds < 60) {
    return '刚刚';
  }
  
  // 转换为分钟
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`;
  }
  
  // 转换为小时
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}小时前`;
  }
  
  // 转换为天
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays}天前`;
  }
  
  // 转换为月
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths}个月前`;
  }
  
  // 转换为年
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears}年前`;
};

const setupIntersectionObserver = () => {
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore.value && !loadingMore.value) {
        currentPage.value += 1;
        fetchFeeds(true);
      }
    },
    {
      threshold: 0.1,
    }
  );

  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  }
};

watch(() => props.type, () => {
  currentPage.value = 1;
  if (!props.unshowChannel) {
    fetchChannels();
  }
  fetchFeeds();
}, { immediate: true });

onMounted(() => {
  if (!props.unshowChannel) {
    fetchChannels();
  }
  setupIntersectionObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<style lang="less" scoped>
.feeds-page {
  flex: 1;
  padding: 0 24px;
  padding-top: 72px;

  .channel-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;

    .channel-scroll-container {
      backdrop-filter: blur(20px);
      background-color: transparent;
      width: calc(100vw - 24px);

      position: relative;
      overflow: hidden;
      display: flex;
      user-select: none;
      -webkit-user-select: none;
      align-items: center;
      font-size: 16px;
      color: rgba(51, 51, 51, 0.8);
      height: 40px;
      white-space: nowrap;
      height: 72px;

      .content-container::-webkit-scrollbar {
        display: none;
      }

      .content-container {
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        color: rgba(51, 51, 51, 0.8);

        .active {
          font-weight: 600;
          background: rgba(0, 0, 0, 0.03);
          border-radius: 999px;
          color: #333;
        }

        .channel {
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 16px;
          cursor: pointer;
          -webkit-user-select: none;
          user-select: none;
        }
      }
    }
  }

  .feeds-container {
    position: relative;
    transition: width 0.5s;
    margin: 0 auto;

    .footer {
      padding: 12px;
      
      .title {
        margin-bottom: 8px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
        color: #333;
      }

      .description {
        margin-bottom: 8px;
        font-size: 12px;
        line-height: 1.5;
        color: #666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .author-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 20px;
        color: rgba(51, 51, 51, 0.8);
        font-size: 12px;
        transition: color 1s;

        .author {
          display: flex;
          align-items: center;
          color: inherit;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 12px;

          .author-avatar {
            margin-right: 6px;
            width: 20px;
            height: 20px;
            border-radius: 20px;
            border: 1px solid rgba(0, 0, 0, 0.08);
            flex-shrink: 0;
          }

          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .action-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;

          .like-wrapper {
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;

            .count {
              margin-left: 2px;
            }
          }

          .time {
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
  }
}

.loading-container {
  padding: 20px;
}

.observer-target {
  padding: 20px;
  margin: 0 auto;
  max-width: 1260px;
}

.like-wrapper {
  .el-icon {
    width: 1em;
    height: 1em;
    color: #999;
  }
  
  &.like-active {
    .el-icon {
      color: red;
    }
    .count {
      color: red;
    }
  }
}
</style>
