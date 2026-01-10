; (function ($) {

    $(document).ready(function () {

        //========== SIDEBAR/SEARCH AREA ============= //
        $(".hamburger_menu").on("click", function (e) {
            e.preventDefault();
            $(".slide-bar").toggleClass("show");
            $("body").addClass("on-side");
            $('.body-overlay').addClass('active');
            $(this).addClass('active');
        });
        $(".close-mobile-menu > a").on("click", function (e) {
            e.preventDefault();
            $(".slide-bar").removeClass("show");
            $("body").removeClass("on-side");
            $('.body-overlay').removeClass('active');
            $('.hamburger_menu').removeClass('active');
        });
        //========== SIDEBAR/SEARCH AREA ============= //

        //========== PAGE PROGRESS STARTS ============= // 
        var progressPath = document.querySelector(".progress-wrap path");
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "stroke-dashoffset 10ms linear";
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on("scroll", function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(".progress-wrap").addClass("active-progress");
            } else {
                jQuery(".progress-wrap").removeClass("active-progress");
            }
        });
        jQuery(".progress-wrap").on("click", function (event) {
            event.preventDefault();
            jQuery("html, body").animate({ scrollTop: 0 }, duration);
            return false;
        });
        //========== PAGE PROGRESS STARTS ============= // 

        //========== VIDEO POPUP STARTS ============= //
        if ($(".popup-youtube").length > 0) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
        //========== VIDEO POPUP ENDS ============= //
        AOS.init;
        AOS.init({ disable: 'mobile', once: true });

        //========== NICE SELECT ============= //
        $('select').niceSelect();

    });
    //========== COUNTER UP============= //
    const ucounter = $('.counter');
    if (ucounter.length > 0) {
        ucounter.countUp();
    };

    //========== PRELOADER ============= //
    $(window).on("load", function (event) {
        setTimeout(function () {
            $("#preloader").fadeToggle();
        }, 200);

    });

    //========== POPUP AREA ============= //
    $(".click-here").on('click', function () {
        $(".custom-model-main").addClass('model-open');
    });
    $(".close-btn, .bg-overlay").click(function () {
        $(".custom-model-main").removeClass('model-open');
    });

})(jQuery);

//========== GSAP AREA ============= //
if ($('.reveal').length) { gsap.registerPlugin(ScrollTrigger); let revealContainers = document.querySelectorAll(".reveal"); revealContainers.forEach((container) => { let image = container.querySelector("img"); let tl = gsap.timeline({ scrollTrigger: { trigger: container, toggleActions: "play none none none" } }); tl.set(container, { autoAlpha: 1 }); tl.from(container, 1.5, { xPercent: -100, ease: Power2.out }); tl.from(image, 1.5, { xPercent: 100, scale: 1.3, delay: -1.5, ease: Power2.out }); }); }

// Theme toggle functionality
const toggleButton = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('light-mode');
    toggleButton.checked = true;
}
toggleButton.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark-mode');
    }
});

// UPDATE: I was able to get this working again... Enjoy!
var cursor = document.querySelector('.procus-cursor');
var cursorinner = document.querySelector('.procus-cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function () {
    cursor.classList.add('click');
    cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function () {
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
})

// Role rotator in About section
document.addEventListener('DOMContentLoaded', function () {
    var roleTarget = document.getElementById('role-rotator');
    if (!roleTarget) return;
    var roles = [
        { primary: 'Solutions', accent: 'Architect' },
        { primary: 'Software', accent: 'Engineer' },
        { primary: 'Cloud', accent: 'Engineer' },
        { primary: 'AI', accent: 'Engineer' },
        { primary: 'Data', accent: 'Engineer' },
        { primary: 'Data', accent: 'Analyst' },
        { primary: 'Data', accent: 'Scientist' }
    ];
    var idx = 0;
    var typeSpeed = 180;
    var eraseSpeed = 120;
    var holdDuration = 5000;
    var primarySpan, accentSpan, cursorSpan;
    var prefixEl = roleTarget.closest('.heading1') ? roleTarget.closest('.heading1').querySelector('h1') : null;

    var setupSpans = function () {
        roleTarget.innerHTML = '<span class="role-primary"></span> <span class="role-accent"></span><span class="role-cursor"></span>';
        primarySpan = roleTarget.querySelector('.role-primary');
        accentSpan = roleTarget.querySelector('.role-accent');
        cursorSpan = roleTarget.querySelector('.role-cursor');
    };

    var updatePrefix = function (role) {
        if (!prefixEl) return;
        var first = (role.primary || '').trim().charAt(0).toLowerCase();
        var useAn = ['a', 'e', 'i', 'o', 'u'].indexOf(first) !== -1;
        prefixEl.textContent = useAn ? "I'm an" : "I'm a";
    };

    var typeRole = function (role, done) {
        primarySpan.textContent = '';
        accentSpan.textContent = '';
        var pIdx = 0;
        var aIdx = 0;
        var typePrimary = function () {
            if (pIdx < role.primary.length) {
                primarySpan.textContent += role.primary.charAt(pIdx++);
                setTimeout(typePrimary, typeSpeed);
            } else {
                setTimeout(typeAccent, typeSpeed);
            }
        };
        var typeAccent = function () {
            if (aIdx < role.accent.length) {
                accentSpan.textContent += role.accent.charAt(aIdx++);
                setTimeout(typeAccent, typeSpeed);
            } else {
                setTimeout(done, holdDuration);
            }
        };
        typePrimary();
    };

    var eraseRole = function (done) {
        var eraseAccent = function () {
            if (accentSpan.textContent.length > 0) {
                accentSpan.textContent = accentSpan.textContent.slice(0, -1);
                setTimeout(eraseAccent, eraseSpeed);
            } else {
                erasePrimary();
            }
        };
        var erasePrimary = function () {
            if (primarySpan.textContent.length > 0) {
                primarySpan.textContent = primarySpan.textContent.slice(0, -1);
                setTimeout(erasePrimary, eraseSpeed);
            } else {
                done();
            }
        };
        eraseAccent();
    };

    var cycle = function () {
        var role = roles[idx];
        updatePrefix(role);
        typeRole(role, function () {
            eraseRole(function () {
                idx = (idx + 1) % roles.length;
                cycle();
            });
        });
    };

    setupSpans();
    cycle();
});

// Project carousels with autoplay + swipe
document.addEventListener('DOMContentLoaded', function () {
    var carousels = document.querySelectorAll('.project-carousel');
    carousels.forEach(function (carousel) {
        var track = carousel.querySelector('.carousel-track');
        var slides = Array.prototype.slice.call(track ? track.children : []);
        if (!track || slides.length === 0) return;

        var dotsContainer = carousel.querySelector('.carousel-dots');
        var dots = [];
        var index = 0;
        var autoTimer = null;
        var autoDelay = 4000;

        slides.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.type = 'button';
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', function () {
                goTo(i);
                restartAuto();
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });

        var update = function () {
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            dots.forEach(function (dot, i) { dot.classList.toggle('active', i === index); });
        };

        var goTo = function (i) {
            index = (i + slides.length) % slides.length;
            update();
        };

        var next = function () { goTo(index + 1); };
        var restartAuto = function () {
            if (autoTimer) clearInterval(autoTimer);
            autoTimer = setInterval(next, autoDelay);
        };

        // Swipe support
        var startX = 0;
        var dragging = false;
        carousel.addEventListener('pointerdown', function (e) {
            dragging = true;
            startX = e.clientX;
            if (autoTimer) clearInterval(autoTimer);
        });
        var endDrag = function (e) {
            if (!dragging) return;
            var dx = e.clientX - startX;
            if (Math.abs(dx) > 40) {
                if (dx < 0) { next(); } else { goTo(index - 1); }
            }
            dragging = false;
            restartAuto();
        };
        carousel.addEventListener('pointerup', endDrag);
        carousel.addEventListener('pointercancel', endDrag);

        // Pause on hover (desktop)
        carousel.addEventListener('pointerenter', function () { if (autoTimer) clearInterval(autoTimer); });
        carousel.addEventListener('pointerleave', function () { restartAuto(); });

        update();
        // Autoplay only when explicitly enabled to avoid constant repaint/flicker on sections
        var shouldAuto = carousel.getAttribute('data-autoplay') === 'true';
        if (shouldAuto) {
            restartAuto();
        }
    });
});

// Project accordions: ensure only one open per stack and keep one expanded
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.project-stack').forEach(function (stack) {
        var items = Array.prototype.slice.call(stack.querySelectorAll('.project-accordion'));
        if (!items.length) return;

        var ensureOneOpen = function () {
            var openItems = items.filter(function (el) { return el.hasAttribute('open'); });
            if (!openItems.length && items[0]) {
                items[0].setAttribute('open', '');
                openItems = [items[0]];
            }
            if (openItems.length > 1) {
                openItems.slice(1).forEach(function (el) { el.removeAttribute('open'); });
            }
        };

        ensureOneOpen();

        items.forEach(function (item) {
            item.addEventListener('toggle', function () {
                if (item.hasAttribute('open')) {
                    items.forEach(function (other) {
                        if (other !== item) { other.removeAttribute('open'); }
                    });
                } else {
                    ensureOneOpen();
                }
            });

            var summary = item.querySelector('summary');
            if (summary) {
                summary.addEventListener('click', function (e) {
                    if (item.hasAttribute('open')) {
                        e.preventDefault();
                        item.setAttribute('open', '');
                        items.forEach(function (other) {
                            if (other !== item) { other.removeAttribute('open'); }
                        });
                    }
                });
            }
        });
    });
});
