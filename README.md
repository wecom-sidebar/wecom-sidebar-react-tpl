# wecom-sidebar-frontend-template

企业微信侧边栏前端开发模板

启动项目需要用到 `agentId` 和 `corpId`，需要创建 `src/_config.ts`（目前已隐藏），示例

```ts
// src/_config.ts

const config = {
  // 在 https://work.weixin.qq.com/wework_admin/frame#profile 这里可以找到
  corpId: '你的企业ID',
  // 在 https://work.weixin.qq.com/wework_admin/frame#apps 里的自建应用里可以找到
  agentId: '自建应用的AgentId'
}

export default config
```

启动项目

```bash
npm run start
```
