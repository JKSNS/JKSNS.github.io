---
icon: fas fa-code
order: 1
title: Categories
---

<div class="container-fluid">
  <p class="lead mb-4">Notable projects — CTFs, security tools, and more.</p>

  {% if site.data.projects %}
  <div class="row">
    {% for project in site.data.projects %}
    <div class="col-sm-6 col-lg-4 mb-4">
      <div class="card h-100 shadow-sm">
        {% if project.image %}
        <img src="{{ project.image }}" class="card-img-top" alt="{{ project.name }}" style="height: 180px; object-fit: cover;">
        {% else %}
        <div class="card-img-top bg-secondary d-flex align-items-center justify-content-center" style="height: 180px;">
          <i class="fas fa-code fa-3x text-light"></i>
        </div>
        {% endif %}
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{{ project.name }}</h5>
          <p class="card-text flex-grow-1">{{ project.description }}</p>
          <a href="{{ project.repo }}" class="btn btn-outline-primary btn-sm mt-auto" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github me-1"></i>View on GitHub
          </a>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>

  {% else %}
  <div class="text-center text-muted py-5">
    <i class="fas fa-folder-open fa-3x mb-3"></i>
    <p>No projects yet.</p>
  </div>
  {% endif %}
</div>
