<template>
  <div class="user-page">
    <div class="user">
      <div class="user-info">
        <div class="avatar">
          <div class="avatar-wrapper">
            <img
              :src="userInfo?.avatar"
              class="user-image"
              style="border: 1px solid rgba(0, 0, 0, 0.08)"
            />
          </div>
        </div>
        <div class="info-part">
          <div class="info">
            <div class="basic-info">
              <div class="user-basic">
                <div class="user-nickname">
                  <div class="user-name">{{ userInfo?.nickname }}</div>
                </div>
                <div class="user-content">
                  <span class="user-redId">用户号：{{ userInfo?.userId }}</span>
                  <span class="user-IP"> IP属地：{{ userInfo?.ipLocation }}</span>
                </div>
              </div>
            </div>
            <div class="user-desc">
              {{ userInfo?.description }}
            </div>
            <div class="user-tags">
              <div class="tag-item" v-for="(tag, index) in userInfo?.tags" :key="index">
                <div>{{ tag }}</div>
              </div>
            </div>
            <div class="data-info">
              <div class="user-interactions">
                <div>
                  <span class="count">{{ userInfo?.stats.following }}</span>
                  <span class="shows">关注</span>
                </div>
                <div>
                  <span class="count">{{ userInfo?.stats.followers }}</span>
                  <span class="shows">粉丝</span>
                </div>
                <div>
                  <span class="count">{{ userInfo?.stats.likes }}</span>
                  <span class="shows">获赞与收藏</span>
                </div>
              </div>
            </div>
          </div>
          <div class="follow"><!----></div>
        </div>
      </div>
    </div>
    <div class="reds-sticky-box user-page-sticky" style="--1ee3a37c: all 0.4s cubic-bezier(0.2, 0, 0.25, 1) 0s">
      <div class="reds-sticky" style="">
        <div class="tertiary center reds-tabs-list" style="padding: 0px 12px">
          <div 
            v-for="tab in tabs" 
            :key="tab.type"
            :class="['reds-tab-item', { active: currentTab === tab.type }]" 
            style="padding: 0px 16px; margin-right: 0px; font-size: 16px"
            @click="handleTabChange(tab)"
          >
            <span>{{ tab.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="feeds-tab-container" style="--1ee3a37c: all 0.4s cubic-bezier(0.2, 0, 0.25, 1) 0s">
      <Dashboard class="dashboard" :type="currentTab" :userId="userInfo?.userId" :unshowChannel="unshowChannel" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import Dashboard from '@/pages/dashboard/dashboard.vue';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const tabs = [
  { name: '笔记', type: 'note', unshowChannel: true },
  { name: '收藏', type: 'favorite', unshowChannel: true },
  { name: '点赞', type: 'like', unshowChannel: true }
];

const currentTab = ref('note');
const unshowChannel = ref(true);

const handleTabChange = (tab: any) => {
  currentTab.value = tab.type;
  unshowChannel.value = tab.unshowChannel;
};
</script>
<style lang="less" scoped>
.user-page {
  background: #fff;
  overflow-y: scroll;
  overflow-x: hidden;

  .user {
    padding-top: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    .user-info {
      display: flex;
      justify-content: center;
      padding: 48px 0;

      .avatar {
        .avatar-wrapper {
          text-align: center;
          width: 250.66667px;
          height: 175.46667px;
          .user-image {
            border-radius: 50%;
            margin: 0 auto;
            width: 70%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      .info-part {
        position: relative;
        width: 100%;

        .info {
          @media screen and (min-width: 1728px) {
            width: 533.33333px;
          }
          margin-left: 32px;
          .basic-info {
            display: flex;
            align-items: center;
            .user-basic {
              width: 100%;
              .user-nickname {
                width: 100%;
                display: flex;
                align-items: center;
                max-width: calc(100% - 96px);
                .user-name {
                  font-weight: 600;
                  font-size: 24px;
                  line-height: 120%;
                  color: #333;
                }
              }
              .user-content {
                width: 100%;
                font-size: 12px;
                line-height: 120%;
                color: rgba(51, 51, 51, 0.6);
                display: flex;
                margin-top: 8px;
                .user-redId {
                  padding-right: 12px;
                }
              }
            }
          }
          .user-desc {
            width: 100%;
            font-size: 14px;
            line-height: 140%;
            color: #333;
            margin-top: 16px;
            white-space: pre-line;
          }
          .user-tags {
            height: 24px;
            margin-top: 16px;
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #333;
            text-align: center;
            font-weight: 400;
            line-height: 120%;
            .tag-item :first-child {
              padding: 3px 6px;
            }
            .tag-item {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 4px 8px;
              grid-gap: 4px;
              gap: 4px;
              height: 18px;
              border-radius: 41px;
              background: rgba(0, 0, 0, 0.03);
              height: 24px;
              line-height: 24px;
              margin-right: 6px;
              color: rgba(51, 51, 51, 0.6);
            }
          }
          .data-info {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            .user-interactions {
              width: 100%;
              display: flex;
              align-items: center;
              .count {
                font-weight: 500;
                font-size: 14px;
                margin-right: 4px;
              }
              .shows {
                color: rgba(51, 51, 51, 0.6);
                font-size: 14px;
                line-height: 120%;
              }
            }
            .user-interactions > div {
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              margin-right: 16px;
            }
          }
        }

        .follow {
          position: absolute;
          margin-left: auto;
          display: block;
          right: 0;
          top: 0;
        }
      }
    }
  }

  .reds-sticky {
    padding: 16px 0;
    z-index: 5 !important;
    background: hsla(0, 0%, 100%, 0.98);

    .reds-tabs-list {
      screen and (min-width: 1728px) {
        width: 1445.33333px;
      }
      display: flex;
      flex-wrap: nowrap;
      position: relative;
      font-size: 16px;
      justify-content: center;

      .reds-tab-item {
        padding: 0px 16px;
        margin-right: 0px;
        font-size: 16px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 40px;
        cursor: pointer;
        color: rgba(51, 51, 51, 0.8);
        white-space: nowrap;
        transition: transform 0.3s cubic-bezier(0.2, 0, 0.25, 1);
        z-index: 1;
      }
      .reds-tab-item.active {
        background-color: rgba(0, 0, 0, 0.03);
        border-radius: 20px;
        font-weight: 600;
        color: rgba(51, 51, 51, 0.8);
      }
    }
  }

  .feeds-tab-container {
    padding-left: 2rem;
    .dashboard {
      padding-top: 0;
    }
  }
}
</style>
