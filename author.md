---
layout: default
title: 创建者
permalink: /author/
---

<h2 class="post-list-heading">创建者的套牌</h2>

<p class="article-comment">
看看前任秘社领导是如何操纵世界的吧！
</p>

<section class="container posts-content">
{% assign sorted_authors = site.tags | sort %}
  {% for author in sorted_authors %}
  <h3>{{ author | first }} 创建的卡组</h3>
    <ul class="posts-list" id="{{ category[0] }}">
      {% for post in author.last %}
      <li class="posts-list-item">
        <span class="posts-list-meta">{{ post.date | date:"%Y-%m-%d" }}</span>
        <a class="posts-list-name" href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
        <span class="article-comment">
          {% for cat in post.categories %} | {{ cat }}{% endfor %}
        </span>
      </li>
      {% endfor %}
    </ul>
  {% endfor %}
</section>
