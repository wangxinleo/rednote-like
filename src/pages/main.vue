<template>
  <div
    class="note-detail-mask"
    style="transition: background-color 0.4s ease 0s;
  hsla(0,0%,100%,0.98)"
  >
    <div class="note-container">
      <div class="media-container">
        <el-carousel height="90vh">
          <el-carousel-item>
            <el-image
              style="width: 100%; height: 100%"
              :src="feedData?.imageUrl"
              fit="cover"
            />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="interaction-container">
        <div class="author-container">
          <div class="author-me">
            <div class="info">
              <img
                class="avatar-item"
                style="width: 40px; height: 40px"
                :src="feedData?.author?.avatar"
              />
              <span class="name">{{ feedData?.author?.name }}</span>
            </div>
            <div class="follow-btn">
              <el-button 
                :type="feedData?.isFollowed ? 'default' : 'primary'" 
                size="large" 
                round
                @click="toggleFollow"
              >
                {{ feedData?.isFollowed ? '取消关注' : '关注' }}
              </el-button>
            </div>
          </div>

          <div class="note-scroller">
            <div class="note-content">
              <div class="title">{{ feedData?.title }}</div>
              <div class="desc">
                <span>{{ feedData?.description }} <br /></span>
                <template v-if="feedData?.tags">
                  <a v-for="tag in feedData.tags" :key="tag" class="tag tag-search">#{{ tag }}</a>
                </template>
              </div>
              <div class="bottom-container">
                <span class="date">{{ formatTime(feedData?.createTime) }}</span>
              </div>
            </div>
            <div class="divider interaction-divider"></div>

            <!-- 评论 -->
            <div class="comments-el">
              <div class="comments-container">
                <div class="total">共{{ feedData?.comments?.length || 0 }}条评论</div>
                <div class="list-container">
                  <div v-for="comment in feedData?.comments" :key="comment.id" class="parent-comment">
                    <div class="comment-item">
                      <div class="comment-inner-container">
                        <div class="avatar">
                          <img
                            class="avatar-item"
                            :src="comment.author.avatar"
                          />
                        </div>
                        <div class="right">
                          <div class="author-wrapper">
                            <div class="author"><a class="name">{{ comment.author.name }}</a></div>
                          </div>
                          <div class="content">{{ comment.content }}</div>

                          <div class="info">
                            <div class="date"><span>{{ formatTime(comment.createTime) }}</span></div>
                            <div class="interactions">
                              <div class="like">
                                <span class="like-wrapper" @click="toggleCommentLike(comment)">
                                  <Star 
                                    style="width: 1em; height: 1em" 
                                    :class="{ 'liked': comment.isLiked }"
                                  />
                                  <span class="count" :class="{ 'liked': comment.isLiked }">{{ comment.likes }}</span>
                                </span>
                              </div>
                              <div class="reply">
                                <span class="reply-btn" @click="showReplyInput(comment)">
                                  <ChatRound style="width: 1em; height: 1em" />
                                  <span>回复</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="reply-container">
                      <div class="list-container">
                        <div v-for="reply in comment.replies" :key="reply.id" class="comment-item">
                          <div class="comment-inner-container">
                            <div class="avatar">
                              <img
                                class="avatar-item"
                                :src="reply.author.avatar"
                              />
                            </div>
                            <div class="right">
                              <div class="author-wrapper">
                                <div class="author"><a class="name">{{ reply.author.name }}</a></div>
                              </div>
                              <div class="content">{{ reply.content }}</div>

                              <div class="info">
                                <div class="date"><span>{{ formatTime(reply.createTime) }}</span></div>
                                <div class="interactions">
                                  <div class="like">
                                    <span class="like-wrapper" @click="toggleReplyLike(reply)">
                                      <Star 
                                        style="width: 1em; height: 1em"
                                        :class="{ 'liked': reply.isLiked }"
                                      />
                                      <span class="count" :class="{ 'liked': reply.isLiked }">{{ reply.likes }}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="show-more" @click="loadMoreReplies(comment)">展开更多的回复</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--  -->
          </div>

          <div class="interactions-footer">
            <div v-if="currentReplyTo" class="reply-reference">
              <div class="reference-content">
                <span class="reference-label">回复：</span>
                <span class="reference-text">{{ currentReplyTo.content.slice(0, 10) + '...' }}</span>
              </div>
              <div class="reference-close" @click="closeReplyInput">
                <Close style="width: 1em; height: 1em" />
              </div>
            </div>
            <div class="buttons">
              <div class="left">
                <span 
                  class="like-wrapper"
                  :class="{ 'like-active': feedData?.isLiked }"
                  @click="handleLike"
                >
                  <span class="like-lottie">
                    <Star 
                      style="width: 0.8em; height: 0.8em" 
                      :class="{ 'liked': feedData?.isLiked }"
                    />
                  </span>
                  <span class="count" :class="{ 'liked': feedData?.isLiked }">{{ feedData?.likes }}</span>
                </span>
                <span class="collect-wrapper">
                  <span class="like-lottie"> <PictureRounded style="width: 0.8em; height: 0.8em; color: #333" /> </span
                  ><span class="count">{{ feedData?.collects || 0 }}</span></span
                >
                <span class="chat-wrapper">
                  <span class="like-lottie"> <ChatRound style="width: 0.8em; height: 0.8em; color: #333" /> </span
                  ><span class="count">{{ feedData?.comments?.length || 0 }}</span></span
                >
              </div>
              <div class="share-wrapper"></div>
            </div>
            <div class="comment-wrapper active comment-comp">
              <div class="input-wrapper">
                <input class="comment-input" type="text" placeholder="回复内容" v-model="replyContent" />
                <div class="input-buttons">
                  <Close style="width: 1.2em; height: 1.2em" />
                </div>
              </div>
              <button class="submit" @click="submitReply">发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="close-cricle" @click="handleClose">
      <div class="close close-mask-white">
        <Close style="width: 1.2em; height: 1.2em; color: rgba(51, 51, 51, 0.8)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Close, Star, PictureRounded, ChatRound } from "@element-plus/icons-vue";
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { FeedItem } from '@/api/feeds';
import { getFeedById, getMoreReplies, toggleFeedLike, toggleCommentLike as apiToggleCommentLike, toggleReplyLike as apiToggleReplyLike } from '@/api/feeds';
import { useUserStore } from '@/store/userStore';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const feedData = ref<FeedItem>();
const replyContent = ref('');
const showReplyBox = ref(false);
const currentReplyTo = ref<any>(null);

const handleClose = () => {
  router.back();
};

const handleLike = async () => {
  if (!feedData.value) return;
  
  const currentUser = userStore.getUserInfo();
  if (!currentUser) {
    ElMessage.error('请先登录');
    return;
  }

  try {
    await toggleFeedLike(feedData.value.id);
    feedData.value.isLiked = !feedData.value.isLiked;
    feedData.value.likes += feedData.value.isLiked ? 1 : -1;
  } catch (error) {
    console.error('Failed to toggle like:', error);
    ElMessage.error('操作失败，请重试');
  }
};

const toggleFollow = () => {
  if (feedData.value) {
    feedData.value.isFollowed = !feedData.value.isFollowed;
  }
};

const toggleCommentLike = async (comment: any) => {
  const currentUser = userStore.getUserInfo();
  if (!currentUser) {
    ElMessage.error('请先登录');
    return;
  }

  try {
    await apiToggleCommentLike(comment.id);
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  } catch (error) {
    console.error('Failed to toggle comment like:', error);
    ElMessage.error('操作失败，请重试');
  }
};

const toggleReplyLike = async (reply: any) => {
  const currentUser = userStore.getUserInfo();
  if (!currentUser) {
    ElMessage.error('请先登录');
    return;
  }

  try {
    await apiToggleReplyLike(reply.id);
    reply.isLiked = !reply.isLiked;
    reply.likes += reply.isLiked ? 1 : -1;
  } catch (error) {
    console.error('Failed to toggle reply like:', error);
    ElMessage.error('操作失败，请重试');
  }
};

const loadMoreReplies = async (comment: any) => {
  try {
    const res = await getMoreReplies(comment.id, 1, 5); // 假设每次加载5条
    comment.replies.push(...res.data);
  } catch (error) {
    console.error('Failed to load more replies:', error);
  }
};

const showReplyInput = (comment: any) => {
  showReplyBox.value = true;
  currentReplyTo.value = comment;
  replyContent.value = ''; // 清空输入框
};

const closeReplyInput = () => {
  showReplyBox.value = false;
  currentReplyTo.value = null;
  replyContent.value = '';
};

const submitReply = () => {
  if (!replyContent.value.trim()) return;
  
  const currentUser = userStore.getUserInfo();
  if (!currentUser) {
    ElMessage.error('请先登录');
    return;
  }
  
  const newReply = {
    id: Date.now(),
    author: {
      id: currentUser.userId,
      name: currentUser.nickname,
      avatar: currentUser.avatar
    },
    content: replyContent.value,
    likes: 0,
    createTime: new Date().toISOString(),
  };

  if (currentReplyTo.value) {
    // 回复某条评论
    if (!currentReplyTo.value.replies) {
      currentReplyTo.value.replies = [];
    }
    currentReplyTo.value.replies.push(newReply);
  } else {
    // 直接回复帖子
    if (!feedData.value) return;
    if (!feedData.value.comments) {
      feedData.value.comments = [];
    }
    feedData.value.comments.push({
      ...newReply,
      replies: []
    });
  }

  closeReplyInput();
};

const formatTime = (time?: string) => {
  if (!time) return '';
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

const fetchFeedData = async () => {
  const id = route.query.id;
  if (!id) return;
  
  try {
    const res = await getFeedById(Number(id));
    feedData.value = res.data;
  } catch (error) {
    console.error('Failed to fetch feed data:', error);
  }
};

onMounted(() => {
  fetchFeedData();
});
</script>

<style lang="less" scoped>
.note-detail-mask {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  overflow: auto;

  .close-cricle {
    left: 1.3vw;
    top: 1.3vw;
    position: fixed;
    display: flex;
    z-index: 100;
    cursor: pointer;

    .close-mask-white {
      box-shadow:
        0 2px 8px 0 rgba(0, 0, 0, 0.04),
        0 1px 2px 0 rgba(0, 0, 0, 0.02);
      border: 1px solid rgba(0, 0, 0, 0.08);
    }

    .close {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      width: 40px;
      height: 40px;
      border-radius: 40px;
      cursor: pointer;
      transition: all 0.3s;
    }
  }

  .note-container {
    width: 86%;

    height: 90%;
    transition:
      transform 0.4s ease 0s,
      width 0.4s ease 0s;
    transform: translate(104px, 32px) scale(1);
    overflow: visible;

    display: flex;
    box-shadow:
      0 8px 64px 0 rgba(0, 0, 0, 0.04),
      0 1px 4px 0 rgba(0, 0, 0, 0.02);
    border-radius: 20px;
    background: #895454;
    transform-origin: left top;

    .media-container {
      width: 68%;
      height: auto;

      position: relative;
      background: rgba(0, 0, 0, 0.03);
      flex-shrink: 0;
      flex-grow: 0;
      -webkit-user-select: none;
      user-select: none;
      overflow: hidden;
      border-radius: 20px 0 0 20px;
      transform: translateZ(0);
      height: 100%;
      object-fit: contain;
      min-width: 440px;
    }

    .interaction-container {
      width: 32%;
      flex-shrink: 0;
      border-radius: 0 20px 20px 0;
      position: relative;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height: 100%;
      background-color: #fff;
      overflow: hidden;
      border-left: 1px solid rgba(0, 0, 0, 0.08);

      .author-me {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 24px;
        border-bottom: 1px solid transparent;

        .info {
          display: flex;
          align-items: center;

          .avatar-item {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 100%;
            border: 1px solid rgba(0, 0, 0, 0.08);
            object-fit: cover;
          }

          .name {
            padding-left: 12px;
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 16px;
            color: rgba(51, 51, 51, 0.8);
          }
        }
      }

      .note-scroller::-webkit-scrollbar {
        display: none;
      }

      .note-scroller {
        transition: scroll 0.4s;
        overflow-y: scroll;
        flex-grow: 1;
        height: 80vh;
        padding-bottom: 180px;

        .note-content {
          padding: 0 24px 24px;
          color: var(--color-primary-label);

          .title {
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 18px;
            line-height: 140%;
          }

          .desc {
            margin: 0;
            font-weight: 400;
            font-size: 16px;
            line-height: 150%;
            color: #333;
            white-space: pre-wrap;
            overflow-wrap: break-word;

            .tag-search {
              cursor: pointer;
            }

            .tag {
              margin-right: 2px;
              color: #13386c;
            }
          }

          .bottom-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;

            .date {
              font-size: 14px;
              line-height: 120%;
              color: rgba(51, 51, 51, 0.6);
            }
          }
        }

        .interaction-divider {
          margin: 0 24px;
        }
        .divider {
          margin: 4px 8px;
          list-style: none;
          height: 0;
          border: solid rgba(0, 0, 0, 0.08);
          border-width: 1px 0 0;
        }

        .comments-el {
          position: relative;

          .comments-container {
            padding: 16px;

            .total {
              font-size: 14px;
              color: rgba(51, 51, 51, 0.6);
              margin-left: 8px;
              margin-bottom: 12px;
            }

            .list-container {
              position: relative;

              .parent-comment {
                margin-bottom: 16px;

                .comment-item {
                  position: relative;
                  display: flex;
                  padding: 8px;

                  .comment-inner-container {
                    position: relative;
                    display: flex;
                    z-index: 1;
                    width: 100%;
                    flex-shrink: 0;

                    .avatar {
                      flex: 0 0 auto;

                      .avatar-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        border-radius: 100%;
                        border: 1px solid rgba(0, 0, 0, 0.08);
                        object-fit: cover;
                        width: 40px;
                        height: 40px;
                      }
                    }

                    .right {
                      margin-left: 12px;
                      display: flex;
                      flex-direction: column;
                      font-size: 14px;
                      flex-grow: 1;

                      .author-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .author {
                          display: flex;
                          align-items: center;
                          .name {
                            color: rgba(51, 51, 51, 0.6);
                            line-height: 18px;
                          }
                        }
                      }

                      .content {
                        margin-top: 4px;
                        line-height: 140%;
                        color: #333;
                      }

                      .info {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        font-size: 12px;
                        line-height: 16px;
                        color: rgba(51, 51, 51, 0.6);

                        .date {
                          margin: 8px 0;
                        }
                        .interactions {
                          display: flex;
                          margin-left: -2px;

                          .like-wrapper, .reply-btn {
                            padding: 0 4px;
                            color: rgba(51, 51, 51, 0.8);
                            font-weight: 500;
                            position: relative;
                            cursor: pointer;
                            display: flex;
                            align-items: center;

                            .like-lottie {
                              width: 16px;
                              height: 16px;
                              left: 4px;
                            }

                            .count {
                              margin-left: 2px;
                              font-weight: 500;
                            }
                          }

                          .reply {
                            margin-left: 8px;
                          }
                        }
                      }
                    }
                  }
                }

                .reply-container {
                  margin-left: 52px;

                  .show-more {
                    margin-left: 44px;
                    height: 32px;
                    line-height: 32px;
                    color: #13386c;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
      }

      .interactions-footer {
        position: absolute;
        bottom: 0px;
        background: #fff;
        flex-shrink: 0;
        padding: 12px 24px 24px;
        height: auto;
        min-height: 130px;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        z-index: 1;

        .reply-reference {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: rgba(0, 0, 0, 0.03);
          border-radius: 8px;
          margin-bottom: 12px;

          .reference-content {
            flex: 1;
            overflow: hidden;
            
            .reference-label {
              color: rgba(51, 51, 51, 0.6);
              margin-right: 4px;
            }
            
            .reference-text {
              color: #333;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .reference-close {
            cursor: pointer;
            padding: 4px;
            margin-left: 8px;
            color: rgba(51, 51, 51, 0.6);
            
            &:hover {
              color: #333;
            }
          }
        }

        .buttons {
          display: flex;
          justify-content: space-between;

          .count {
            margin-left: 6px;
            margin-right: 12px;
            font-weight: 500;
            font-size: 12px;
          }

          .left {
            display: flex;
            .like-wrapper {
              position: relative;
              cursor: pointer;
              display: flex;
              justify-content: left;
              color: rgba(51, 51, 51, 0.6);
              margin-right: 5px;
              align-items: center;
              .like-lottie {
                transform: scale(1.7);
              }
            }

            .collect-wrapper {
              position: relative;
              cursor: pointer;
              display: flex;
              color: rgba(51, 51, 51, 0.6);
              margin-right: 5px;
              align-items: center;
              .like-lottie {
                transform: scale(1.7);
              }
            }

            .chat-wrapper {
              cursor: pointer;
              color: rgba(51, 51, 51, 0.6);
              display: flex;
              align-items: center;
              .like-lottie {
                transform: scale(1.7);
              }
            }
          }
        }

        .comment-wrapper {
          &.active {
            .input-wrapper {
              flex-shrink: 1;
            }
          }
        }

        .comment-wrapper {
          display: flex;
          font-size: 16px;
          overflow: hidden;

          .input-wrapper {
            display: flex;
            position: relative;
            width: 100%;
            flex-shrink: 0;
            transition: flex 0.3s;

            .comment-input:placeholder-shown {
              background-image: none;
              padding: 12px 92px 12px 36px;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAANlBMVEUAAAA0NDQyMjIzMzM2NjY2NjYyMjI0NDQ1NTU1NTUzMzM1NTU1NTUzMzM1NTUzMzM1NTU1NTVl84gVAAAAEnRSTlMAmUyGEzlgc2AmfRx9aToKQzCSoXt+AAAAhElEQVRIx+3Uuw6DMAyF4XOcBOdCafv+L9vQkQFyJBak/JOHT7K8GLM7epuHusRhHwP/mejJ77i32CpZh33aD+lDFDzgZFE8+tgUv5BB9NxEb9NPL3i46JvoUUhXPBKZFQ/rTPHI3ZXt8xr12KX055LoAVtXz9kKHprxNMMxXqRvmAn9ACQ7A/tTXYAxAAAAAElFTkSuQmCC);
              background-repeat: no-repeat;
              background-size: 16px 16px;
              background-position: 16px 12px;
              color: rgba(51, 51, 51, 0.3);
            }

            .comment-input {
              padding: 12px 92px 12px 16px;
              width: 100%;
              height: 40px;
              line-height: 16px;
              background: rgba(0, 0, 0, 0.03);
              caret-color: rgba(51, 51, 51, 0.3);
              border-radius: 22px;
              border: none;
              outline: none;
              resize: none;
              color: #333;
            }

            .input-buttons {
              position: absolute;
              right: 0;
              top: 0;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 92px;
              color: rgba(51, 51, 51, 0.3);
            }
          }

          .submit {
            margin-left: 8px;
            width: 60px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            flex-shrink: 0;
            background: #3d8af5;
            border-radius: 44px;
            font-size: 16px;
          }
        }

        .comment-comp {
          margin-top: 20px;
        }
      }
    }
  }
}

.interactions {
  display: flex;
  margin-left: -2px;

  .like-wrapper, .reply-btn {
    padding: 0 4px;
    color: rgba(51, 51, 51, 0.8);
    font-weight: 500;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;

    .like-lottie {
      width: 16px;
      height: 16px;
      left: 4px;
    }

    .count {
      margin-left: 2px;
      font-weight: 500;
    }
  }

  .reply {
    margin-left: 8px;
  }
}

.liked {
  color: #409EFF !important;
}

.like-wrapper {
  &.like-active {
    color: #409EFF;
  }
}
</style>
