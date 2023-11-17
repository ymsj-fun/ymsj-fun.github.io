---
layout: default
title: 加利福尼亚猎团
permalink: /posts/
---

<h2>加利福尼亚猎团</h2>

这里是[加利福尼亚猎团](/文章/2022/08/06/lt.html)！在这里你可以看到隐秘世界的最新动向、玩法与卡组介绍、同人二创作品等等。也欢迎您加入隐秘世界内容组与我们一同探索！猎团的文章也会发布在 微信公众号（隐秘世界玩家内容组）、
[B站](https://space.bilibili.com/1146169199)、
[微博](https://weibo.com/u/7732714610)、NGA、
[A站](https://www.acfun.cn/u/216709)、
[小红书](https://www.xiaohongshu.com/user/profile/6130dabe00000000020191be) 等平台，欢迎大家关注！

<section class="container posts-content">
{% assign sorted_categories = site.categories | sort %}
{% for category in sorted_categories %}
  {% if category[0] == "文章" %}
    <ol class="posts-list" id="{{ category[0] }}">
    {% for post in category.last %}
    <li class="posts-list-item">
    <span class="posts-list-meta">{{ post.date | date:"%Y-%m-%d" }}</span>
    <a class="posts-list-name" href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
    </ol>
  {% endif %}
{% endfor %}
</section>
