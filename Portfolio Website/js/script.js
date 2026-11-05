/* =====================================================
   JEREMIAH THANKGOD PORTFOLIO
   Main JavaScript
===================================================== */


/* =====================================================
   WAIT FOR PAGE TO LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
    ================================================= */

    const header =
        document.getElementById("header");

    const menuToggle =
        document.getElementById("menu-toggle");

    const nav =
        document.getElementById("nav");

    const themeToggle =
        document.getElementById("theme-toggle");

    const contactForm =
        document.getElementById("contact-form");

    const formStatus =
        document.getElementById("form-status");

    const navLinks =
        document.querySelectorAll(".nav-link");


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    const updateHeader = () => {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    if (menuToggle && nav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    nav.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

                menuToggle.textContent =
                    isOpen ? "✕" : "☰";

            }
        );


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                    menuToggle.textContent = "☰";

                }
            );

        });

    }


    /* =================================================
       DARK / LIGHT MODE
    ================================================= */

    const applyTheme = (theme) => {

        const isLight =
            theme === "light";

        if (isLight) {

            document.body.classList.add(
                "light-mode"
            );

        } else {

            document.body.classList.remove(
                "light-mode"
            );

        }


        if (themeToggle) {

            themeToggle.textContent =
                isLight ? "☾" : "☀";

            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

        }

    };


    /*
       Get previously saved theme.
       If none exists, use dark mode.
    */

    let savedTheme =
        localStorage.getItem("theme");


    if (
        savedTheme !== "light" &&
        savedTheme !== "dark"
    ) {

        savedTheme = "dark";

    }


    /* Apply saved theme immediately */

    applyTheme(savedTheme);


    /* Theme button */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isCurrentlyLight =
                    document.body.classList.contains(
                        "light-mode"
                    );

                const newTheme =
                    isCurrentlyLight
                        ? "dark"
                        : "light";


                applyTheme(newTheme);


                localStorage.setItem(
                    "theme",
                    newTheme
                );

            }
        );

    }


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const updateActiveNavigation = () => {

        let currentSection = "home";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const target =
                link.getAttribute("href");


            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".project-card, " +
            ".highlight-card, " +
            ".skill-category, " +
            ".timeline-item, " +
            ".contact-form, " +
            ".contact-detail"
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    /*
       IntersectionObserver is supported
       by modern browsers.
    */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(element);

            }
        );

    } else {

        /*
           Fallback for browsers that
           don't support IntersectionObserver.
        */

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


   contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            formStatus.textContent =
                "Message sent successfully!";
            contactForm.reset();
        } else {
            formStatus.textContent =
                "Sorry, your message could not be sent. Please try again.";
        }
    } catch (error) {
        formStatus.textContent =
            "Unable to send your message. Please try again later.";
    }

    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
});

    /* =================================================
       SMOOTH INTERNAL LINKS
    ================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


});