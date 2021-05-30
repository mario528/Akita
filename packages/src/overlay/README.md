# Overlay

## 覆盖层

Overlay 组件为组件库中基础组件， 主要用于弹出层的过渡动效、遮盖样式、滚动锁定。

#### 引入

```HTML
<Overlay :visible="visible" :duration=".3"></Overlay>
```

#### 配置项

| key             | 类型           | 默认功能       | 功能                         | 备注 |
| --------------- | -------------- | -------------- | ---------------------------- | ---- |
| teleportId      | String         | body           | teleport 插槽位置            |      |
| visible         | Boolean        | false          | 覆盖层的显隐状态             |      |
| duration        | String、Number | 0.2s           | 过渡动画的持续时间           |      |
| backgroundColor | String         | rgba(0,0,0,.4) | 覆盖层蒙层的背景颜色         |      |
| closeAble       | Boolean        | true           | 覆盖层是否支持点击关闭       |      |
| useLock         | Boolean        | true           | 覆盖层弹出时是否同时锁定滚动 |      |
