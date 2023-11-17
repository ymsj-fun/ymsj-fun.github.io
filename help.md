---
layout: default
title: 帮助文档
permalink: /help/
---

<section class="container posts-content">
{% assign sorted_categories = site.categories | sort %}
{% for category in sorted_categories %}
  {% if category[0] == "帮助文档" %}
    <h2>{{ category | first }}</h2>
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
