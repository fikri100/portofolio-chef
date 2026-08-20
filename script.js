/* Shared Interactivity Script for Chef Muhammad Mirza Portfolio */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Reveal Observer
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach(el => observer.observe(el));
    
    // Initial check for hero elements visible immediately
    setTimeout(() => {
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("active");
        }
      });
    }, 100);
  }

  // 2. Active Navigation Link Highlighting (Header & Mobile Bottom Nav)
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      // Highlight Desktop Nav
      if (link.classList.contains("desktop-nav-link")) {
        link.classList.add("text-primary", "font-semibold");
        link.classList.remove("text-on-surface-variant");
      }
      // Highlight Mobile Bottom Nav
      if (link.classList.contains("bottom-nav-link")) {
        link.classList.add("text-primary", "font-bold");
        link.classList.remove("text-on-surface-variant");
        const icon = link.querySelector(".material-symbols-outlined");
        if (icon) icon.classList.add("filled");
      }
    }
  });

  // 3. Gallery Filter & Modal Lightbox (for galeri.html)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-primary-container", "text-on-primary");
        b.classList.add("bg-surface-container-high", "text-on-surface-variant");
      });
      btn.classList.remove("bg-surface-container-high", "text-on-surface-variant");
      btn.classList.add("bg-primary-container", "text-on-primary");

      const filter = btn.getAttribute("data-filter");
      galleryItems.forEach(item => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
          setTimeout(() => item.classList.add("active"), 50);
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Modal Lightbox
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalDesc = document.getElementById("modal-desc");
  const closeModalBtn = document.getElementById("close-modal");

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      if (!modal) return;
      const title = item.getAttribute("data-title");
      const category = item.getAttribute("data-category-label");
      const desc = item.getAttribute("data-desc");
      const img = item.querySelector("img") ? item.querySelector("img").src : "";

      if (modalTitle) modalTitle.textContent = title || "Signature Creation";
      if (modalCategory) modalCategory.textContent = category || "Food Styling";
      if (modalDesc) modalDesc.textContent = desc || "";
      if (modalImg && img) modalImg.src = img;

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    });
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });
  }

  // 4. Contact Form Handler (for kontak.html)
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("toast-notification");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (toast) {
        toast.classList.remove("translate-y-20", "opacity-0");
        setTimeout(() => {
          toast.classList.add("translate-y-20", "opacity-0");
        }, 4000);
      }
      contactForm.reset();
    });
  }
});
