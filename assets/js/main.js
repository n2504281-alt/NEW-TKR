document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 800); // Fades out after 800ms
  }

  // Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });
  }

  // Sticky Navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile Navigation Menu Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.toggle('active');
      mobileToggle.innerHTML = mobileOverlay.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking nav links
    const mobileLinks = mobileOverlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // Scroll Reveal Animations using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.12, // Trigger when 12% is visible
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Statistics Count-Up Animation
  const statsElements = document.querySelectorAll('.stat-number');
  if (statsElements.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetNum = parseInt(target.getAttribute('data-target'), 10);
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentNum = Math.floor(progress * targetNum);
            
            // Format number (add + or % as specified in suffix)
            const suffix = target.getAttribute('data-suffix') || '';
            target.textContent = currentNum.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              target.textContent = targetNum.toLocaleString() + suffix;
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(target); // Animate once
        }
      });
    }, {
      threshold: 0.5
    });

    statsElements.forEach(stat => statsObserver.observe(stat));
  }

  // Global Language Switcher (EN | اردو)
  const langSelectors = document.querySelectorAll('.lang-selector');
  
  // Set initial language from local storage or default to English
  const currentLang = localStorage.getItem('tkr-lang') || 'en';
  setLanguage(currentLang);

  langSelectors.forEach(selector => {
    // Set value of select dropdowns if they exist
    if (selector.tagName === 'SELECT') {
      selector.value = currentLang;
    }
    
    selector.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      setLanguage(selectedLang);
    });

    // In case language toggle is a button
    selector.addEventListener('click', (e) => {
      if (e.target.tagName !== 'SELECT') {
        const activeLang = document.documentElement.getAttribute('lang') || 'en';
        const nextLang = activeLang === 'en' ? 'ur' : 'en';
        setLanguage(nextLang);
      }
    });
  });

  function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('tkr-lang', lang);
    
    // Sync all dropdowns
    langSelectors.forEach(selector => {
      if (selector.tagName === 'SELECT') {
        selector.value = lang;
      } else {
        selector.textContent = lang === 'en' ? 'اردو' : 'English';
      }
    });

    // Handle RTL adjustments for specific pages if needed
    if (lang === 'ur') {
      document.body.style.fontFamily = "var(--font-urdu), var(--font-accent), serif";
      document.body.setAttribute('dir', 'rtl');
    } else {
      document.body.style.fontFamily = "var(--font-body), sans-serif";
      document.body.removeAttribute('dir');
    }
  }
});
