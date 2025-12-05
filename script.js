// ============================================
// PERSONAL CARD WEBSITE - MAIN JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('Page loaded');

  // Initialize all modules
  try {
    const lang = localStorage.getItem('lang') || 'tr';
    initTimeline(lang);
  } catch (e) {
    initTimeline('tr');
  }

  // ============================================
  // FUTURE GOALS SCROLL REVEAL
  // ============================================

  function initFutureGoalsReveal() {
    const cards = document.querySelectorAll('#future-goals .future-goal-card');
    if (!cards.length) {
      console.warn('Future goals cards not found');
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      cards.forEach(card => {
        card.classList.add('visible');
      });
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        card.classList.add('visible');
        obs.unobserve(card);
      });
    }, options);

    cards.forEach(card => observer.observe(card));
  }

  // ============================================
  // FUTURE PATH HOVER LINE HIGHLIGHT
  // ============================================

  function initFuturePath() {
    const section = document.getElementById('future-goals');
    if (!section) return;

    const activeLine = section.querySelector('.future-path-line-active');
    const milestones = section.querySelectorAll('.future-path-milestones .future-milestone');
    if (!activeLine || !milestones.length) return;

    const total = milestones.length;

    function setProgressFromStep(step) {
      const index = Math.max(1, Math.min(step, total));
      const percent = (index / total) * 100;
      activeLine.style.setProperty('--future-line-progress', percent + '%');
    }

    milestones.forEach(item => {
      const step = parseInt(item.getAttribute('data-step') || '1', 10) || 1;

      item.addEventListener('mouseenter', () => {
        setProgressFromStep(step);
      });

      item.addEventListener('focus', () => {
        setProgressFromStep(step);
      });
    });

    section.addEventListener('mouseleave', () => {
      activeLine.style.setProperty('--future-line-progress', '0%');
    });
  }
  initScrollReveal();
  initContactForm();
  initSkillsAnimation();
  initSkillsSection();
  initAboutTerminal();

  console.log('All modules initialized');
  if (window.AOS) {
    AOS.init({ duration: 800, once: true });
  }

  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.addEventListener('animationend', () => {
      loader.style.display = 'none';
    }, { once: true });
  }

  initI18n();
  initFutureGoalsReveal();
  initFuturePath();
  initEnesChat();
});

const ENES_PROFILE = {
  name: "Enes Çetin",
  titleTr: "Yönetim Bilişim Sistemleri Öğrencisi",
  titleEn: "Management Information Systems Student",
  university: "Düzce Üniversitesi",
  focusAreas: [
    "C# ve .NET ile uygulama geliştirme",
    "SQL ve veritabanı tasarımı",
    "Yapay zekâ ve veri analitiği",
    "Yönetim Bilişim Sistemleri bakış açısıyla iş ve teknolojiyi birleştirme"
  ],
  futureGoals: [
    "Google Data Analytics sertifikasını tamamlama",
    "C# & SQL ile orta seviye kurumsal projeler geliştirme",
    "Yazılım/veri analitiği alanında staj yapmak",
    "Azure ve karar destek sistemleri konusunda uzmanlaşmak"
  ]
};

function initI18n() {
  const translations = {
    tr: {
      'nav.cv': 'ÖZGEÇMİŞ',
      'nav.timeline': 'Zaman Çizelgesi',
      'nav.future': 'Gelecek Hedeflerim',
      'nav.skills': 'Yetenekler',
      'nav.contact': 'İletişim',
      'hero.name': 'Enes Çetin',
      'hero.role': 'Yönetim Bilişim Sistemleri Öğrencisi',
      'hero.about': 'Ben Enes Çetin, Düzce Üniversitesi Yönetim Bilişim Sistemleri öğrencisiyim. C# ve SQL üzerine projeler geliştiriyor, veri analitiği ve yapay zekâ alanlarında kendimi geliştiriyorum. Teknolojiyle iş dünyasını birleştiren çözümler üretmeyi hedefliyorum. Öğrenmeye, yeniliğe ve sürekli gelişime inanan biriyim.',
      'timeline.title': 'Zaman Çizelgesi',
      'timeline.subtitle': 'Yolculuğumdan önemli duraklar',
      'timeline.cta': 'Tüm projeleri gör →',
      'skills.title': 'Yetenekler',
      'skills.subtitle': 'Seviyeler günceldir; gelişim odağındayım.',
      'contact.title': 'İletişim',
      'contact.subtitle': 'Benimle iletişime geçmek için formu doldurabilirsin.',
      'contact.name': 'Ad Soyad',
      'contact.email': 'E-posta',
      'contact.message': 'Mesaj',
      'contact.send': 'Gönder',
      'future.title': 'Gelecek Hedeflerim',
      'future.subtitle': 'Yakın vadede odaklanmak istediğim adımları kapsül şeklinde bir yol haritasında topladım.',
      'future.m1.title': 'Google Data Analytics',
      'future.m1.body': 'Veri analitiğinde güçlü bir temel oluşturmak.',
      'future.m2.title': 'C# & SQL Projeleri',
      'future.m2.body': 'Orta seviye kurumsal otomasyon projeleri geliştirmek.',
      'future.m3.title': 'Staj & Deneyim',
      'future.m3.body': 'Yazılım/veri analitiği alanında kurumsal staj yapmak.',
      'future.m4.title': 'EF Core & SQL',
      'future.m4.body': 'İleri seviye ilişkisel veritabanı ve performans odaklı sorgular.',
      'future.m5.title': 'Azure Cloud',
      'future.m5.body': 'Bulut tabanlı uygulamalar ve servisler.',
      'future.m6.title': 'Karar Destek Projesi',
      'future.m6.body': 'MIS odaklı akıllı karar destek sistemi bitirme projesi geliştirmek.',
    },
    en: {
      'nav.cv': 'Download CV',
      'nav.timeline': 'Timeline',
      'nav.future': 'Future Goals',
      'nav.skills': 'Skills',
      'nav.contact': 'Contact',
      'hero.name': 'Enes Çetin',
      'hero.role': 'Management Information Systems Student',
      'hero.about': 'I am Enes Çetin, a MIS student at Düzce University. I develop projects with C# and SQL, and I am improving myself in data analytics and AI. I aim to build solutions that bridge business and technology, believing in learning and continuous improvement.',
      'timeline.title': 'Timeline',
      'timeline.subtitle': 'Key stops from my journey',
      'timeline.cta': 'See all projects →',
      'skills.title': 'Skills',
      'skills.subtitle': 'Levels are up-to-date; I focus on growth.',
      'contact.title': 'Contact',
      'contact.subtitle': 'Fill out the form to contact me.',
      'contact.name': 'Full Name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Send',
      'future.title': 'Future Path',
      'future.subtitle': 'A dynamic strip of the next milestones I want to focus on.',
      'future.m1.title': 'Google Data Analytics',
      'future.m1.body': 'Building a strong foundation in data analytics.',
      'future.m2.title': 'C# & SQL Projects',
      'future.m2.body': 'Building mid-level enterprise-style automation projects.',
      'future.m3.title': 'Internship',
      'future.m3.body': 'Completing an internship in software or data analytics.',
      'future.m4.title': 'EF Core & SQL',
      'future.m4.body': 'Mastering advanced relational databases and performance-focused queries.',
      'future.m5.title': 'Azure Cloud',
      'future.m5.body': 'Building cloud-based applications and services.',
      'future.m6.title': 'Decision Support Project',
      'future.m6.body': 'Building an MIS-focused intelligent decision support capstone project.'
    }
  };

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.tr;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) {
        el.textContent = dict[key];
      }
    });
    try { localStorage.setItem('lang', lang); } catch (e) { }
  }

  let current = 'tr';
  try {
    current = localStorage.getItem('lang') || 'tr';
  } catch (e) { }
  applyTranslations(current);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') || 'tr';
      applyTranslations(lang);
      initTimeline(lang);
      if (window.AOS) { AOS.refresh(); }
    });
  });
}

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
// SKILLS DATA & RENDERING
// ============================================

/**
 * Nasıl yeni yetenek eklerim?
 * skillsData dizisine yeni bir nesne ekle:
 * { name: "Teknoloji Adı", percent: 50, group: "Grup Adı", note: "Açıklama", icon: "🎯" }
 * Ardından initSkillsSection() fonksiyonu otomatik olarak render eder.
 */

const skillsData = [
  // PROGRAMMING
  { name: "C#", percent: 55, group: "Programming", note: "WinForms temelleri, küçük projeler", note_en: "WinForms basics, small projects", icon: "🧩" },
  { name: "OOP (NYP)", percent: 50, group: "Programming", note: "Sınıf, nesne, constructor, encapsulation", note_en: "Class, object, constructor, encapsulation", icon: "🏷️" },
  { name: "Java", percent: 45, group: "Programming", note: "Döngüler, diziler, temel sınıflar", note_en: "Loops, arrays, basic classes", icon: "☕" },

  // DATABASE
  { name: "SQL", percent: 60, group: "Database", note: "CRUD, JOIN, ilişkisel model", note_en: "CRUD, JOIN, relational model", icon: "🗄️" },
  { name: "Entity Framework", percent: 50, group: "Database", note: "LINQ, Code-First temel ilişkiler", note_en: "LINQ, Code-First basic relations", icon: "🧠" },

  // WEB
  { name: "HTML/CSS", percent: 60, group: "Web", note: "Responsive düzen, animasyon temelleri", note_en: "Responsive layout, animation basics", icon: "🎨" },
  { name: "JavaScript", percent: 45, group: "Web", note: "DOM, event, IntersectionObserver", note_en: "DOM, events, IntersectionObserver", icon: "⚙️" },

  // TOOLS & PLATFORMS
  { name: "Git & GitHub", percent: 55, group: "Tools", note: "Versiyon kontrol, Pages deploy", note_en: "Version control, Pages deploy", icon: "🔧" },
  { name: "Azure Fundamentals", percent: 40, group: "Tools", note: "Bulut temelleri, maliyetlendirme", note_en: "Cloud basics, costing", icon: "☁️" },
  { name: "Unity (2D)", percent: 30, group: "Tools", note: "Sprite, sahne, temel build", note_en: "Sprites, scenes, basic build", icon: "🎮" }
];

/**
 * Initialize and render skills section
 */
function initSkillsSection() {
  const skillsGrid = document.querySelector('#skills .skills-grid');
  if (!skillsGrid) {
    console.warn('Skills grid not found');
    return;
  }

  console.log('Skills rendering started');
  skillsGrid.innerHTML = '';
  let lang = 'tr';
  try { lang = localStorage.getItem('lang') || 'tr'; } catch (e) { }

  // Group skills by group
  const groupedSkills = {};
  skillsData.forEach(skill => {
    if (!groupedSkills[skill.group]) {
      groupedSkills[skill.group] = [];
    }
    groupedSkills[skill.group].push(skill);
  });

  // Group order
  const groupOrder = ['Programming', 'Database', 'Web', 'Tools'];

  // Render skills by group
  groupOrder.forEach(groupName => {
    if (!groupedSkills[groupName]) return;

    // Add group title
    const groupTitle = document.createElement('h3');
    groupTitle.className = 'skill-group-title';
    const groupLabels = { tr: { Programming: 'Programlama', Database: 'Veritabanı', Web: 'Web', Tools: 'Araçlar' }, en: { Programming: 'Programming', Database: 'Database', Web: 'Web', Tools: 'Tools' } };
    groupTitle.textContent = (groupLabels[lang] && groupLabels[lang][groupName]) ? groupLabels[lang][groupName] : groupName;
    skillsGrid.appendChild(groupTitle);

    // Render skills in this group
    groupedSkills[groupName].forEach((skill, skillIndex) => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      skillItem.setAttribute('data-reveal', '');
      skillItem.setAttribute('data-percent', skill.percent);
      skillItem.setAttribute('data-aos', 'fade-up');
      skillItem.setAttribute('data-aos-delay', String(Math.min(240, skillIndex * 60)));

      const note = (lang === 'en' && skill.note_en) ? skill.note_en : skill.note;
      skillItem.innerHTML = `
        <div class="skill-head">
          <div class="skill-badge" aria-hidden="true">${skill.icon}</div>
          <div class="skill-title">
            <span class="name">${skill.name}</span>
            <span class="value">${skill.percent}%</span>
          </div>
        </div>
        <div class="progress-wrap" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${skill.percent}" aria-label="${skill.name} seviyesi">
          <div class="progress-bar" style="width:0%"></div>
        </div>
        <div class="skill-note">${note}</div>
      `;

      skillsGrid.appendChild(skillItem);
    });
  });

  // Update last updated date
  const lastUpdatedEl = document.querySelector('#skills .last-updated');
  if (lastUpdatedEl) {
    const now = new Date();
    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const monthYear = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    lastUpdatedEl.textContent = `Last updated: ${monthYear}`;
  }

  console.log(`Skills rendered: ${skillsData.length} items in ${groupOrder.length} groups`);

  // Initialize skills animation observer
  initSkillsProgressAnimation();
  if (window.AOS) {
    AOS.refresh();
  }
}

/**
 * Initialize progress bar animation with IntersectionObserver
 * Animate progress bars when skill items become visible
 */
function initSkillsProgressAnimation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scope to skills section only
  const skillItems = document.querySelectorAll('#skills .skill-item');
  if (skillItems.length === 0) {
    console.warn('No skill items found for animation');
    return;
  }

  console.log(`Skills progress animation initialized for ${skillItems.length} items`);

  // Observer options
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.2
  };

  // Track animated items to prevent re-animation
  const animatedItems = new Set();

  // Observer callback
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || animatedItems.has(entry.target)) {
        return;
      }

      // Mark as animated
      animatedItems.add(entry.target);

      const skillItem = entry.target;
      const progressBar = skillItem.querySelector('.progress-bar');
      const progressWrap = skillItem.querySelector('.progress-wrap');

      if (!progressBar || !progressWrap) {
        console.warn('Progress bar elements not found');
        return;
      }

      // Get target percent
      const targetPercent = parseInt(skillItem.getAttribute('data-percent') || '0');

      // Add visible class for scroll reveal
      skillItem.classList.add('visible');

      // Calculate stagger delay
      // Desktop 2-column grid: items in same column stagger by +80ms per row
      // Mobile single column: sequential +80ms delay
      const allItems = Array.from(skillItems);
      const itemIndex = allItems.indexOf(skillItem);
      const isWideScreen = window.matchMedia('(min-width: 900px)').matches;

      let staggerDelay = 0;
      if (!prefersReducedMotion) {
        if (isWideScreen) {
          // Desktop 2-column grid: calculate delay based on row position in column
          // Count skill-items before this one (excluding group titles)
          let skillItemCount = 0;
          let current = skillItem.previousElementSibling;
          while (current) {
            if (current.classList.contains('skill-item')) {
              skillItemCount++;
            }
            current = current.previousElementSibling;
          }
          // In 2-column grid: column 0 or 1, row = Math.floor(skillItemCount / 2)
          // Delay based on row: each row adds +80ms
          const rowIndex = Math.floor(skillItemCount / 2);
          staggerDelay = rowIndex * 80;
        } else {
          // Mobile: sequential delay
          staggerDelay = itemIndex * 80;
        }
      }

      // Animate progress bar
      setTimeout(() => {
        if (prefersReducedMotion) {
          // No animation, set directly
          progressBar.style.width = `${targetPercent}%`;
          progressBar.style.transition = 'none';
        } else {
          // Animate from 0% to target
          progressBar.style.width = `${targetPercent}%`;
        }

        console.log(`Progress bar animated: ${skillItem.querySelector('.name').textContent} → ${targetPercent}%`);
      }, staggerDelay);

      // Unobserve after animation starts
      observer.unobserve(skillItem);
    });
  };

  // Create observer instance
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all skill items
  skillItems.forEach(item => {
    observer.observe(item);
  });
}

// ============================================
// TIMELINE DATA & RENDERING
// ============================================
const timelineDataTr = [
  {
    date: "2024",
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

const timelineDataEn = [
  {
    date: "2024",
    title: "Started MIS Bachelor",
    subtitle: "Düzce University",
    description: "Started my Management Information Systems bachelor degree.",
    tags: ["University", "MIS"],
    icon: "🎓",
    link: "#"
  },
  {
    date: "2024",
    title: "C# & SQL Projects",
    subtitle: "Windows Forms / EF",
    description: "Built apps with CRUD, reporting and relational database structures.",
    tags: ["C#", "SQL", "Entity Framework"],
    icon: "💻",
    link: "#"
  },
  {
    date: "2024",
    title: "Case Study Competitions",
    subtitle: "SWOT/PESTEL, Strategy",
    description: "Solved business cases with my team and prepared presentations.",
    tags: ["Case Study", "Strategy"],
    icon: "📊",
    link: "#"
  },
  {
    date: "2025",
    title: "Azure Fundamentals Training",
    subtitle: "MIUUL",
    description: "Training on cloud basics, service models and cost management.",
    tags: ["Azure", "Cloud"],
    icon: "☁️",
    link: "#"
  },
  {
    date: "2025",
    title: "Quality Community Board Member",
    subtitle: "Writing & Communications",
    description: "Board member in DU Quality Community; content planning and copywriting.",
    tags: ["Community", "Communication", "Board"],
    icon: "🗣️",
    link: "#"
  },
  {
    date: "2025",
    title: "Personal Portfolio & Card Site",
    subtitle: "HTML/CSS/JS",
    description: "Launched my personal brand with dark theme, interactions and timeline.",
    tags: ["Frontend", "Portfolio"],
    icon: "🗂️",
    link: "#"
  }
];

/**
 * Initialize and render timeline
 */
function initTimeline(lang) {
  const timelineList = document.getElementById('timeline-list');
  if (!timelineList) {
    console.warn('Timeline list not found');
    return;
  }

  console.log('Timeline rendering started');

  timelineList.innerHTML = '';
  const data = (lang === 'en') ? timelineDataEn : timelineDataTr;
  data.forEach((item, index) => {
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

  console.log(`Timeline rendered: ${data.length} items`);
  try { initScrollReveal(); } catch (e) { }
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
    // Show all reveal elements immediately, excluding skills section (handled separately)
    document.querySelectorAll('[data-reveal]:not(#skills [data-reveal])').forEach(el => {
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

  // Observe all elements with data-reveal attribute, excluding skills section (handled separately)
  const revealElements = document.querySelectorAll('[data-reveal]:not(#skills [data-reveal])');
  revealElements.forEach(el => {
    observer.observe(el);
  });

  console.log(`Observing ${revealElements.length} elements for scroll reveal (skills section excluded)`);

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

  const statusEl = document.getElementById('form-status');

  // Form submit handler
  contactForm.addEventListener('submit', function (e) {
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

    // Determine language for messages
    let lang = 'tr';
    try { lang = localStorage.getItem('lang') || 'tr'; } catch (e) { }

    const messages = {
      tr: {
        fillAll: 'Lütfen tüm alanları doldurun.',
        invalidEmail: 'Lütfen geçerli bir e-posta adresi girin.',
        'contact.success': 'Mesajın başarıyla gönderildi. En kısa sürede dönüş yapacağım.',
        'contact.error': 'Bir hata oluştu. Lütfen daha sonra tekrar dene.',
        'chat.launch': 'Enes’in Asistanı'
      },
      en: {
        fillAll: 'Please fill in all fields.',
        invalidEmail: 'Please enter a valid email address.',
        'contact.success': 'Your message has been sent successfully. I will get back to you as soon as possible.',
        'contact.error': 'Something went wrong. Please try again later.',
        'chat.launch': "Enes' Assistant"
      }
    };

    const t = messages[lang] || messages.tr;

    // Helper to show status message
    function showStatus(type, text) {
      if (!statusEl) {
        // Fallback to alert if status element is missing
        if (type === 'error') {
          alert(text);
        } else {
          alert(text);
        }
        return;
      }
      statusEl.textContent = text;
      statusEl.classList.remove('form-status--success', 'form-status--error');
      if (type === 'success') {
        statusEl.classList.add('form-status--success');
      } else if (type === 'error') {
        statusEl.classList.add('form-status--error');
      }
    }

    // Validation: Check if any field is empty
    if (!name || !email || !message) {
      console.warn('Form validation failed - empty fields');
      showStatus('error', t.fillAll);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('Form validation failed - invalid email');
      showStatus('error', t.invalidEmail);
      return;
    }

    const submitButton = contactForm.querySelector('.form-submit');
    if (submitButton) {
      submitButton.disabled = true;
    }

    // Prepare FormData for Formspree
    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        console.log('Form submitted to Formspree successfully');
        showStatus('success', t.success);
        if (submitButton) {
          submitButton.classList.add('submit-success');
        }
        contactForm.reset();
        setTimeout(() => {
          if (submitButton) {
            submitButton.classList.remove('submit-success');
          }
        }, 2000);
      } else {
        console.warn('Formspree responded with error status', response.status);
        showStatus('error', t.error);
      }
    }).catch(error => {
      console.error('Formspree request failed', error);
      showStatus('error', t.error);
    }).finally(() => {
      if (submitButton) {
        submitButton.disabled = false;
      }
    });
  });

  // Add hover animation to submit button (already styled in CSS)
  const submitButton = contactForm.querySelector('.form-submit');
  if (submitButton) {
    submitButton.addEventListener('mouseenter', function () {
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

function initEnesChat() {
  // const BACKEND_URL = "https://portfolio-backend-px1t.onrender.com";
  const BACKEND_URL = "https://portfolio-9zbf.onrender.com";
  let chatHistory = [];

  const toggleBtn = document.getElementById('enes-chat-toggle');
  const widget = document.getElementById('enes-chat-widget');
  const closeBtn = widget ? widget.querySelector('.enes-chat-close') : null;
  const messagesEl = document.getElementById('enes-chat-messages');
  const form = document.getElementById('enes-chat-form');
  const input = document.getElementById('enes-chat-input');
  const quickRepliesEl = document.getElementById('enes-chat-quick-replies');
  const typingIndicatorEl = document.getElementById('ai-typing-indicator');
  const menuToggleBtn = widget ? widget.querySelector('.enes-chat-menu-toggle') : null;
  const menuEl = document.getElementById('enes-chat-menu');

  if (!toggleBtn || !widget || !messagesEl || !form || !input) {
    console.warn('Enes chat widget elements not found');
    return;
  }

  let lang = 'tr';
  try {
    lang = localStorage.getItem('lang') || 'tr';
  } catch (e) { }

  function getInitialMessage(language) {
    if (language === 'en') {
      return "Hi, I’m Enes’s personal assistant. What would you like to know about Enes?";
    }
    return "Merhaba, ben Enes’in kişisel asistanıyım. Enes hakkında ne bilmek istersin?";
  }

  let initialized = false;

  const originalBodyOverflow = document.body.style.overflow || '';

  function openWidget() {
    widget.classList.add('enes-chat-widget--open');
    widget.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (!initialized) {
      appendMessage('bot', getInitialMessage(lang), messagesEl);
      initialized = true;
    }
  }

  function closeWidget() {
    widget.classList.remove('enes-chat-widget--open');
    widget.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = originalBodyOverflow;
  }

  toggleBtn.addEventListener('click', () => {
    if (widget.classList.contains('enes-chat-widget--open')) {
      closeWidget();
    } else {
      openWidget();
      input.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeWidget();
      toggleBtn.focus();
    });
  }

  function showTypingIndicator() {
    if (!typingIndicatorEl) return;
    typingIndicatorEl.setAttribute('aria-hidden', 'false');
    messagesEl.scrollTo({
      top: messagesEl.scrollHeight,
      behavior: 'smooth',
    });
  }

  function hideTypingIndicator() {
    if (!typingIndicatorEl) return;
    typingIndicatorEl.setAttribute('aria-hidden', 'true');
  }

  async function sendMessageToAssistant(userMessage) {
    const text = (userMessage || '').trim();
    if (!text) return;

    // 1. Show user message
    appendMessage('user', text, messagesEl);

    // 2. Add to history
    chatHistory.push({ role: "user", content: text });

    // 3. Show typing indicator
    showTypingIndicator();

    try {
      // 4. Send to backend
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: chatHistory
        })
      });

      const data = await response.json();
      const reply = data.reply || (lang === 'en' ? "Assistant is currently unavailable." : "Asistan şu anda cevap veremiyor.");

      // 5. Add to history
      chatHistory.push({ role: "assistant", content: reply });

      // 6. Show assistant message
      hideTypingIndicator();
      appendMessage('bot', reply, messagesEl);

    } catch (error) {
      console.error("Chat Error:", error);
      hideTypingIndicator();
      const errorMsg = lang === 'en'
        ? "Something went wrong, please try again later."
        : "Şu anda bir sorun oluştu, lütfen daha sonra tekrar dene.";
      appendMessage('bot', errorMsg, messagesEl);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    sendMessageToAssistant(text);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  });

  if (quickRepliesEl) {
    quickRepliesEl.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.classList.contains('enes-chat-chip')) return;
      const q = target.getAttribute('data-question');
      if (!q) return;
      sendMessageToAssistant(q);
    });
  }

  if (menuToggleBtn && menuEl) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = menuEl.classList.contains('enes-chat-menu--open');
      if (isOpen) {
        menuEl.classList.remove('enes-chat-menu--open');
        menuEl.setAttribute('aria-hidden', 'true');
      } else {
        menuEl.classList.add('enes-chat-menu--open');
        menuEl.setAttribute('aria-hidden', 'false');
      }
    });

    menuEl.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.classList.contains('enes-chat-menu-item')) return;

      const action = target.getAttribute('data-action');
      if (action === 'clear') {
        if (messagesEl) {
          messagesEl.innerHTML = '';
          chatHistory = [];
          appendMessage('bot', getInitialMessage(lang), messagesEl);
        }
      } else if (action === 'about') {
        const aboutText = 'AI Asistan, Enes Çetin hakkındaki bilgileri ve portföyündeki içerikleri sana daha hızlı sunmak için tasarlanmış basit bir yardımcıdır.';
        alert(aboutText);
      }

      menuEl.classList.remove('enes-chat-menu--open');
      menuEl.setAttribute('aria-hidden', 'true');
    });
  }
}

function appendMessage(sender, text, containerEl) {
  if (!containerEl) return;

  const isUser = sender === 'user';

  const row = document.createElement('div');
  row.className = 'chat-message ' + (isUser ? 'user' : 'bot') + ' message-enter';

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';

  const textEl = document.createElement('div');
  textEl.className = 'chat-text';
  textEl.textContent = text;

  const now = new Date();
  const time = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  const timeEl = document.createElement('span');
  timeEl.className = 'chat-time';
  timeEl.textContent = time;

  bubble.appendChild(textEl);
  bubble.appendChild(timeEl);

  // Only bot messages show an avatar; user messages appear as clean right-aligned bubbles
  if (!isUser) {
    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    row.appendChild(avatar);
  }

  row.appendChild(bubble);

  containerEl.appendChild(row);

  containerEl.scrollTo({
    top: containerEl.scrollHeight,
    behavior: 'smooth',
  });
}

// getEnesBotReply removed as we are using backend API now

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
(function () {
  const baseTitle = document.title;
  if (typeof document.hidden !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      document.title = document.hidden
        ? "Görüşmek üzere — Enes Çetin"
        : baseTitle;
    });
  }
})();

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const offset = 120;

function updateUnderline() {
  const underline = document.querySelector('.top-center .nav-underline');
  const active = document.querySelector('.top-center .nav-link.active');
  if (!underline) return;
  if (!active) {
    underline.style.width = '0px';
    return;
  }
  const parent = active.parentElement;
  const rect = active.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const left = rect.left - parentRect.left;
  underline.style.left = `${left}px`;
  underline.style.width = `${rect.width}px`;
}

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - offset;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (current && link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
  updateUnderline();
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(updateUnderline, 0);
  });
});

window.addEventListener('resize', () => {
  updateUnderline();
});

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    updateUnderline();
  }
});

// ============================================
// THEME TOGGLE
// ============================================
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const meta = document.getElementById('meta-theme-color');

  function setTheme(t) {
    root.dataset.theme = t;
    try {
      localStorage.setItem('theme', t);
    } catch (e) {
      // localStorage not available
    }

    // meta theme-color senkronu
    if (meta) {
      const themeColor = getComputedStyle(root).getPropertyValue('--theme-color').trim();
      meta.setAttribute('content', themeColor);
    }

    // ARIA durumu
    if (btn) {
      btn.setAttribute('aria-pressed', String(t === 'dark'));
      btn.setAttribute('aria-label', t === 'dark' ? 'Temayı değiştir (Şu an: Koyu)' : 'Temayı değiştir (Şu an: Açık)');
      btn.title = t === 'dark' ? 'Tema: Koyu' : 'Tema: Açık';
    }
  }

  // İlk yükte inline script data-theme ayarladı. Buradan sadece ARIA ve meta'yı senkronla.
  const initial = root.dataset.theme || 'dark';
  setTheme(initial);

  if (btn) {
    btn.addEventListener('click', () => {
      const next = (root.dataset.theme === 'dark') ? 'light' : 'dark';
      setTheme(next);
    });

    // Klavye desteği: Space/Enter
    btn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        btn.click();
      }
    });
  }
})();

// ============================================
// ABOUT TERMINAL TYPING ANIMATION
// ============================================
function initAboutTerminal() {
  // Developer overrides
  const params = new URLSearchParams(window.location.search || '');
  const forceQS = params.get('showTerminal') === '1';
  let forceLS = false;
  try { forceLS = localStorage.getItem('forceShowTerminal') === '1'; } catch (e) { }

  // Do not show again if seen, unless override is enabled
  if (!forceQS && !forceLS) {
    try {
      if (localStorage.getItem('aboutMeShown') === '1') return;
    } catch (e) { }
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const contentLines = [
    'role: YBS Student at Düzce University',
    'focus: C#, SQL, AI & Data Analytics',
    'goal: bridging business & technology',
    'motto: keep learning, keep building ⚡'
  ];

  // Build floating panel
  const panel = document.createElement('div');
  panel.className = 'floating-terminal';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'About Me Terminal');

  panel.innerHTML = `
    <div class="terminal-header">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="terminal-title">about-me.sh</span>
      <button class="terminal-close" type="button" aria-label="Kapat">×</button>
    </div>
    <div class="terminal-body">
      <pre class="terminal-lines" aria-live="polite"></pre>
    </div>
  `;

  const linesEl = panel.querySelector('.terminal-lines');
  const closeBtn = panel.querySelector('.terminal-close');
  const cursor = document.createElement('span');
  cursor.className = 'terminal-cursor';

  function renderInstant() {
    linesEl.textContent = contentLines.join('\n');
  }

  function typeLine(text, cb) {
    let i = 0;
    const lineEl = document.createElement('div');
    linesEl.appendChild(lineEl);
    const speed = 18;
    (function step() {
      lineEl.textContent = text.slice(0, i + 1);
      i++;
      if (i < text.length) {
        setTimeout(step, speed);
      } else {
        cb && cb();
      }
    })();
  }

  function startTyping() {
    if (prefersReducedMotion) {
      renderInstant();
      return;
    }
    let idx = 0;
    (function next() {
      if (idx >= contentLines.length) {
        const lastLine = linesEl.lastChild;
        if (lastLine) lastLine.appendChild(cursor);
        return;
      }
      typeLine(contentLines[idx], () => {
        idx++;
        setTimeout(next, 250);
      });
    })();
  }

  function closePanel() {
    panel.classList.remove('show');
    setTimeout(() => {
      panel.remove();
    }, prefersReducedMotion ? 0 : 180);
    try { localStorage.setItem('aboutMeShown', '1'); } catch (e) { }
  }

  closeBtn.addEventListener('click', closePanel);

  document.body.appendChild(panel);

  // Trigger show with animation
  if (!prefersReducedMotion) {
    requestAnimationFrame(() => panel.classList.add('show'));
  } else {
    panel.classList.add('show');
  }

  // Start typing immediately after mount
  startTyping();
}

// Helpers to control developer preview mode from console
window.enableTerminalPreview = function enableTerminalPreview() {
  try { localStorage.setItem('forceShowTerminal', '1'); console.log('Terminal preview enabled'); } catch (e) { }
}
window.disableTerminalPreview = function disableTerminalPreview() {
  try { localStorage.removeItem('forceShowTerminal'); console.log('Terminal preview disabled'); } catch (e) { }
}

