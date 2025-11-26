// ============================================
// PERSONAL CARD WEBSITE - MAIN JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded');

  // Initialize all modules
  initTimeline();
  initScrollReveal();
  initContactForm();
  initSkillsAnimation();

  console.log('All modules initialized');
});

// ============================================
// REVEAL GROUP FUNCTION - Stagger Animation
// ============================================

/**
 * Reveal a group of elements with stagger animation
 * @param {NodeList|Array} nodeList - Elements to animate
 * @param {number} baseDelay - Delay in milliseconds between each element (default: 60ms)
 */
function revealGroup(nodeList, baseDelay = 60) {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // If reduced motion, show all elements immediately
    nodeList.forEach(el => {
      el.classList.add('visible');
    });
    console.log(`Reduced motion: ${nodeList.length} elements revealed immediately`);
    return;
  }

  if (!nodeList || nodeList.length === 0) {
    console.warn('revealGroup: No elements provided');
    return;
  }

  console.log(`Setting up reveal animation for ${nodeList.length} elements with ${baseDelay}ms stagger`);

  // Observer options
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  // Track if the group has been triggered
  let groupTriggered = false;

  // Observer callback
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !groupTriggered) {
        groupTriggered = true;
        console.log('Scroll animation triggered - badge group entering viewport');

        // Apply stagger animation to each element
        nodeList.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('visible');
            console.log(`Badge ${index + 1} revealed`);
          }, index * baseDelay);
        });

        // Stop observing all elements after trigger
        nodeList.forEach(el => {
          observer.unobserve(el);
        });
      }
    });
  };

  // Create observer instance
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all elements in the group
  nodeList.forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// TIMELINE DATA & RENDERING
// ============================================
const timelineData = [
  {
    date: "2023",
    title: "YBS Lisansına Başlangıç",
    subtitle: "Düzce Üniversitesi",
    description: "Yönetim Bilişim Sistemleri lisans eğitimine başladım.",
    tags: ["Üniversite", "YBS"],
    icon: "🎓",
    link: "#"
  },
  {
    date: "2024",
    title: "C# & SQL Projeleri",
    subtitle: "Windows Forms / EF",
    description: "CRUD, raporlama ve ilişkisel veritabanı yapıları içeren uygulamalar geliştirdim.",
    tags: ["C#", "SQL", "Entity Framework"],
    icon: "💻",
    link: "#"
  },
  {
    date: "2024",
    title: "Vaka Analizi Yarışmaları",
    subtitle: "SWOT/PESTEL, Strateji",
    description: "Takım çalışmasıyla iş vakaları çözüp sunumlar hazırladım.",
    tags: ["Case Study", "Strateji"],
    icon: "📊",
    link: "#"
  },
  {
    date: "2025",
    title: "Azure Fundamentals Eğitimi",
    subtitle: "MIUUL",
    description: "Bulut temelleri, hizmet modelleri ve maliyetlendirme üzerine eğitim.",
    tags: ["Azure", "Cloud"],
    icon: "☁️",
    link: "#"
  },
  {
    date: "2025",
    title: "Kalite Topluluğu Yönetim Kurulu Üyeliği",
    subtitle: "Yazı ve İletişim Departmanı",
    description: "YBS 2. sınıfın başında, DÜ Kalite Topluluğu'nda yazı ve iletişim departmanında yönetim kurulu üyesi oldum. Etkinlik iletişimi, sosyal medya içerik planlaması ve metin yazarlığı süreçlerinde aktif görev alıyorum.",
    tags: ["Kalite Topluluğu", "İletişim", "Yönetim Kurulu"],
    icon: "🗣️",
    link: "#"
  },
  {
    date: "2025",
    title: "Kişisel Portfolio & Kartvizit Sitesi",
    subtitle: "HTML/CSS/JS",
    description: "Karanlık tema, etkileşimler ve zaman çizelgesi ile kişisel markamı yayına aldım.",
    tags: ["Frontend", "Portfolio"],
    icon: "🗂️",
    link: "#"
  }
];

/**
 * Initialize and render timeline
 */
function initTimeline() {
  const timelineList = document.getElementById('timeline-list');
  if (!timelineList) {
    console.warn('Timeline list not found');
    return;
  }

  console.log('Timeline rendering started');

  // Render timeline items
  timelineData.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'timeline-item';
    li.setAttribute('data-index', index);
    li.setAttribute('data-reveal', ''); // For scroll reveal animation
    
    // Alternating layout: even = left, odd = right (desktop)
    const isEven = index % 2 === 0;
    
    const tagsHtml = item.tags.map(tag => 
      `<span class="timeline-tag">${tag}</span>`
    ).join('');
    
    li.innerHTML = `
      <div class="timeline-marker">
        <span class="timeline-icon" aria-hidden="true" role="presentation">${item.icon}</span>
      </div>
      <article class="timeline-card ${isEven ? 'timeline-card-left' : 'timeline-card-right'}" tabindex="0">
        <time class="timeline-date" datetime="${item.date}">${item.date}</time>
        <h3 class="timeline-card-title">${item.title}</h3>
        <p class="timeline-card-subtitle">${item.subtitle}</p>
        <p class="timeline-card-description">${item.description}</p>
        <div class="timeline-tags">${tagsHtml}</div>
        ${item.link !== '#' ? `<a href="${item.link}" class="timeline-link" aria-label="${item.title} detayları">Detay →</a>` : ''}
      </article>
    `;
    
    timelineList.appendChild(li);
  });

  console.log(`Timeline rendered: ${timelineData.length} items`);
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

/**
 * Initialize scroll reveal animations for all elements
 * Uses a single IntersectionObserver for performance
 */
function initScrollReveal() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    console.log('Reduced motion preferred - animations disabled');
    // Show all reveal elements immediately
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  console.log('Scroll reveal animations initialized');

  // Observer options
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  // Observer callback - triggered when elements enter viewport
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger animation
        entry.target.classList.add('visible');
        console.log('Scroll animation triggered for:', entry.target);
        
        // Stop observing this element (animate only once)
        observer.unobserve(entry.target);
      }
    });
  };

  // Create single observer instance
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all elements with data-reveal attribute
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach(el => {
    observer.observe(el);
  });

  console.log(`Observing ${revealElements.length} elements for scroll reveal`);

  // Also handle contact section separately (if needed)
  const contactSection = document.getElementById('contact');
  if (contactSection && !contactSection.hasAttribute('data-reveal')) {
    contactSection.setAttribute('data-reveal', '');
    observer.observe(contactSection);
  }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

/**
 * Initialize contact form submission handling
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) {
    console.warn('Contact form not found');
    return;
  }

  console.log('Contact form initialized');

  // Form submit handler
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submit triggered');

    // Get form inputs
    const nameInput = contactForm.querySelector('#contact-name');
    const emailInput = contactForm.querySelector('#contact-email');
    const messageInput = contactForm.querySelector('#contact-message');

    // Read form values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validation: Check if any field is empty
    if (!name || !email || !message) {
      alert('Lütfen tüm alanları doldurun.');
      console.warn('Form validation failed - empty fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Lütfen geçerli bir e-posta adresi girin.');
      console.warn('Form validation failed - invalid email');
      return;
    }

    // Form data object
    const formData = {
      name: name,
      email: email,
      message: message
    };

    // Log form submission
    console.log('Form gönderildi!', formData);

    // Get submit button
    const submitButton = contactForm.querySelector('.form-submit');
    
    // Success animation
    submitButton.classList.add('submit-success');
    
    // Clear form after 2 seconds
    setTimeout(() => {
      submitButton.classList.remove('submit-success');
      contactForm.reset();
      console.log('Form reset completed');
    }, 2000);
  });

  // Add hover animation to submit button (already styled in CSS)
  const submitButton = contactForm.querySelector('.form-submit');
  if (submitButton) {
    submitButton.addEventListener('mouseenter', function() {
      console.log('Submit button hover');
    });
  }
}

// ============================================
// SKILLS ANIMATION
// ============================================

/**
 * Initialize skills badges animation with stagger
 */
function initSkillsAnimation() {
  // Select badges with data-reveal attribute
  const badges = document.querySelectorAll('.badge[data-reveal]');
  
  if (!badges || badges.length === 0) {
    console.warn('Skills badges not found');
    return;
  }

  // Apply stagger reveal animation
  revealGroup(badges, 60);

  console.log(`Skills animation initialized for ${badges.length} badges`);
}

// ============================================
// HOW TO ADD MORE REVEAL TARGETS
// ============================================
// To add scroll reveal animation to any element:
// 1. Add data-reveal="" attribute to the HTML element
//    Example: <div class="my-element" data-reveal>Content</div>
//
// 2. The element will automatically:
//    - Start with opacity: 0 and translateY(12px)
//    - Animate to opacity: 1 and translateY(0) when visible
//    - Animate only once per page load
//
// 3. If you want custom animation timing, you can add:
//    style="transition-delay: 0.2s" to the element
//
// 4. All elements with data-reveal are observed by a single
//    IntersectionObserver for optimal performance
//
// ============================================
// HOW TO ADD NEW SKILL BADGES
// ============================================
// To add a new skill badge with stagger animation:
// 1. Add the badge HTML with both classes and data-reveal:
//    <div class="skill-badge badge" data-reveal>Your Skill</div>
//
// 2. The badge will automatically:
//    - Start hidden (opacity: 0, translateY: 12px)
//    - Reveal with stagger when scrolled into view (60ms delay between each)
//    - Animate smoothly with 0.45s transition
//
// 3. No additional JavaScript needed - initSkillsAnimation() handles it

// ============================================
// OPTIONAL: Tab Visibility Title Change
// ============================================
// Change document title when tab becomes hidden/visible
(function() {
  const baseTitle = document.title;
  if (typeof document.hidden !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      document.title = document.hidden 
        ? "Görüşmek üzere — Enes Çetin" 
        : baseTitle;
    });
  }
})();

