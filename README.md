# Dnlibob

[![OneBot](https://img.shields.io/badge/OneBot-12-black)](https://12.onebot.dev/)
[![Version](https://img.shields.io/github/v/tag/teyda/dnlibob.svg)](https://github.com/teyda/dnlibob/releases)
[![License](https://img.shields.io/github/license/teyda/dnlibob)](https://github.com/teyda/dnlibob/blob/main/LICENSE)
[![Deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/dnlibob/mod.ts)

Deno 的 LibOneBot 库，可以帮助开发者快速在新的聊天机器人平台实现 OneBot v12 接口标准。

## 功能

- 提供 OneBot v12 标准 Event、Action、ActionResp 类型，以及相应的工具函数
- 提供 OneBot v12 实现端标准网络通讯协议

## 最小实例

```ts
import { App, ImplConfig, DefaultHandler } from 'https://deno.land/x/dnlibob@0.3.1/mod.ts'

const ob = new App({
    impl: 'test',
    platform: 'empty',
    self_id: '10001',
    config: ImplConfig.Default(),
    action_handler: new DefaultHandler()
})

ob.run()
```

## 鸣谢

本项目的诞生离不开大家的帮助。shigma 对本项目 TypeScript 方面之问题进行的指导。以及 abrahum 对 API 方面之问题进行的指导。还有很多很多人......在此一并致以谢意！
