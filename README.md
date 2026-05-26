# 开发环境启动方式

```shell
# 启动旧版 UI：apps/whistle/biz/webui/htdocs
cd apps/whistle
pnpm run dev

# 启动新版（nextjs）UI：apps/whistle/biz/webui/htdocs-v2
cd apps/whistle/biz/webui/htdocs-v2
pnpm run dev

# 启动 whistle server
cd apps/whistle
pnpm run start

# 启动 electron 客户端
cd apps/whistle-client 
pnpm run dev
```