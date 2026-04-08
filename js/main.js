const isAr = document.documentElement.lang === 'ar';

jQuery(document).ready(function () {













    /*Faq Accordion*/

    $(".faq-title").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const $this = $(this);
        const $content = $this.next('.faq-content');
        const isCurrentlyActive = $this.hasClass("active");

        // Close all other FAQ items first
        $(".faq-title").not($this).removeClass("active");
        $(".faq-content").not($content).slideUp(300);

        // Toggle current item
        if (!isCurrentlyActive) {
            $this.addClass("active");
            $content.slideDown(300);
        } else {
            $this.removeClass("active");
            $content.slideUp(300);
        }

        return false;
    });


    // Scheduling Calendar Logic
    const timeSlots = document.querySelectorAll('.time-slot');
    if (timeSlots.length > 0) {
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function () {
                if (!this.disabled) {
                    // Remove selected class from all
                    timeSlots.forEach(s => s.classList.remove('selected'));
                    // Add to clicked
                    this.classList.add('selected');
                }
            });
        });
    }
    // =========================================================================
    // ⚠️ BACKEND TEAM DEMO CODE - APPOINTMENTS ⚠️
    // =========================================================================
    const calendarPrev = document.querySelector('.calendar-prev');
    const calendarNext = document.querySelector('.calendar-next');
    const calendarTitle = document.querySelector('.calendar-title');
    const dayCards = document.querySelectorAll('.day-card'); // The 7 grid items

    let currentStartDate = new Date('2026-03-09');

    function updateCalendarDemo(baseDate) {
        const monthName = new Intl.DateTimeFormat(isAr ? 'ar-EG' : 'en-US', { month: 'long' }).format(baseDate);
        const year = baseDate.getFullYear();
        const endDate = new Date(baseDate);
        endDate.setDate(baseDate.getDate() + 6);

        if (calendarTitle) {
            calendarTitle.textContent = isAr
                ? `${baseDate.getDate()} - ${endDate.getDate()} ${monthName} _ ${year}`
                : `${monthName} ${baseDate.getDate()} - ${endDate.getDate()}, ${year}`;
        }

        // In a real app, this will fetch the 7 days from API and update the DOM.
        // For UI demo, we just update the data-date attributes.
        dayCards.forEach((card, index) => {
            const dayDate = new Date(baseDate);
            dayDate.setDate(baseDate.getDate() + index);
            const formattedDate = dayDate.toISOString().split('T')[0];
            card.setAttribute('data-date', formattedDate);
        });
    }

    if (calendarPrev) {
        calendarPrev.addEventListener('click', () => {
            currentStartDate.setDate(currentStartDate.getDate() - 7);
            updateCalendarDemo(currentStartDate);
        });
    }
    if (calendarNext) {
        calendarNext.addEventListener('click', () => {
            currentStartDate.setDate(currentStartDate.getDate() + 7);
            updateCalendarDemo(currentStartDate);
        });
    }

    // Initial setup
    if (calendarTitle) updateCalendarDemo(currentStartDate);

    // Weekly/Monthly Toggle logic stub
    const viewToggles = document.querySelectorAll('.view-toggle-btn');
    viewToggles.forEach(btn => {
        btn.addEventListener('click', function () {
            viewToggles.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Future logic: Switch grid from 7 cols to full month grid
        });
    });






    // Reusable link-copy button logic
    const copyLinkBtns = document.querySelectorAll('.copy-link-btn');
    if (copyLinkBtns.length > 0) {
        copyLinkBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                // Try to get text from data-link attribute
                const link = this.getAttribute('data-link');
                if (link) {
                    navigator.clipboard.writeText(link).then(() => {
                        const icon = this.querySelector('i');
                        const originalClass = icon.classList.contains('fa-copy') ? 'fa-copy' :
                            icon.classList.contains('fa-clone') ? 'fa-clone' :
                                'fa-link';

                        icon.classList.remove(originalClass);
                        icon.classList.add('fa-check');
                        setTimeout(() => {
                            icon.classList.remove('fa-check');
                            icon.classList.add(originalClass);
                        }, 2000);
                    });
                }
            });
        });
    }






    // Toggle password visibility
    (function () {
        const passwordToggles = document.querySelectorAll('.login-toggle-password');
        passwordToggles.forEach(button => {
            button.addEventListener('click', function () {
                const input = this.parentElement.querySelector('input');
                const icon = this.querySelector('i');

                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });
        });
    })();

    // Mobile Sidebar Toggle (Vanilla JS)
    const sidebar = document.getElementById('dashboardSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            sidebar.classList.toggle('show');
        });

        if (sidebarClose) {
            sidebarClose.addEventListener('click', function () {
                sidebar.classList.remove('show');
            });
        }

        // Close sidebar when clicking anywhere else
        document.addEventListener('click', function (e) {
            if (sidebar.classList && sidebar.classList.contains('show') && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        });
    }

});