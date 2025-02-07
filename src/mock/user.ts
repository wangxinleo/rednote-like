import Mock from 'mockjs'

console.log('Mock user module loaded')

// 模拟登录接口
Mock.mock('/user/login', 'post', (options: any) => {
  console.log('Mock login intercepted:', options)
  const { username, password } = JSON.parse(options.body)
  
  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: Mock.Random.guid(),
        userInfo: {
          userId: '275592512',
          username: 'admin',
          nickname: '小王别忙',
          avatar: Mock.Random.image('100x100', Mock.Random.color(), Mock.Random.word()),
          description: '毕业设计真的难顶！',
          location: '广东广州',
          ipLocation: '广东',
          tags: ['射手座', '广东广州', '程序员'],
          stats: {
            following: 8,
            followers: 575,
            likes: 2445
          }
        }
      }
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
      data: null
    }
  }
}) 