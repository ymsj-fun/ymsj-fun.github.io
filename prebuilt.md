---
layout: default
title: 卡组库
permalink: /prebuilt/
---

<h2 class="post-list-heading">卡组库</h2>
<ul class="post-list">
  {%- for post in site.posts -%}
    {% if post.categories contains "卡组" %}
    <li>
      <span class="post-meta">
        {{ post.date | date: "%Y-%m-%d" }}
        |
        <a href="{{ site.url }}/author/#{{ post.tags }}" title="{{ post.tags }}" style="color: inherit;">{{ post.author }}</a>
        |
        {% for tag in post.tags %}
        <a href="{{ site.url }}/categories/#{{ tag }}" title="{{ tag }}" style="color: inherit;">{{ tag }}</a>
        {% endfor %}
      </span>
      <h3>
        <a class="post-link" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
        </a>
      </h3>
    </li>
    {% endif %}
  {%- endfor -%}
</ul>
