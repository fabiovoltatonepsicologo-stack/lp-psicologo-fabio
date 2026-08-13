// Fábio Voltatone — LP
// Vanilla JS: scroll reveal, accordion, menu mobile

document.addEventListener("DOMContentLoaded", () => {

    // ---- Reveal on scroll ----
    const revealEls = document.querySelectorAll('[class*="reveal-"]');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        revealEls.forEach((el, i) => {
            if (!el.style.transitionDelay) {
                // If not manually sequenced in HTML, no delay
                el.style.transitionDelay = '0ms';
            }
            observer.observe(el);
        });
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    // ---- Accordion FAQ ----
    document.querySelectorAll(".accordion-item").forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");

        header.addEventListener("click", () => {
            const isOpen = item.classList.contains("is-open");

            document.querySelectorAll(".accordion-item.is-open").forEach((openItem) => {
                if (openItem !== item) {
                    openItem.classList.remove("is-open");
                    openItem.querySelector(".accordion-content").style.maxHeight = null;
                }
            });

            if (isOpen) {
                item.classList.remove("is-open");
                content.style.maxHeight = null;
            } else {
                item.classList.add("is-open");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // ---- Mobile menu ----
    const menuBtn = document.getElementById("mobileMenuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            const expanded = menuBtn.getAttribute("aria-expanded") === "true";
            menuBtn.setAttribute("aria-expanded", String(!expanded));
            nav.classList.toggle("nav-open");
        });

        nav.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("nav-open");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ---- Header shadow on scroll ----
    const header = document.getElementById("header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.style.boxShadow = window.scrollY > 8 ? "0 1px 0 rgba(34,30,25,0.08)" : "none";
        });
    }
});
