import request from '@/utils/request'

export interface Channel {
  id: number
  name: string
  type: string
  isActive?: boolean
}

export interface Author {
  id: number
  name: string
  avatar: string
}

export interface FeedItem {
  id: number
  title: string
  imageUrl: string
  author: Author
  likes: number
  isLiked: boolean
}

export interface FeedsResponse {
  list: FeedItem[]
  total: number
  page: number
  pageSize: number
}

export interface Comment {
  id: number;
  author: Author;
  content: string;
  likes: number;
  createTime: string;
  replies: Comment[];
  showReplyInput: boolean;
  replyContent: string;
}

export function getChannels() {
  return request<Channel[]>({
    url: '/api/channels',
    method: 'get'
  })
}

export function getFeeds(params: {
  channelId?: number
  page?: number
  pageSize?: number
  type?: string
  userId?: string
}) {
  return request<FeedsResponse>({
    url: '/api/feeds',
    method: 'get',
    params
  })
}

export function getFeedById(id: number) {
  return request<FeedItem>({
    url: `/api/feeds/${id}`,
    method: 'get'
  })
}

export function getComments(feedId: number) {
  return request<any>({
    url: `/api/feeds/${feedId}/comments`,
    method: 'get'
  });
}

export function toggleFollow(userId: number) {
  return request<any>({
    url: `/api/users/${userId}/follow`,
    method: 'post'
  });
}

export function replyToComment(commentId: number, content: string) {
  return request<any>({
    url: `/api/comments/${commentId}/reply`,
    method: 'post',
    data: { content }
  });
}

export function getMoreReplies(commentId: number, page: number, pageSize: number) {
  return request<any>({
    url: `/api/comments/${commentId}/replies`,
    method: 'get',
    params: { page, pageSize }
  });
}

export function toggleFeedLike(feedId: number) {
  return request<any>({
    url: `/api/feeds/${feedId}/like`,
    method: 'post'
  });
}

export function toggleCommentLike(commentId: number) {
  return request<any>({
    url: `/api/comments/${commentId}/like`,
    method: 'post'
  });
}

export function toggleReplyLike(replyId: number) {
  return request<any>({
    url: `/api/replies/${replyId}/like`,
    method: 'post'
  });
}