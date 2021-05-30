# Toast

## 轻提示

Toast 组件做为轻提示组件，支持 Loading、text、success、warn、error 功能

#### 引入

##### 组件式引入

```JavaScript
import { Toast } from './index';
// 加载
Toast.loading();
setTimeout(() => {
    Toast.close();
}, 6000);
// 普通文字
Toast.text('普通级别轻提示');
```

##### 函数式引入

```JavaScript
app.use(Toast);
// 加载
this.$loading.loading();
setTimeout(() => {
    this.$loading.close();
}, 6000);
// 普通文字
this.$loading.text('普通级别轻提示');
```

#### 配置项

| key          | 类型           | 默认功能                            | 功能                         | 备注 |
| ------------ | -------------- | ----------------------------------- | ---------------------------- | ---- |
| id           | String         | 自动生成                            | toast-id                     |      |
| text         | String         | NULL                                | 轻提示文案                   |      |
| type         | String         | Loading、text、warn、error、success | 轻提示类型                   |      |
| background   | String         | rgba(0,0,0,.4)                      | 轻提示覆盖层蒙层的背景颜色   |      |
| maskDuration | Number、String | 0.3                                 | 轻提示覆盖层显隐过渡动画时间 |      |
| duration     | Number         | 500ms                               | 轻提示展示时间               |      |
