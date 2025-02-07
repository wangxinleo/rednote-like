import Mock from 'mockjs'

console.log('Mock feeds module loaded')

const channels = [
  { id: 1, name: '推荐', type: 'recommend', isActive: true },
  { id: 2, name: '疾病互助', type: 'disease' },
  { id: 3, name: '医疗咨询', type: 'medical' },
  { id: 4, name: '康复分享', type: 'recovery' },
  { id: 5, name: '医保政策', type: 'insurance' },
  { id: 6, name: '就医指南', type: 'hospital' },
  { id: 7, name: '健康科普', type: 'health' },
  { id: 8, name: '心理关怀', type: 'psychology' },
  { id: 9, name: '慢病管理', type: 'chronic' },
  { id: 10, name: '养生保健', type: 'healthcare' },
  { id: 11, name: '医患故事', type: 'doctor' },
  { id: 12, name: '义诊活动', type: 'clinic' },
]

const imageUrls = [
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.cGc4c8dVlqnfV3uwcS1IogHaE8?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.N0USLldg_iKDGVKT12vB4AHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.jzcWzXf_uts2sgE2WChuCQHaEo?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" },
  { src: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg" },
  { src: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg" },
  { src: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg" },
  { src: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg" },
  { src: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg" },
  { src: "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg" },
  { src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.N0USLldg_iKDGVKT12vB4AHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.jzcWzXf_uts2sgE2WChuCQHaEo?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse3-mm.cn.bing.net/th/id/OIP-C.YzEeJqgWky6RQMatrMd6-gHaHa?w=170&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse3-mm.cn.bing.net/th/id/OIP-C.YzEeJqgWky6RQMatrMd6-gHaHa?w=170&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.N0USLldg_iKDGVKT12vB4AHaEK?w=292&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.jzcWzXf_uts2sgE2WChuCQHaEo?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { src: "https://tse1-mm.cn.bing.net/th/id/OIP-C.cGc4c8dVlqnfV3uwcS1IogHaE8?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
]

interface Comment {
  id: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  isLiked: boolean;
  createTime: string;
  replies: Reply[];
  showReplyInput: boolean;
  replyContent: string;
}

interface Reply {
  id: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  isLiked: boolean;
  createTime: string;
}

// 生成模拟数据
const generateFeedsList = (count: number) => {
  return Array(count).fill(null).map((_, index) => {
    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)].src
    return Mock.mock({
      id: index + 1,
      title: '@ctitle(10, 30)',
      description: '@cparagraph(1, 3)',
      imageUrl: randomImageUrl,
      author: {
        id: '@increment',
        name: '@cname',
        avatar: Mock.Random.image('100x100', Mock.Random.color(), Mock.Random.word())
      },
      likes: '@integer(0, 9999)',
      isLiked: '@boolean',
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
    })
  })
}

const feedsList = generateFeedsList(100)

// 生成模拟评论数据
const generateComments = (count: number) => {
  return Array(count).fill(null).map(() => {
    return Mock.mock({
      id: '@increment',
      author: {
        id: '@increment',
        name: '@cname',
        avatar: Mock.Random.image('40x40', Mock.Random.color(), Mock.Random.word())
      },
      content: '@cparagraph(1, 3)',
      likes: '@integer(0, 999)',
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
      replies: [],
      showReplyInput: false,
      replyContent: ''
    });
  });
};

// 为每个 FeedItem 添加评论数据
feedsList.forEach(feed => {
  feed.comments = generateComments(Mock.Random.integer(0, 10));
});

// 模拟获取频道列表接口
Mock.mock('/api/channels', 'get', () => {
  console.log('Mock channels intercepted')
  return {
    code: 200,
    data: channels,
    message: 'success'
  }
})

// 模拟获取信息流接口
Mock.mock(new RegExp('/api/feeds\\?.*'), 'get', (options: any) => {
  console.log('Mock feeds intercepted:', options)
  
  // 解析查询参数
  const url = new URL(options.url, 'http://dummy.com')
  const channelId = Number(url.searchParams.get('channelId')) || 1
  const page = Number(url.searchParams.get('page')) || 1
  const pageSize = Number(url.searchParams.get('pageSize')) || 20
  
  const start = (page - 1) * pageSize
  const end = start + pageSize
  
  // 模拟不同频道有不同的数据
  let filteredList = feedsList
  if (channelId !== 1) {
    filteredList = feedsList.filter(() => Mock.Random.boolean())
  }
  
  return {
    code: 200,
    data: {
      list: filteredList.slice(start, end),
      total: filteredList.length,
      page: page,
      pageSize: pageSize
    },
    message: 'success'
  }
})

// 模拟获取单个信息流接口
Mock.mock(new RegExp('/api/feeds/\\d+'), 'get', (options: any) => {
  console.log('Mock single feed intercepted:', options);
  
  // 从 URL 中提取 ID
  const url = new URL(options.url, 'http://dummy.com');
  const id = Number(url.pathname.split('/').pop());
  
  // 查找对应的 FeedItem
  const feedItem = feedsList.find(item => item.id === id);
  
  return {
    code: 200,
    data: feedItem || null,
    message: feedItem ? 'success' : 'not found'
  };
});

// 模拟获取评论列表接口
Mock.mock(new RegExp('/api/feeds/\d+/comments'), 'get', (options: any) => {
  console.log('Mock comments intercepted:', options);
  
  // 从 URL 中提取 FeedItem ID
  const url = new URL(options.url, 'http://dummy.com');
  const feedId = Number(url.pathname.split('/')[3]);
  
  // 查找对应的 FeedItem
  const feedItem = feedsList.find(item => item.id === feedId);
  
  return {
    code: 200,
    data: feedItem ? feedItem.comments : [],
    message: 'success'
  };
});

// 模拟关注/取消关注接口
Mock.mock(new RegExp('/api/users/\d+/follow'), 'post', (options: any) => {
  console.log('Mock follow/unfollow intercepted:', options);
  
  // 从 URL 中提取用户 ID
  const url = new URL(options.url, 'http://dummy.com');
  const userId = Number(url.pathname.split('/')[2]);
  
  // 模拟关注/取消关注操作
  const isFollowed = Mock.Random.boolean();
  
  return {
    code: 200,
    data: { isFollowed },
    message: 'success'
  };
});

// 模拟提交评论回复接口
Mock.mock(new RegExp('/api/comments/\d+/reply'), 'post', (options: any) => {
  console.log('Mock reply intercepted:', options);
  
  // 从 URL 中提取评论 ID
  const url = new URL(options.url, 'http://dummy.com');
  const commentId = Number(url.pathname.split('/')[2]);
  
  // 模拟提交回复
  const newReply = Mock.mock({
    id: '@increment',
    author: {
      id: '@increment',
      name: '@cname',
      avatar: Mock.Random.image('40x40', Mock.Random.color(), Mock.Random.word())
    },
    content: '@cparagraph(1, 3)',
    likes: 0,
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    replies: [],
    showReplyInput: false,
    replyContent: ''
  });
  
  return {
    code: 200,
    data: newReply,
    message: 'success'
  };
});

// 模拟获取更多回复接口
Mock.mock(new RegExp('/api/comments/\\d+/replies'), 'get', (options: any) => {
  console.log('Mock more replies intercepted:', options);

  // 从 URL 中提取评论 ID
  const url = new URL(options.url, 'http://dummy.com');
  const commentId = Number(url.pathname.split('/')[2]);

  // 解析查询参数
  const page = Number(url.searchParams.get('page')) || 1;
  const pageSize = Number(url.searchParams.get('pageSize')) || 5;

  // 模拟生成更多回复
  const moreReplies = generateComments(pageSize);

  return {
    code: 200,
    data: moreReplies,
    message: 'success'
  };
});

// 模拟点赞/取消点赞帖子接口
Mock.mock(new RegExp('/api/feeds/\\d+/like'), 'post', (options: any) => {
  console.log('Mock feed like intercepted:', options);
  
  // 从 URL 中提取帖子 ID
  const url = new URL(options.url, 'http://dummy.com');
  const feedId = Number(url.pathname.split('/')[2]);
  
  // 查找对应的帖子
  const feed = feedsList.find(item => item.id === feedId);
  if (feed) {
    feed.isLiked = !feed.isLiked;
    feed.likes += feed.isLiked ? 1 : -1;
  }
  
  return {
    code: 200,
    data: feed ? { isLiked: feed.isLiked, likes: feed.likes } : null,
    message: feed ? 'success' : 'not found'
  };
});

// 模拟点赞/取消点赞评论接口
Mock.mock(new RegExp('/api/comments/\\d+/like'), 'post', (options: any) => {
  console.log('Mock comment like intercepted:', options);
  
  // 从 URL 中提取评论 ID
  const url = new URL(options.url, 'http://dummy.com');
  const commentId = Number(url.pathname.split('/')[2]);
  
  // 遍历所有帖子的评论
  let targetComment: Comment | null = null;
  feedsList.forEach(feed => {
    const comment = feed.comments?.find((c: Comment) => c.id === commentId);
    if (comment) {
      targetComment = comment;
      comment.isLiked = !comment.isLiked;
      comment.likes += comment.isLiked ? 1 : -1;
    }
  });
  
  return {
    code: 200,
    data: targetComment ? { isLiked: (targetComment as Comment).isLiked, likes: (targetComment as Comment).likes } : null,
    message: targetComment ? 'success' : 'not found'
  };
});

// 模拟点赞/取消点赞回复接口
Mock.mock(new RegExp('/api/replies/\\d+/like'), 'post', (options: any) => {
  console.log('Mock reply like intercepted:', options);
  
  // 从 URL 中提取回复 ID
  const url = new URL(options.url, 'http://dummy.com');
  const replyId = Number(url.pathname.split('/')[2]);
  
  // 遍历所有帖子的评论和回复
  let targetReply: Reply | null = null;
  feedsList.forEach(feed => {
    feed.comments?.forEach((comment: Comment) => {
      const reply = comment.replies?.find((r: Reply) => r.id === replyId);
      if (reply) {
        targetReply = reply;
        reply.isLiked = !reply.isLiked;
        reply.likes += reply.isLiked ? 1 : -1;
      }
    });
  });
  
  return {
    code: 200,
    data: targetReply ? { isLiked: (targetReply as Reply).isLiked, likes: (targetReply as Reply).likes } : null,
    message: targetReply ? 'success' : 'not found'
  };
}); 