/* =========================================
   THE LAST FRONTIER
   Cinematic JavaScript Experience
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // =====================================
    // SELECTORS
    // =====================================

    const $ = (selector) => document.querySelector(selector);

    const preloader = $("#preloader");
    const progressBar = $(".preloader-progress-bar");
    const counter = $(".preloader-counter");
    const compassNeedle = $(".compass-needle");

    const heroContent = $(".hero-content");
    const heroBackground = $(".hero-background");
    const heroLandscape = $(".hero-landscape");

    const heroTitle = $(".hero-title");
    const heroEyebrow = $(".hero-eyebrow");
    const heroSubtitle = $(".hero-subtitle");
    const heroCTA = $(".hero-cta");

    const header = $(".header");
    const chapter = $(".hero-chapter");
    const coordinates = $(".hero-coordinates");
    const scrollIndicator = $(".scroll-indicator");

    const heroStamp = $(".hero-stamp");
    const territoryStatus = $(".territory-status");

    const menuToggle = $(".menu-toggle");
    const mobileMenu = $(".mobile-menu");
    const mobileMenuLinks = gsap.utils.toArray(".mobile-navigation a");

    const atmosphereVideo = $(".atmosphere video");
    const soundToggle = $(".sound-toggle");
    const soundLabel = $(".sound-label");
    const soundIcon = $(".sound-icon");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    // =====================================
    // INITIAL STATE
    // =====================================

    gsap.set(
        [
            header,
            heroEyebrow,
            heroTitle,
            heroSubtitle,
            heroCTA,
            chapter,
            coordinates,
            scrollIndicator,
            heroStamp,
            territoryStatus,
        ],
        {
            autoAlpha: 0,
        },
    );

    gsap.set(heroContent, {
        y: 35,
    });

    gsap.set(".title-line", {
        yPercent: 110,
    });

    gsap.set(heroLandscape, {
        scale: 1.15,
    });

    gsap.set([heroStamp, territoryStatus], {
        y: 20,
    });

    // =====================================
    // 01. PRELOADER
    // =====================================

    function startPreloader() {
        const loading = {
            value: 0,
        };

        const duration = prefersReducedMotion ? 0.1 : 1.8;

        const loadingTimeline = gsap.timeline({
            onComplete: revealHero,
        });

        loadingTimeline
            .to(
                compassNeedle,
                {
                    rotation: 1080,
                    duration,
                    ease: "power2.inOut",
                },
                0,
            )

            .to(
                loading,
                {
                    value: 100,
                    duration,
                    ease: "power2.inOut",

                    onUpdate: () => {
                        const percentage = Math.round(loading.value);

                        if (counter) {
                            counter.textContent = `${String(percentage).padStart(2, "0")}%`;
                        }

                        if (progressBar) {
                            gsap.set(progressBar, {
                                width: `${percentage}%`,
                            });
                        }
                    },
                },
                0,
            )

            .to(
                ".preloader-label",
                {
                    opacity: 0.35,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                },
                0,
            );
    }

    // =====================================
    // CINEMATIC HERO REVEAL
    // =====================================

    function revealHero() {
        const intro = gsap.timeline({
            defaults: {
                ease: "power3.out",
            },
        });

        intro
            .to(preloader, {
                autoAlpha: 0,
                duration: 0.8,
                ease: "power2.inOut",
            })

            .to(
                heroBackground,
                {
                    autoAlpha: 1,
                    duration: 0.5,
                },
                "-=0.3",
            )

            .to(
                heroLandscape,
                {
                    scale: 1,
                    duration: 2.2,
                    ease: "power2.out",
                },
                "-=0.5",
            )

            .to(
                header,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                },
                "-=1.2",
            )

            .to(
                heroEyebrow,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.8",
            )

            .to(
                heroContent,
                {
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                },
                "-=1.2",
            )

            .to(heroTitle, {
                autoAlpha: 1,
                duration: 0.1,
            })

            .to(
                ".title-line",
                {
                    yPercent: 0,
                    duration: 1.3,
                    stagger: 0.2,
                    ease: "power4.out",
                },
                "-=0.1",
            )

            .to(
                heroSubtitle,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.65",
            )

            .to(
                heroCTA,
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.5",
            )

            .to(
                [chapter, coordinates],
                {
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.15,
                },
                "-=0.4",
            )

            .to(
                [heroStamp, territoryStatus],
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.2,
                    ease: "power3.out",
                },
                "-=0.5",
            )

            .to(
                scrollIndicator,
                {
                    autoAlpha: 1,
                    duration: 0.8,
                },
                "-=0.5",
            );
    }

    gsap.to(".hero-background", {
        scale: 1.015,
        duration: 24,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
    });

    /* =========================================
        JOURNAL NAVIGATION
    ========================================= */

    let menuOpen = false;
    let menuTimeline = null;

    const menuItems = gsap.utils.toArray(".mobile-navigation a");

    function openMenu() {
        if (menuOpen) return;

        menuOpen = true;

        menuToggle.classList.add("is-active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");

        mobileMenu.setAttribute("aria-hidden", "false");

        document.body.classList.add("menu-open");

        if (menuTimeline) {
            menuTimeline.kill();
        }

        gsap.set(mobileMenu, {
            visibility: "visible",
            pointerEvents: "auto",
        });

        gsap.set(menuItems, {
            autoAlpha: 0,
            x: -35,
        });

        menuTimeline = gsap.timeline();

        menuTimeline
            .to(mobileMenu, {
                clipPath: "inset(0% 0% 0% 0%)",
                autoAlpha: 1,
                duration: 0.85,
                ease: "power4.inOut",
            })

            .fromTo(
                ".mobile-menu-top",
                {
                    y: -15,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                },
                "-=0.35",
            )

            .fromTo(
                ".mobile-menu-heading",
                {
                    y: 20,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.6,
                },
                "-=0.25",
            )

            .to(
                menuItems,
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power3.out",
                },
                "-=0.3",
            )

            .fromTo(
                ".mobile-menu-bottom",
                {
                    y: 15,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                },
                "-=0.3",
            );
    }

    function closeMenu() {
        if (!menuOpen) return;

        menuOpen = false;

        menuToggle.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        mobileMenu.setAttribute("aria-hidden", "true");

        if (menuTimeline) {
            menuTimeline.kill();
        }

        menuTimeline = gsap.timeline({
            onComplete: () => {
                gsap.set(mobileMenu, {
                    visibility: "hidden",
                    pointerEvents: "none",
                });

                document.body.classList.remove("menu-open");
            },
        });

        menuTimeline
            .to(menuItems, {
                x: 25,
                autoAlpha: 0,
                duration: 0.25,
                stagger: 0.035,
                ease: "power2.in",
            })

            .to(
                mobileMenu,
                {
                    clipPath: "inset(0% 0% 100% 0%)",
                    autoAlpha: 0,
                    duration: 0.7,
                    ease: "power4.inOut",
                },
                "-=0.05",
            );
    }

    // Toggle menu

    menuToggle?.addEventListener("click", () => {
        menuOpen ? closeMenu() : openMenu();
    });

    menuItems.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuOpen) {
            closeMenu();
        }
    });

    /* =========================================
        SOUND CONTROL
    ========================================= */

    let soundEnabled = false;

    function updateSoundButton() {
        if (!soundToggle) return;

        soundToggle.classList.toggle("is-playing", soundEnabled);

        soundToggle.setAttribute("aria-pressed", String(soundEnabled));

        soundToggle.setAttribute(
            "aria-label",
            soundEnabled ? "Turn sound off" : "Turn sound on",
        );

        if (soundLabel) {
            soundLabel.textContent = soundEnabled ? "SOUND ON" : "SOUND OFF";
        }

        if (soundIcon) {
            soundIcon.textContent = soundEnabled ? "♫" : "♪";
        }
    }

    soundToggle?.addEventListener("click", async () => {
        if (!atmosphereVideo) return;

        soundEnabled = !soundEnabled;

        atmosphereVideo.muted = !soundEnabled;

        updateSoundButton();

        if (soundEnabled) {
            try {
                await atmosphereVideo.play();
            } catch (error) {
                soundEnabled = false;
                atmosphereVideo.muted = true;

                updateSoundButton();

                console.warn("Video playback unavailable:", error);
            }
        }
    });

    // =====================================
    // INITIALIZE
    // =====================================

    updateSoundButton();
    startPreloader();
});
