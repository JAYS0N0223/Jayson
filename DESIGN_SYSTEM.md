# Apple 风个人网页设计系统

## 1. 设计目标

这套设计系统以“高级、简洁、可信、专业”为核心，适合个人简历 / 作品集 / 个人品牌页。整体风格偏 Apple 风：

- 干净的中性底色
- 轻柔但稳定的层级感
- 适度的蓝色点缀
- 圆角和留白优先
- 轻交互反馈，不喧宾夺主

---

## 2. 设计原则

### 2.1 视觉语言
- 以中性色为主：白色、灰色、黑色
- 使用 1 个主强调色：蓝色，避免过多颜色冲突
- 强调“内容优先”，视觉只辅助信息结构
- 交互反馈应轻，且保持一致

### 2.2 体验原则
- 先内容后装饰
- 信息层级清晰：标题 > 副标题 > 说明文 > 标签
- 适度留白，保证阅读舒适
- mobile 优先保留内容可读性，动画不能影响使用

---

## 3. 设计令牌（Design Tokens）

### 3.1 色板

```css
:root {
  --paper: #f5f5f7;
  --ink: #1d1d1f;
  --muted: #6e6e73;
  --line: #d2d2d7;
  --panel: #ffffff;
  --soft-panel: rgba(255,255,255,.72);
  --accent: #0071e3;
  --accent-soft: rgba(0,113,227,.08);
  --shadow: 0 20px 50px rgba(29,29,31,.08);
}
```

### 3.2 字体

```css
:root {
  --display: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif;
  --sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "PingFang SC", sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

### 3.3 圆角
- 16px：常规卡片/标签
- 22px：图片区域
- 28px：大型容器/主卡片
- 999px：导航/标签 pill

### 3.4 留白尺度
- 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 52 / 72 / 96

常用关系：
- 章节内上下 padding：32–52px
- 卡片内 padding：16–20px
- 内容块间距：24–32px
- 页面顶部大间距：80–112px

---

## 4. 版式系统

### 4.1 页面布局
- 最大内容宽度：1180px
- 页面左右 padding：24–28px
- 两栏布局：左侧 sidebar / 右侧 content
- 内容区以 section 作为最小模块单元

### 4.2 结构层级
1. 顶部：Portfolio / CV 标识
2. 主导航：导航栏 pill 按钮
3. Hero：大标题 + 说明文本 + 视觉名牌
4. Sidebar：联系人、标签、章节目录
5. Content：教育、实习、演出、技能等模块
6. Footer：简历信息

---

## 5. 组件系统

### 5.1 导航栏
- 背景：半透明白色 + 毛玻璃
- 按钮：圆角 999px
- hover：轻微上浮 + 背景更深
- active：保持区域强调色/柔和灰底

```css
.nav a {
  border-radius: 999px;
  padding: 7px 13px;
  transition: all 0.2s ease;
}
```

### 5.2 Hero 区
- 左侧：大标题 + 说明文字
- 右侧：强视觉名牌（黑色立体块）
- 标题字重：700–800，字距收紧
- 说明文字：17–19px，色值 muted

### 5.3 Section 卡片
- 白色半透明背景
- 轻微边框
- 圆角 28px
- 适度 hover：边框加深、轻微阴影

```css
.section {
  border: 1px solid rgba(210,210,215,.8);
  border-radius: 28px;
  background: rgba(255,255,255,.42);
  backdrop-filter: blur(8px);
}
```

### 5.4 信息条目
- 采用双栏结构：左 date / 右 detail
- 每条之间用 1px 边框隔开
- hover 时仅轻微位移，不破坏信息稳定性

### 5.5 标签 / skill
- 背景：白色或柔和白
- 圆角：16px
- 左侧加小加号或点状装饰
- 常用于能力、方向、关键词

---

## 6. 字体与文本系统

### 6.1 标题
- 字体：SF Pro Display / 系统字体
- 适用于大标题、模块标题
- 字重：600–700
- 字距：负值，增强现代感

### 6.2 正文
- 字体：SF Pro Text / PingFang SC
- 字重：400–500
- 字号：14–19px
- 行高：1.55–1.7

### 6.3 说明性文本
- muted #6e6e73
- 适用：时间、备注、标签说明

---

## 7. 交互系统

### 7.1 hover
- 导航：轻微上升 + 背景切换
- 卡片：轻微上浮 + 阴影增强
- 图片：轻微放大 + 饱和度提升
- 仅做“温和反馈”，不强烈干扰阅读

### 7.2 滚动动画
- section 进入时使用 fade-up
- 初始透明度 0，进入后透明度 1
- 过渡时长约 0.7s
- 动画节奏保持顺滑自然

### 7.3 反馈原则
- 统一使用 ease-out / cubic-bezier(0.2, 0.8, 0.2, 1)
- 动画时长 200–700ms
- 不使用过多高强度、闪烁式动画

---

## 8. 响应式系统

### 8.1 Desktop
- 正常两栏布局
- sidebar 固定在左侧

### 8.2 Tablet / Small Desktop
- 内容区适度收紧
- 图片在两栏内保持稳定

### 8.3 Mobile
- 侧边栏改为堆叠式布局
- section 改为单列
- 标题适度缩小
- 导航保持可点击区域足够大

---

## 9. 可复用组件清单

- TopBar
- Navigation
- HeroBlock
- SidePanel
- SectionCard
- TimelineEntry
- TagPill
- SkillCard
- Footer

---

## 10. 设计建议

### 推荐使用场景
- 个人主页
- 作品集介绍页
- 求职简历页
- 个人品牌展示页

### 不建议做的事
- 大面积强烈色块
- 过多层叠阴影
- 复杂多彩动画
- 过长行文区块

---

## 11. 一句话总结

这套系统的核心是：让内容像产品一样被“精心包装”，但不失真实感与专业度。它既适合简历展示，也适合后续扩展成个人作品集或品牌官网。

---

## 12. 适用代码示例

```css
body {
  background: linear-gradient(180deg, #f5f5f7 0%, #f2f2f5 100%);
  color: var(--ink);
  font-family: var(--sans);
}

.section {
  border: 1px solid rgba(210,210,215,.8);
  border-radius: 28px;
  background: rgba(255,255,255,.42);
  backdrop-filter: blur(8px);
}

.nav a {
  border-radius: 999px;
  padding: 7px 13px;
  transition: all .2s ease;
}
```

如果你需要，我可以下一步直接把这份设计系统继续落成一份可直接复制的 CSS 变量文件（例如 design-system.css），让你后续新页面可以直接复用。