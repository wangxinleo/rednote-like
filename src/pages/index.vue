<template>
  <div class="container">
    <div class="top">
      <header class="mask-paper">
        <a class="logo">医路相伴</a>
        <div class="tool-box"></div>
        <div class="input-box">
          <input type="text" class="search-input" placeholder="搜索医路相伴" />
          <div class="input-button">
            <div class="close-icon"><Close style="width: 1em; height: 1em; margin-right: 8px" /></div>
            <div class="search-icon"><Search style="width: 1em; height: 1em; margin-right: 8px" /></div>
          </div>
        </div>
        <div class="right"></div>
      </header>
    </div>
    <div class="main">
      <div class="side-bar">
        <ul class="channel-list">
          <li :class="{ 'active-channel': activeMenu === 'dashboard' }" @click="toDashboard()">
            <a class="link-wrapper"
              ><House style="width: 1em; height: 1em; margin-right: 8px" /><span class="channel"
                >发现</span
              ></a
            >
          </li>
          <li v-if="token" :class="{ 'active-channel': activeMenu === 'trend' }" @click="toTrend()">
            <Star style="width: 1em; height: 1em; margin-right: 8px" /><span class="channel">
              动态</span
            >
          </li>
          <li v-if="token" :class="{ 'active-channel': activeMenu === 'message' }" @click="toMessage()">
            <Bell style="width: 1em; height: 1em; margin-right: 8px" /><span class="channel">
              消息</span
            >
          </li>
          <li v-if="token" :class="{ 'active-channel': activeMenu === 'push' }" @click="toPush()">
            <CirclePlus style="width: 1em; height: 1em; margin-right: 8px" /><span class="channel">
              发布</span
            >
          </li>
          <li v-if="token" :class="{ 'active-channel': activeMenu === 'user' }" @click="toUser()">
            <User style="width: 1em; height: 1em; margin-right: 8px" /><span class="channel">
              个人</span
            >
          </li>
          <div v-if="!token" @click="handleLoginOrLogout()" class="login-wrapper login-btn">
            <span>点击登录</span>
          </div>
        </ul>

        <div class="information-container">
          <div class="information-pad" :class="{ 'show': showInfoPad }">
            <div class="container">
              <div>
                <div>
                  <div class="group-wrapper">
                    <div class="menu-item hover-effect" @click="toAbout()">
                      <span>关于医路相伴</span>
                      <div class="icon">
                        <ArrowRight style="width: 1em; height: 1em; margin-right: 8px" />
                      </div>
                    </div>
                    <div class="menu-item hover-effect" @click="toPrivacy()">
                      <span>隐私，协议</span>
                      <div class="icon">
                        <ArrowRight style="width: 1em; height: 1em; margin-right: 8px" />
                      </div>
                    </div>
                    <div class="menu-item hover-effect" @click="toHelp()">
                      <span>帮助与客服</span>
                    </div>
                  </div>
                  <div class="divider"></div>
                </div>
                <div>
                  <div class="group-wrapper">
                    <div class="group-header">访问方式</div>
                    <div class="menu-item hover-effect" @click="toDesktop()">
                      <span>添加医路相伴到桌面</span>
                      <div class="icon">
                        <ArrowRight style="width: 1em; height: 1em; margin-right: 8px" />
                      </div>
                    </div>
                  </div>
                  <div class="divider"></div>
                </div>
                <div>
                  <div class="group-wrapper">
                    <div class="group-header">设置</div>
                    <div class="menu-item hover-effect" @click="handleLoginOrLogout">
                      <span>{{ isLoggedIn ? '退出登录' : '点击登录' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="information-wrapper hover-effect" @click="toggleInfoPad" :class="{ 'active': showInfoPad }">
            <Menu style="width: 1em; height: 1em; margin-right: 8px" /> <span class="channel">更多</span>
          </div>
        </div>
      </div>
      <div class="main-content with-side-bar">
        <router-view />
      </div>
    </div>

    <Login v-if="!token" v-show="c" @click-child="close"></Login>
  </div>
</template>

<script lang="ts" setup>
import {
  Search,
  Sunny,
  Moon,
  Close,
  House,
  Star,
  Bell,
  User,
  ArrowRight,
  CirclePlus,
  Menu
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import Login from "@/pages/login.vue";
import { ref, onMounted, computed } from "vue";
import { useUserStore } from '@/store/userStore';
import { storage } from '@/utils/storage';

const router = useRouter();
const userStore = useUserStore();
const token = computed(() => userStore.token);
const showInfoPad = ref(false);
const activeMenu = ref('dashboard');

onMounted(() => {
  const path = router.currentRoute.value.path;
  if (path === '/') activeMenu.value = 'dashboard';
  else if (path === '/followTrend') activeMenu.value = 'trend';
  else if (path === '/message') activeMenu.value = 'message';
  else if (path === '/push') activeMenu.value = 'push';
  else if (path === '/user') activeMenu.value = 'user';
});

const c = ref(true);

const isLoggedIn = computed(() => !!token.value);

const toggleInfoPad = () => {
  showInfoPad.value = !showInfoPad.value;
};

const toDashboard = () => {
  activeMenu.value = 'dashboard';
  router.push({ path: "/"});
};

const toTrend = () => {
  activeMenu.value = 'trend';
  router.push({ path: "/followTrend" });
};

const toMessage = () => {
  activeMenu.value = 'message';
  router.push({ path: "/message" });
};

const toUser = () => {
  activeMenu.value = 'user';
  router.push({ path: "/user" });
};

const toPush = () => {
  activeMenu.value = 'push';
  router.push({ path: "/push" });
};

const close = (val: boolean) => {
  console.log(val);
  c.value = val;
};

const handleLoginOrLogout = () => {
  if (token.value) {
    // 退出登录
    userStore.setToken('');
    storage.remove('token');
    userStore.setUserInfo(null);
    storage.remove('userInfo');
    // token.value = ''; // 移除这行
    showInfoPad.value = false;
    router.push('/');
  } else {
    // 显示登录模块
    c.value = true;
  }
};
</script>

<style lang="less" scoped>
.container {
  max-width: 1728px;
  background-color: #fff;
  margin: 0 auto;

  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 72px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    align-items: center;
    background: #fff;

    header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1728px;
      height: 72px;
      padding: 0 16px 0 24px;
      z-index: 10;

      .tool-box {
        width: 24px;
        height: 70px;
        position: absolute;
        left: 0;
        top: 0;
      }

      .input-box {
        height: 40px;
        position: fixed;
        left: 50%;
        transform: translate(-50%);

        @media screen and (max-width: 695px) {
          display: none;
        }

        @media screen and (min-width: 960px) and (max-width: 1191px) {
          width: calc(-36px + 50vw);
        }

        @media screen and (min-width: 1192px) and (max-width: 1423px) {
          width: calc(-33.6px + 40vw);
        }

        @media screen and (min-width: 1424px) and (max-width: 1727px) {
          width: calc(-42.66667px + 33.33333vw);
        }

        @media screen and (min-width: 1728px) {
          width: 533.33333px;
        }
        .search-input {
          padding: 0 84px 0 16px;
          width: 100%;
          height: 100%;
          font-size: 16px;
          line-height: 120%;
          color: #333;
          caret-color: #ff2442;
          background: rgba(0, 0, 0, 0.03);
          border-radius: 999px;
        }

        .input-button {
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: rgba(51, 51, 51, 0.8);

          .close-icon .search-icon {
            width: 40px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: rgba(51, 51, 51, 0.8);
          }
        }
      }

      .logo {
        background-color: #409EFF;
        color: white;
        padding: 8px 16px;
        border-radius: 45px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }

  .main {
    display: flex;

    .side-bar {
      @media screen and (max-width: 695px) {
        display: none;
      }
      @media screen and (min-width: 696px) and (max-width: 959px) {
        display: none;
      }

      @media screen and (min-width: 960px) and (max-width: 1191px) {
        width: calc(-18px + 25vw);
        margin-left: 12px;
      }

      @media screen and (min-width: 1192px) and (max-width: 1423px) {
        width: calc(-16.8px + 20vw);
        margin-left: 12px;
      }

      @media screen and (min-width: 1424px) and (max-width: 1727px) {
        width: calc(-21.33333px + 16.66667vw);
        margin-left: 16px;
      }

      @media screen and (min-width: 1728px) {
        width: 266.66667px;
        margin-left: 16px;
      }

      height: calc(100vh - 72px);
      overflow-y: scroll;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      padding-top: 16px;
      margin-top: 72px;
      position: fixed;
      overflow: visible;

      .channel-list {
        min-height: auto;
        -webkit-user-select: none;
        user-select: none;

        li {
          padding-left: 16px;
          min-height: 48px;
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-bottom: 8px;
          color: rgba(51, 51, 51, 0.6);
          border-radius: 999px;
          transition: all 0.2s ease;

          &:hover {
            background-color: rgba(0, 0, 0, 0.03);
          }

          &.active-channel, &:active {
            background-color: rgba(0, 0, 0, 0.03);
            color: #333;
          }

          .link-wrapper {
            display: flex;
            width: 100%;
            height: 48px;
            align-items: center;
          }
        }

        .channel {
          font-size: 16px;
          font-weight: 600;
          margin-left: 12px;
          color: #333;
        }

        .login-wrapper {
          padding-left: 16px;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-bottom: 8px;
          border-radius: 999px;
          transition: all 0.2s ease;

          &:hover {
            background-color: rgba(0, 0, 0, 0.03);
          }
        }

        .login-btn {
          background-color: #409EFF;
          color: white;

          &:hover {
            background-color: #337EFF;
          }
        }
      }

      .information-container {
        display: inline-block;
        width: 100%;
        color: #333;
        font-size: 16px;
        position: absolute;
        bottom: 0;

        .information-pad {
          z-index: 16;
          margin-bottom: 4px;
          width: 100%;
          display: none;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;

          &.show {
            display: block;
            opacity: 1;
            transform: translateY(0);
          }

          .container {
            width: 100%;
            background: #fff;
            box-shadow:
              0 4px 32px 0 rgba(0, 0, 0, 0.08),
              0 1px 4px 0 rgba(0, 0, 0, 0.04);
            border-radius: 12px;

            .divider {
              margin: 0px 12px;
              list-style: none;
              height: 0;
              border: 1px solid rgba(0, 0, 0, 0.08);
              border-width: 1px 0 0;
            }

            .group-wrapper {
              padding: 4px;

              .group-header {
                display: flex;
                align-items: center;
                padding: 0 12px;
                font-weight: 400;
                height: 32px;
                color: rgba(51, 51, 51, 0.6);
                font-size: 12px;
              }

              .menu-item {
                height: 40px;
                color: rgba(51, 51, 51, 0.8);
                font-size: 16px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                padding: 0 12px;
                font-weight: 400;
                transition: all 0.2s ease;
                cursor: pointer;

                &:hover {
                  background-color: rgba(0, 0, 0, 0.03);
                }

                &:active {
                  background-color: rgba(0, 0, 0, 0.06);
                }

                .icon {
                  color: rgba(51, 51, 51, 0.3);
                  margin-left: auto;
                }

                .component {
                  margin-left: auto;
                }

                .multistage-toggle {
                  position: relative;
                  background: rgba(0, 0, 0, 0.03);
                  display: flex();
                  padding: 2px;
                  border-radius: 999px;
                  cursor: pointer;

                  .active {
                    background: #fff;
                    box-shadow:
                      0 2px 8px 0 rgba(0, 0, 0, 0.04),
                      0 1px 2px 0 rgba(0, 0, 0, 0.02);
                    color: #333;
                  }

                  .toggle-item {
                    border-radius: 999px;
                    background: transparent;
                    color: rgba(51, 51, 51, 0.6);

                    .icon-wrapper {
                      width: 24px;
                      height: 24px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
          }
        }
      }

      .information-wrapper {
        -webkit-user-select: none;
        user-select: none;
        cursor: pointer;
        position: relative;
        margin-bottom: 20px;
        height: 48px;
        padding-left: 16px;
        width: 100%;
        display: flex;
        font-weight: 600;
        align-items: center;
        border-radius: 999px;
        color: rgba(51, 51, 51, 0.8);
        transition: all 0.2s ease;

        &:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }

        &.active {
          background-color: rgba(0, 0, 0, 0.03);
          color: #333;
        }

        .channel {
          font-size: 16px;
          font-weight: 600;
          color: inherit;
        }
      }
    }

    .main-content {
      width: 100%;
    }

    .main-content {
      @media screen and (min-width: 960px) and (max-width: 1191px) {
        padding-left: calc(-6px + 25vw);
      }

      @media screen and (min-width: 1192px) and (max-width: 1423px) {
        padding-left: calc(-4.8px + 20vw);
      }

      @media screen and (min-width: 1424px) and (max-width: 1727px) {
        padding-left: calc(-5.33333px + 16.66667vw);
      }

      @media screen and (min-width: 1728px) {
        padding-left: 282.66667px;
      }
    }
  }
}
</style>
