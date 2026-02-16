---
icon: fas fa-trophy
order: 2
title: Archives
---

<div class="container-fluid">
  <p class="lead mb-4">Competition photos, placements, and awards.</p>

  {% if site.data.competitions %}
  {% assign sorted = site.data.competitions | sort: "date" | reverse %}

  {% for comp in sorted %}
  <div class="card mb-4 shadow-sm">
    <div class="row g-0">
      {% if comp.image %}
      <div class="col-md-4">
        <img src="{{ comp.image }}" class="img-fluid rounded-start h-100" alt="{{ comp.name }}" style="object-fit: cover;">
      </div>
      <div class="col-md-8">
      {% else %}
      <div class="col-12">
      {% endif %}
        <div class="card-body">
          <h5 class="card-title">{{ comp.name }}</h5>
          {% if comp.placement %}
          <span class="badge bg-warning text-dark fs-6 mb-2">{{ comp.placement }}</span>
          {% endif %}
          {% if comp.description %}
          <p class="card-text mt-2">{{ comp.description }}</p>
          {% endif %}
          <p class="card-text">
            <small class="text-muted">
              <i class="fas fa-calendar-alt me-1"></i>{{ comp.date | date: "%B %d, %Y" }}
            </small>
          </p>
        </div>
      </div>
    </div>
  </div>
  {% endfor %}

  {% else %}
  <div class="text-center text-muted py-5">
    <i class="fas fa-trophy fa-3x mb-3"></i>
    <p>No competition entries yet.</p>
  </div>
  {% endif %}
</div>
