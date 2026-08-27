/* ==========================================================================
   DigitalSphere - Digital Marketing Learning Hub
   Interactive JavaScript Functionality (Refined SaaS Color Palette)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Dark / Light Mode Theme Toggle with localStorage Persistence
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('digitalsphere_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('digitalsphere_theme', newTheme);
        updateThemeIcon(newTheme);

        // Re-render charts with updated theme colors
        updateChartTheme();
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
            themeToggleBtn.setAttribute('title', 'Switch to Light Theme');
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
        }
    }

    // ----------------------------------------------------------------------
    // 2. Sticky Navbar & Mobile Hamburger Menu
    // ----------------------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 3. Scroll Reading Progress Bar & Active Link ScrollSpy
    // ----------------------------------------------------------------------
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Progress bar calculation
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        // Back to Top button visibility
        if (winScroll > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // ScrollSpy active link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to top scroll click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ----------------------------------------------------------------------
    // 4. Animated Number Counters (Stats Bar)
    // ----------------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedStats) {
                animatedStats = true;
                statNumbers.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1800; // ms
                    const step = Math.ceil(target / (duration / 20));
                    let current = 0;

                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.innerText = target;
                            clearInterval(timer);
                        } else {
                            counter.innerText = current;
                        }
                    }, 20);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        statsObserver.observe(statsBar);
    }

    // ----------------------------------------------------------------------
    // 5. Chart.js Professional Marketing Analytics Integration
    // ----------------------------------------------------------------------
    let visitorsChartInstance = null;
    let engagementChartInstance = null;
    let channelsChartInstance = null;
    let chartsInitialized = false;

    function getChartThemeColors() {
        const isDark = htmlElement.getAttribute('data-theme') === 'dark';
        return {
            textColor: isDark ? '#cbd5e1' : '#475569',
            gridColor: isDark ? '#1e293b' : '#e2e8f0',
            bgCard: isDark ? '#111827' : '#ffffff'
        };
    }

    function initMarketingCharts() {
        if (chartsInitialized) return;
        chartsInitialized = true;

        const colors = getChartThemeColors();

        // 1. Visitors Line Chart (Clean Blue Line)
        const ctx1 = document.getElementById('visitorsChart').getContext('2d');
        const gradient1 = ctx1.createLinearGradient(0, 0, 0, 250);
        gradient1.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
        gradient1.addColorStop(1, 'rgba(37, 99, 235, 0.0)');

        visitorsChartInstance = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Visitors',
                    data: [850, 980, 1120, 1250, 1380, 1450],
                    borderColor: '#2563eb',
                    borderWidth: 2.5,
                    backgroundColor: gradient1,
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#2563eb',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: { color: colors.textColor },
                        grid: { color: colors.gridColor }
                    },
                    y: {
                        ticks: { color: colors.textColor },
                        grid: { color: colors.gridColor }
                    }
                }
            }
        });

        // 2. Social Media Engagement Bar Chart (Corporate Navy/Blue Palette)
        const ctx2 = document.getElementById('engagementChart').getContext('2d');
        engagementChartInstance = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'X'],
                datasets: [{
                    label: 'Engagement Score',
                    data: [88, 72, 94, 65, 58],
                    backgroundColor: [
                        '#2563eb',
                        '#172554',
                        '#4338ca',
                        '#3b82f6',
                        '#1d4ed8'
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: { color: colors.textColor },
                        grid: { display: false }
                    },
                    y: {
                        ticks: { color: colors.textColor },
                        grid: { color: colors.gridColor }
                    }
                }
            }
        });

        // 3. Marketing Channel Doughnut Chart (Professional 4-Tone Palette)
        const ctx3 = document.getElementById('channelsChart').getContext('2d');
        channelsChartInstance = new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ['SEO (Organic)', 'Social Media', 'Email Campaigns', 'Paid PPC Ads'],
                datasets: [{
                    data: [35, 30, 20, 15],
                    backgroundColor: ['#172554', '#2563eb', '#4338ca', '#64748b'],
                    borderWidth: 2,
                    borderColor: colors.bgCard
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: colors.textColor, padding: 16 }
                    }
                }
            }
        });
    }

    function updateChartTheme() {
        if (!chartsInitialized) return;
        const colors = getChartThemeColors();

        [visitorsChartInstance, engagementChartInstance].forEach(chart => {
            if (chart) {
                chart.options.scales.x.ticks.color = colors.textColor;
                chart.options.scales.x.grid.color = colors.gridColor;
                chart.options.scales.y.ticks.color = colors.textColor;
                chart.options.scales.y.grid.color = colors.gridColor;
                chart.update();
            }
        });

        if (channelsChartInstance) {
            channelsChartInstance.options.plugins.legend.labels.color = colors.textColor;
            channelsChartInstance.data.datasets[0].borderColor = colors.bgCard;
            channelsChartInstance.update();
        }
    }

    // Lazy load charts when Analytics section is reached
    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection) {
        const analyticsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initMarketingCharts();
                }
            });
        }, { threshold: 0.2 });
        analyticsObserver.observe(analyticsSection);
    }

    // ----------------------------------------------------------------------
    // 6. Digital Marketing Health Check Calculator
    // ----------------------------------------------------------------------
    const questionBoxes = document.querySelectorAll('.question-box');
    const calcBtn = document.getElementById('calc-btn');
    const calcHint = document.getElementById('calc-hint');
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');
    const resetBtn = document.getElementById('reset-btn');

    const scoreDisplay = document.getElementById('score-display');
    const ringProgress = document.getElementById('ring-progress');
    const resultRating = document.getElementById('result-rating');
    const resultSummary = document.getElementById('result-summary');
    const recommendationsList = document.getElementById('recommendations-list');

    let userAnswers = {};

    questionBoxes.forEach(box => {
        const qNum = box.getAttribute('data-q');
        const buttons = box.querySelectorAll('.btn-option');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                userAnswers[qNum] = btn.getAttribute('data-value');

                checkQuizCompletion();
            });
        });
    });

    function checkQuizCompletion() {
        if (Object.keys(userAnswers).length === 5) {
            calcBtn.removeAttribute('disabled');
            calcHint.innerText = "All questions answered! Click to view your score.";
            calcHint.style.color = "var(--color-success)";
        }
    }

    calcBtn.addEventListener('click', () => {
        let yesCount = 0;
        Object.values(userAnswers).forEach(ans => {
            if (ans === 'yes') yesCount++;
        });

        const scorePercent = (yesCount / 5) * 100;
        displayQuizResults(scorePercent, yesCount);
    });

    function displayQuizResults(score, yesCount) {
        quizForm.classList.add('hidden');
        quizResult.classList.remove('hidden');

        // Circular ring progress (dasharray total = 471)
        const circumference = 471;
        const offset = circumference - (score / 100) * circumference;
        ringProgress.style.strokeDashoffset = offset;

        // Counter animation for score %
        let currentVal = 0;
        const timer = setInterval(() => {
            currentVal += 2;
            if (currentVal >= score) {
                scoreDisplay.innerText = `${score}%`;
                clearInterval(timer);
            } else {
                scoreDisplay.innerText = `${currentVal}%`;
            }
        }, 20);

        // Customize rating color & recommendations
        recommendationsList.innerHTML = '';

        if (score === 100) {
            resultRating.innerText = "Excellent Digital Presence! 🚀";
            resultRating.style.color = "var(--color-success)";
            ringProgress.style.stroke = "var(--color-success)";
            resultSummary.innerText = "Your business is executing all 5 key pillars of digital marketing effectively!";
            
            recommendationsList.innerHTML += `
                <li>Keep experimenting with short-form video content and marketing automation.</li>
                <li>Optimize conversion rate funnels with A/B testing on landing pages.</li>
                <li>Scale your email sequences into segment-based automated journeys.</li>
            `;
        } else if (score >= 60) {
            resultRating.innerText = "Good Start! 👍";
            resultRating.style.color = "var(--accent-blue)";
            ringProgress.style.stroke = "var(--accent-blue)";
            resultSummary.innerText = `Your business scored ${score}/100. You have a solid foundation, but key areas need optimization.`;

            if (userAnswers['3'] === 'no') {
                recommendationsList.innerHTML += `<li><strong>Focus on SEO:</strong> Implement keyword research and meta tags to gain organic traffic.</li>`;
            }
            if (userAnswers['4'] === 'no') {
                recommendationsList.innerHTML += `<li><strong>Launch Email Campaigns:</strong> Collect subscriber emails to build direct relationships.</li>`;
            }
            if (userAnswers['5'] === 'no') {
                recommendationsList.innerHTML += `<li><strong>Track Analytics:</strong> Set up analytics tools to measure traffic sources and sales conversions.</li>`;
            }
        } else {
            resultRating.innerText = "Needs Improvement 💡";
            resultRating.style.color = "var(--color-warning)";
            ringProgress.style.stroke = "var(--color-warning)";
            resultSummary.innerText = `Your business scored ${score}/100. Expanding your digital footprint will unlock significant growth.`;

            if (userAnswers['1'] === 'no') {
                recommendationsList.innerHTML += `<li><strong>Create a Website:</strong> Build a responsive, fast website to serve as your digital hub.</li>`;
            }
            if (userAnswers['2'] === 'no') {
                recommendationsList.innerHTML += `<li><strong>Be Active on Social Media:</strong> Pick 2 main platforms (e.g. Instagram & LinkedIn) and post consistently.</li>`;
            }
            recommendationsList.innerHTML += `<li><strong>Explore Learning Modules:</strong> Review the SEO, Social, and Email sections above on DigitalSphere!</li>`;
        }
    }

    resetBtn.addEventListener('click', () => {
        userAnswers = {};
        questionBoxes.forEach(box => {
            box.querySelectorAll('.btn-option').forEach(b => b.classList.remove('selected'));
        });
        calcBtn.setAttribute('disabled', 'true');
        calcHint.innerText = "Please answer all 5 questions above to calculate your score.";
        calcHint.style.color = "var(--text-muted)";

        quizResult.classList.add('hidden');
        quizForm.classList.remove('hidden');

        document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
    });

    // ----------------------------------------------------------------------
    // 7. Contact Form Client-Side Validation
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email-input');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let isValid = true;

            // Name validation
            if (!nameInput.value.trim()) {
                nameInput.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('invalid');
            }

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('invalid');
            }

            // Subject validation
            if (!subjectInput.value.trim()) {
                subjectInput.classList.add('invalid');
                isValid = false;
            } else {
                subjectInput.classList.remove('invalid');
            }

            // Message validation
            if (!messageInput.value.trim()) {
                messageInput.classList.add('invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('invalid');
            }

            if (isValid) {
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                contactForm.reset();
            }
        });
    }
});
