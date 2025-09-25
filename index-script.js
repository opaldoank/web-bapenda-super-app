/**
 * BAPENDA Modern Website JavaScript
 * Enhanced with modern ES6+ features, performance optimizations, and accessibility
 */

class BapendaWebsite {
  constructor() {
    this.init();
    this.bindEvents();
    this.initComponents();
  }

  /**
   * Initialize the website
   */
  init() {
    // Set initial theme
    this.initTheme();
    
    // Initialize page loader
    this.initPageLoader();
    
    // Create particles
    this.createParticles();
    
    // Initialize animations
    this.initAnimations();
    
    // Initialize counters
    this.initCounters();
    
    // Generate QR Code
    this.generateQRCode();
    
    // Initialize mobile menu
    this.initMobileMenu();
    
    // Initialize floating buttons
    this.initFloatingButtons();
    
    console.log('BAPENDA Website initialized successfully');
  }

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Scroll events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    
    // Resize events
    window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
    
    // Navigation events
    this.bindNavigationEvents();
    
    // Gallery events
    this.bindGalleryEvents();
    
    // Form events
    this.bindFormEvents();
    
    // Theme toggle events
    this.bindThemeEvents();
    
    // Accessibility events
    this.bindAccessibilityEvents();
  }

  /**
   * Initialize all components
   */
  initComponents() {
    // Initialize intersection observer for animations
    this.initIntersectionObserver();
    
    // Initialize smooth scrolling
    this.initSmoothScrolling();
    
    // Initialize progressive image loading
    this.initLazyLoading();
    
    // Initialize search functionality (if needed)
    this.initSearch();
  }

  /**
   * Initialize page loader with modern animation
   */
  initPageLoader() {
    const loader = document.getElementById('pageLoader');
    
    if (!loader) return;
    
    // Simulate minimum loading time for better UX
    const minLoadTime = 1500;
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
      const elapsed = performance.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Remove loader from DOM after animation
        setTimeout(() => {
          if (loader.parentNode) {
            loader.remove();
          }
        }, 500);
        
        // Trigger entrance animations
        this.triggerEntranceAnimations();
      }, remainingTime);
    });
  }

  /**
   * Create floating particles for hero section
   */
  createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    const particles = [];
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 6 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 10 + 8;
      
      // Apply styles
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: Math.random() * 0.5 + 0.3
      });
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    this.particles = particles;
  }

  /**
   * Initialize theme system
   */
  initTheme() {
    const savedTheme = localStorage.getItem('bapenda-theme') || 'light';
    this.setTheme(savedTheme);
  }

  /**
   * Set theme
   */
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bapenda-theme', theme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
      }
    }
  }

  /**
   * Bind theme toggle events
   */
  bindThemeEvents() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add feedback animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
          themeToggle.style.transform = '';
        }, 150);
      });
    }
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    const scrollY = window.scrollY;
    
    // Update header
    this.updateHeader(scrollY);
    
    // Update scroll progress
    this.updateScrollProgress();
    
    // Update scroll to top button
    this.updateScrollToTopButton(scrollY);
    
    // Update active navigation
    this.updateActiveNavigation();
    
    // Parallax effects
    this.updateParallaxEffects(scrollY);
  }

  /**
   * Update header based on scroll position
   */
  updateHeader(scrollY) {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /**
   * Update scroll progress indicator
   */
  updateScrollProgress() {
    const progressBar = document.getElementById('headerProgress');
    if (!progressBar) return;
    
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / scrollHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  /**
   * Update scroll to top button visibility
   */
  updateScrollToTopButton(scrollY) {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;
    
    if (scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  /**
   * Update active navigation link based on scroll position
   */
  updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200 && rect.bottom > 200) {
        currentSection = section.id;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Update parallax effects
   */
  updateParallaxEffects(scrollY) {
    // Hero background parallax
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    
    // Particles parallax
    if (this.particles) {
      this.particles.forEach((particle, index) => {
        const speed = 0.1 + (index % 3) * 0.05;
        particle.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }
  }

  /**
   * Initialize mobile menu
   */
  initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.main-nav');
    
    if (!mobileToggle || !navLinks) return;
    
    mobileToggle.addEventListener('click', () => {
      const isActive = navLinks.classList.contains('active');
      
      if (isActive) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        navLinks.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
    
    // Close menu when clicking on links
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Bind navigation events
   */
  bindNavigationEvents() {
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // Navigation links smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Initialize smooth scrolling
   */
  initSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href.length <= 1) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Initialize animations with Intersection Observer
   */
  initAnimations() {
    // Fallback for browsers without Intersection Observer
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    
    this.initIntersectionObserver();
  }

  /**
   * Initialize Intersection Observer for animations
   */
  initIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    // Observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-aos], .fade-in, .fade-in-left, .fade-in-right, .zoom-in');
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Animate element when it comes into view
   */
  animateElement(element) {
    const animationType = element.getAttribute('data-aos') || 
                         element.classList.contains('fade-in-left') ? 'fade-left' :
                         element.classList.contains('fade-in-right') ? 'fade-right' :
                         element.classList.contains('zoom-in') ? 'zoom-in' : 'fade-up';
    
    const delay = parseInt(element.getAttribute('data-aos-delay') || '0');
    
    setTimeout(() => {
      element.classList.add('visible');
      element.style.opacity = '1';
      
      switch (animationType) {
        case 'fade-up':
          element.style.transform = 'translateY(0)';
          break;
        case 'fade-left':
          element.style.transform = 'translateX(0)';
          break;
        case 'fade-right':
          element.style.transform = 'translateX(0)';
          break;
        case 'zoom-in':
          element.style.transform = 'scale(1)';
          break;
      }
    }, delay);
  }

  /**
   * Trigger entrance animations after page load
   */
  triggerEntranceAnimations() {
    // Hero content animation sequence
    const heroElements = [
      '.hero-badge',
      '.hero-title',
      '.hero-subtitle',
      '.hero-stats',
      '.hero-cta',
      '.scroll-indicator'
    ];
    
    heroElements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
      }
    });
  }

  /**
   * Initialize counters with animation
   */
  initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    
    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  /**
   * Animate counter numbers
   */
  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };
    
    updateCounter();
  }

  /**
   * Initialize floating action buttons
   */
  initFloatingButtons() {
    const fabWhatsapp = document.getElementById('fabWhatsapp');
    const fabCall = document.getElementById('fabCall');
    
    if (fabWhatsapp) {
      fabWhatsapp.addEventListener('click', () => {
        window.open('https://wa.me/6285267884488', '_blank');
        this.trackEvent('FloatingButton', 'WhatsApp Click');
      });
    }
    
    if (fabCall) {
      fabCall.addEventListener('click', () => {
        window.open('tel:+6285267884488', '_self');
        this.trackEvent('FloatingButton', 'Call Click');
      });
    }
  }

  /**
   * Bind gallery events
   */
  bindGalleryEvents() {
    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items
        this.filterGallery(galleryItems, filter);
      });
    });
    
    // Lightbox functionality
    const galleryButtons = document.querySelectorAll('.gallery-btn');
    galleryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = button.closest('.gallery-item');
        const img = item.querySelector('img');
        this.openLightbox(img.src, img.alt);
      });
    });
  }

  /**
   * Filter gallery items
   */
  filterGallery(items, filter) {
    items.forEach(item => {
      const category = item.getAttribute('data-category');
      const shouldShow = filter === 'all' || category === filter;
      
      if (shouldShow) {
        item.style.display = 'block';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        // Animate in
        setTimeout(() => {
          item.style.transition = 'all 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  /**
   * Open lightbox for images
   */
  openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <img src="${src}" alt="${alt}" />
        <div class="lightbox-caption">${alt}</div>
      </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    const backdrop = lightbox.querySelector('.lightbox-backdrop');
    backdrop.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
      text-align: center;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
      z-index: 1;
      transition: transform 0.2s ease;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
    `;
    
    const caption = lightbox.querySelector('.lightbox-caption');
    caption.style.cssText = `
      color: white;
      margin-top: 1rem;
      font-size: 1.1rem;
    `;
    
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
      lightbox.style.opacity = '1';
    }, 50);
    
    // Close functionality
    const closeLightbox = () => {
      lightbox.style.opacity = '0';
      setTimeout(() => {
        if (lightbox.parentNode) {
          lightbox.remove();
        }
      }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);
    
    // Close with Escape key
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', handleKeydown);
      }
    };
    document.addEventListener('keydown', handleKeydown);
  }

  /**
   * Bind form events
   */
  bindFormEvents() {
    // Show more UPTD button
    const showMoreBtn = document.getElementById('showMoreUptd');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        this.showMoreUptd();
      });
    }
    
    // Play button functionality
    const playButton = document.getElementById('playButton');
    if (playButton) {
      playButton.addEventListener('click', () => {
        this.showVideoModal();
      });
    }
  }

  /**
   * Show more UPTD locations
   */
  showMoreUptd() {
    const button = document.getElementById('showMoreUptd');
    const grid = document.querySelector('.uptd-grid');
    
    if (!button || !grid) return;
    
    const additionalUptd = [
      {
        href: "https://bapenda.lampungprov.go.id/uptd6-lampung-utara",
        icon: "fas fa-building",
        title: "UPTD VI Lampung Utara",
        subtitle: "Wilayah Lampung Utara"
      },
      {
        href: "https://bapenda.lampungprov.go.id/uptd7-pringsewu",
        icon: "fas fa-building",
        title: "UPTD VII Pringsewu",
        subtitle: "Wilayah Pringsewu"
      },
      {
        href: "https://bapenda.lampungprov.go.id/uptd8-pesawaran",
        icon: "fas fa-building",
        title: "UPTD VIII Pesawaran",
        subtitle: "Wilayah Pesawaran"
      },
      {
        href: "https://bapenda.lampungprov.go.id/uptd9-pesisir-barat",
        icon: "fas fa-building",
        title: "UPTD IX Pesisir Barat",
        subtitle: "Wilayah Pesisir Barat"
      },
      {
        href: "https://bapenda.lampungprov.go.id/uptd10-way-kanan",
        icon: "fas fa-building",
        title: "UPTD X Way Kanan",
        subtitle: "Wilayah Way Kanan"
      },
      {
        href: "https://bapenda.lampungprov.go.id/uptd11-tulang-bawang",
        icon: "fas fa-building",
        title: "UPTD XI Tulang Bawang",
        subtitle: "Wilayah Tulang Bawang"
      },
      {
        href: "https://bapenda.lampungprov.go.id/uptd12-mesuji",
        icon: "fas fa-building",
        title: "UPTD XII Mesuji",
        subtitle: "Wilayah Mesuji"
      },
      {
        href: "https://bapenda.lampungprov.go.id/uptd13-tanggamus",
        icon: "fas fa-building",
        title: "UPTD XIII Tanggamus",
        subtitle: "Wilayah Tanggamus"
      },
      {
        href: "https://bapenda.lampungprov.go.id/uptd14-lampung-barat",
        icon: "fas fa-building",
        title: "UPTD XIV Lampung Barat",
        subtitle: "Wilayah Lampung Barat"
      },
      {
        href: "https://bapenda.lampungprov.go.id/uptd15-tulang-bawang-barat",
        icon: "fas fa-building",
        title: "UPTD XV Tulang Bawang Barat",
        subtitle: "Wilayah Tulang Bawang Barat"
      }
    ];
    
    // Add additional UPTD cards
    additionalUptd.forEach((uptd, index) => {
      const card = document.createElement('a');
      card.href = uptd.href;
      card.target = '_blank';
      card.className = 'uptd-card';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.innerHTML = `
        <div class="uptd-icon">
          <i class="${uptd.icon}"></i>
        </div>
        <div class="uptd-content">
          <h4>${uptd.title}</h4>
          <p>${uptd.subtitle}</p>
        </div>
        <i class="fas fa-external-link-alt"></i>
      `;
      
      grid.appendChild(card);
      
      // Animate in
      setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * (index + 1));
    });
    
    // Update button
    button.innerHTML = '<span>Semua UPTD Ditampilkan</span> <i class="fas fa-check"></i>';
    button.disabled = true;
    button.style.opacity = '0.6';
  }

  /**
   * Show video modal
   */
  showVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <div class="video-container">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
            frameborder="0" 
            allowfullscreen
            allow="autoplay; encrypted-media">
          </iframe>
        </div>
        <h3>Video Profil BAPENDA Lampung</h3>
        <p>Mengenal lebih dekat layanan dan fasilitas BAPENDA Provinsi Lampung</p>
      </div>
    `;
    
    // Add styles
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 50);
    
    // Close functionality
    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => {
        if (modal.parentNode) {
          modal.remove();
        }
      }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  }

  /**
   * Bind accessibility events
   */
  bindAccessibilityEvents() {
    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const mobileNav = document.querySelector('.main-nav.active');
        if (mobileNav) {
          mobileNav.classList.remove('active');
          document.getElementById('mobileToggle')?.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
    
    // Focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll(focusableElements));
        const currentIndex = focusable.indexOf(document.activeElement);
        
        if (e.shiftKey) {
          // Shift + Tab (backward)
          if (currentIndex === 0) {
            e.preventDefault();
            focusable[focusable.length - 1].focus();
          }
        } else {
          // Tab (forward)
          if (currentIndex === focusable.length - 1) {
            e.preventDefault();
            focusable[0].focus();
          }
        }
      }
    });
  }

  /**
   * Initialize progressive image loading
   */
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Initialize search functionality
   */
  initSearch() {
    // This can be expanded based on requirements
    const searchTriggers = document.querySelectorAll('[data-search]');
    searchTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        this.showSearchModal();
      });
    });
  }

  /**
   * Generate QR Code for WhatsApp
   */
  generateQRCode() {
    const qrContainer = document.getElementById('wa-qrcode');
    if (qrContainer && typeof QRCode !== 'undefined') {
      try {
        new QRCode(qrContainer, {
          text: 'https://wa.me/6285267884488',
          width: 150,
          height: 150,
          colorDark: '#25D366',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
      } catch (error) {
        console.warn('QR Code generation failed:', error);
        qrContainer.innerHTML = '<p style="color: #666;">QR Code tidak dapat dimuat</p>';
      }
    }
  }

  /**
   * Handle resize events
   */
  handleResize() {
    // Recreate particles on resize
    this.createParticles();
    
    // Update any responsive elements
    this.updateResponsiveElements();
  }

  /**
   * Update responsive elements
   */
  updateResponsiveElements() {
    // Update navigation for different screen sizes
    const navLinks = document.querySelectorAll('.nav-link span');
    const isTablet = window.innerWidth <= 1023;
    
    navLinks.forEach(span => {
      span.style.display = isTablet ? 'none' : 'inline';
    });
  }

  /**
   * Track events for analytics
   */
  trackEvent(category, action, label = null) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: 1
      });
    }
    
    // Console log for development
    console.log('Event tracked:', { category, action, label });
  }

  /**
   * Utility functions
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  debounce(func, delay) {
    let timeoutId;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    }
  }

  /**
   * Error handling
   */
  handleError(error, context = 'Unknown') {
    console.error(`BAPENDA Website Error (${context}):`, error);
    
    // Send to error tracking service if available
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error);
    }
  }

  /**
   * Performance monitoring
   */
  initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      console.log(`Page loaded in ${loadTime}ms`);
      
      // Track performance metrics
      this.trackEvent('Performance', 'Page Load Time', Math.round(loadTime));
    });
    
    // Monitor largest contentful paint
    if ('LargestContentfulPaint' in window) {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        this.trackEvent('Performance', 'LCP', Math.round(lastEntry.startTime));
      }).observe({entryTypes: ['largest-contentful-paint']});
    }
  }

  /**
   * Initialize service worker for PWA features
   */
  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  try {
    new BapendaWebsite();
  } catch (error) {
    console.error('Failed to initialize BAPENDA Website:', error);
  }
});

// Initialize AOS if available
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BapendaWebsite;
}