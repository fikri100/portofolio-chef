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

  const applyFilter = (filterName) => {
    filterBtns.forEach(btn => {
      if (btn.getAttribute("data-filter") === filterName) {
        btn.classList.remove("bg-surface-container-high", "text-on-surface-variant");
        btn.classList.add("bg-primary-container", "text-on-primary");
      } else {
        btn.classList.remove("bg-primary-container", "text-on-primary");
        btn.classList.add("bg-surface-container-high", "text-on-surface-variant");
      }
    });

    galleryItems.forEach(item => {
      const catAttr = item.getAttribute("data-category") || "";
      const categories = catAttr.split(" ");
      if (filterName === "all" || categories.includes(filterName) || catAttr.includes(filterName)) {
        item.style.display = "block";
        setTimeout(() => item.classList.add("active"), 50);
      } else {
        item.style.display = "none";
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      applyFilter(filter);
    });
  });

  // Check URL Query Parameters for filter (e.g. galeri.html?filter=styling)
  const urlParams = new URLSearchParams(window.location.search);
  let initialFilter = urlParams.get("filter");
  if (initialFilter === "reels") initialFilter = "styling";
  if (initialFilter) {
    applyFilter(initialFilter);
  }

  // Modal Lightbox & Direct Video Links
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalDesc = document.getElementById("modal-desc");
  const modalDriveBtn = document.getElementById("modal-drive-btn");
  const closeModalBtn = document.getElementById("close-modal");

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const catAttr = item.getAttribute("data-category") || "";
      const driveUrl = item.getAttribute("data-drive-url");

      // Direct video navigation for video reels
      if (catAttr.includes("reels") && driveUrl) {
        window.open(driveUrl, "_blank");
        return;
      }

      if (!modal) return;
      const title = item.getAttribute("data-title");
      const category = item.getAttribute("data-category-label");
      const desc = item.getAttribute("data-desc");
      const img = item.querySelector("img") ? item.querySelector("img").src : "";

      if (modalTitle) modalTitle.textContent = title || "Signature Creation";
      if (modalCategory) modalCategory.textContent = category || "Food Styling";
      if (modalDesc) modalDesc.textContent = desc || "";
      if (modalImg && img) modalImg.src = img;

      if (modalDriveBtn) {
        modalDriveBtn.setAttribute("href", driveUrl || "https://drive.google.com/drive/folders/1Gz4ezNSw1VzaG_fk6Qz344azyxfeKYoW");
        if (catAttr.includes("reels") || driveUrl) {
          modalDriveBtn.classList.remove("hidden");
        } else {
          modalDriveBtn.classList.add("hidden");
        }
      }

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

      const name = document.getElementById("name") ? document.getElementById("name").value.trim() : "";
      const email = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
      const phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
      const serviceSelect = document.getElementById("service");
      const serviceValue = serviceSelect ? serviceSelect.value : "";
      const serviceText = serviceSelect && serviceSelect.selectedIndex >= 0 ? serviceSelect.options[serviceSelect.selectedIndex].text : serviceValue;
      const message = document.getElementById("message") ? document.getElementById("message").value.trim() : "";

      let subject = "Layanan Chef Muhammad Mirza";
      if (serviceValue === "private-chef") {
        subject = `[Reservasi] Exclusive Private Chef Fine Dining - ${name}`;
      } else if (serviceValue === "food-styling") {
        subject = `[Reservasi] Commercial Food Styling - ${name}`;
      } else if (serviceValue === "consulting") {
        subject = `[Reservasi] Technical Culinary Consulting - ${name}`;
      } else if (serviceValue === "demo") {
        subject = `[Reservasi] Live Cooking Demo & Event - ${name}`;
      } else if (name) {
        subject = `[Reservasi] Layanan Chef Muhammad Mirza - ${name}`;
      }

      const body = `Halo Chef Muhammad Mirza,\n\nSaya ingin mengajukan reservasi dengan detail sebagai berikut:\n\n- Nama: ${name}\n- Email: ${email}\n- No. HP/WA: ${phone}\n- Layanan: ${serviceText}\n\nDetail Pesan/Acara:\n${message}\n\nTerima kasih.`;

      const mailtoUrl = `mailto:mirza.991990@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (toast) {
        toast.classList.remove("translate-y-20", "opacity-0");
        setTimeout(() => {
          toast.classList.add("translate-y-20", "opacity-0");
        }, 4000);
      }

      window.location.href = mailtoUrl;
      contactForm.reset();
    });
  }
});
