1. 登陆
- url: /login
- method:"post"
- data:{
      username:'',
      password:''
  }
- 返回：
  - { code: 1, error: '用户名或密码错误' }
  - { code: 0, success: '登陆成功!' }


2. 注册 
- url: /signup
- method:"post"
- data:{
      username:'',
      password:''
  }
- 返回:
  - { code: 1, error: '用户名已经被占用!' }
  - { code: 0, success: '用户注册成功!' }

3. 重置密码
  - url:/reset
  - method:"post"
  - data:{
    username:"xxxx",
    password:"zzzzzzdd"
  }
- 返回:  
  - {code: 0, success: '密码修改成功!' }
  - {code: 1, error: '用户名不存在' }

- 4 获取首页轮播图
- url:/sliders
- method:"GET"
- 返回:['url1','url2','url3']


