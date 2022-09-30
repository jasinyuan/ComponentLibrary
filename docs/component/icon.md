## 图标

# Icon 图标

y-ui 使用 xicons 作为图标库

```
$ pnpm install @vicons/ionicons5
```

## 使用图标

-如果您想直接使用，需要全局注册组件，才能够直接在项目里使用。

<script setup lang='ts'>
import { CashOutline } from "@vicons/ionicons5";
</script>

<y-icon color='red' size='40'>
  <CashOutline/>
</y-icon>

<y-icon color='green' size='40'>
  <CashOutline/>
</y-icon>

<y-icon color='blue' size='40'>
  <CashOutline/>
</y-icon>
<div>

<y-icon color='red' size='60'>
  <CashOutline/>
</y-icon>

<y-icon color='green' size='60'>
  <CashOutline/>
</y-icon>

<y-icon color='blue' size='60'>
  <CashOutline/>
</y-icon>
</div>

```Vue
<script setup lang='ts'>
import { CashOutline } from "@vicons/ionicons5";
</script>
<template>
    <y-icon color='red' size='40'>
      <CashOutline/>
    </y-icon>
</template>
```

## API

### Icon Props

| 名称  | 类型          | 默认值   | 说明     |
| ----- | ------------- | -------- | -------- |
| color | string        | undefind | 图片颜色 |
| size  | number/string | undefind | 图片大小 |
