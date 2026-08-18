// ============================================
// github.js  - Dynamic Projects + Counters (FIXED)
// ============================================

const username = "Naseeha-Zeenath";

// Custom data for each project (keeps your icons + style)
const projectsMap = {
    "weatherAPI": {
        title: "Weather App",
        description: "Live weather using API",
        icon: "🌤️",
        gradient: "from-sky-500/30 to-blue-600/10",
        liveDemo: null
    },
    "PRF-SalarySystem": {
        title: "Salary System",
        description: "Employee salary calculator",
        icon: "💰",
        gradient: "from-emerald-500/30 to-green-600/10",
        liveDemo: null
    },
    "PRF_BurgerShop": {
        title: "Burger Shop",
        description: "Java + OOP restaurant system",
        icon: "🍔",
        gradient: "from-orange-500/30 to-amber-600/10",
        liveDemo: null
    },
    "iFrendContact": {
        title: "Contact Manager",
        description: "Java + OOP contacts",
        icon: "📇",
        gradient: "from-blue-500/30 to-indigo-600/10",
        liveDemo: null
    },
    "PRF-BillPrint": {
        title: "Bill Print",
        description: "Java bill generator",
        icon: "🧾",
        gradient: "from-green-500/30 to-teal-600/10",
        liveDemo: null
    },
    "Number_gessing_game": {
        title: "Number Guessing",
        description: "Interactive JS game",
        icon: "🎯",
        gradient: "from-cyan-500/25 to-blue-600/15",
        liveDemo: "https://naseeha-zeenath.github.io/Number_gessing_game/"
    },
    "Chat_Bot": {
        title: "Chat Bot",
        description: "Simple chatbot interface",
        icon: "🤖",
        gradient: "from-purple-500/30 to-violet-600/10",
        liveDemo: "https://naseeha-zeenath.github.io/Chat_Bot/"
    }
};

const projectOrder = [
    "weatherAPI",
    "PRF-SalarySystem",
    "PRF_BurgerShop",
    "iFrendContact",
    "PRF-BillPrint",
    "Number_gessing_game",
    "Chat_Bot"
];

const desktopPositions = [
    { z: 10,  x: "-400px" },
    { z: 20,  x: "-250px" },
    { z: 30,  x: "-100px" },
    { z: 40,  x: "50px" },
    { z: 50,  x: "200px" },
    { z: 60,  x: "350px" },
    { z: 70,  x: "500px" }
];

// ========== 1. Update Counters ==========
function updateCounters() {
    fetch("https://api.github.com/users/" + username)
        .then(res => res.json())
        .then(user => {
            if (user.message) return; // rate limit protection

            const repoCounter = document.querySelector('.counter[data-target="24"]');
            const followerCounter = document.querySelector('.counter[data-target="14"]');

            if (repoCounter) repoCounter.setAttribute("data-target", user.public_repos);
            if (followerCounter) followerCounter.setAttribute("data-target", user.followers);
        })
        .catch(err => console.log("Could not update counters", err));
}

// ========== 2. Modal functions ==========
function openModal(title, description, link) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalLink").href = link;

    const modal = document.getElementById("projectModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeModal() {
    const modal = document.getElementById("projectModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

document.getElementById("projectModal").onclick = function (event) {
    if (event.target.id === "projectModal") closeModal();
};

// ========== 3. Create Mobile Card ==========
function createMobileCard(data, htmlUrl) {
const liveDemoHtml = data.liveDemo
    ? `<a href="${data.liveDemo}" target="_blank" rel="noopener"
           class="text-sm text-emerald-400 hover:underline"
           onclick="event.stopPropagation()">Live Demo</a>`
    : `<span class="text-sm invisible">Live Demo</span>`;

    return `
    <article class="project-card overflow-hidden rounded-2xl border-2 border-white/20 bg-slate-900 shadow-xl transition-all duration-300 hover:border-cyan-400/80 cursor-pointer"
             onclick="openModal('${data.title}', '${data.description}', '${htmlUrl}')">
        <div class="flex h-36 items-center justify-center bg-gradient-to-br ${data.gradient}">
            <span class="text-4xl">${data.icon}</span>
        </div>
        <div class="p-4">
            <h3 class="text-base font-semibold text-white">${data.title}</h3>
            <p class="mt-1 text-xs text-slate-400">${data.description}</p>
            <div class="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                <a href="${htmlUrl}" target="_blank" rel="noopener"
                   class="text-sm text-cyan-300 hover:underline"
                   onclick="event.stopPropagation()">View Code →</a>
                ${liveDemoHtml}
            </div>
        </div>
    </article>`;
}

// ========== 4. Create Desktop Card ==========
function createDesktopCard(data, htmlUrl, pos) {
   const liveDemoHtml = data.liveDemo
    ? `<a href="${data.liveDemo}" target="_blank" rel="noopener"
           class="rounded-3xl p-2 text-sm font-medium text-emerald-400 hover:border-t hover:border-b hover:text-emerald-300"
           onclick="event.stopPropagation()">Live Demo</a>`
    : `<span class="rounded-3xl p-2 text-sm invisible">Live Demo</span>`;
    return `
    <div class="project-card absolute z-[${pos.z}] translate-x-[${pos.x}] transition-all duration-300 ease-out
                hover:z-[100] hover:-translate-y-8 hover:scale-125 cursor-pointer"
         onclick="openModal('${data.title}', '${data.description}', '${htmlUrl}')">
        <div class="w-60 overflow-hidden rounded-2xl border-2 border-white/20 bg-slate-900 shadow-xl
                    transition-all duration-300 hover:border-cyan-400/80
                    hover:shadow-[0_0_35px_8px_rgba(34,211,238,0.55)]">
            <div class="flex h-52 items-center justify-center bg-gradient-to-br ${data.gradient}">
                <span class="text-5xl">${data.icon}</span>
            </div>
            <div class="bg-slate-900 p-4">
                <h3 class="text-base font-semibold text-white">${data.title}</h3>
                <p class="mt-1 text-xs text-slate-400">${data.description}</p>
                <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    <a href="${htmlUrl}" target="_blank" rel="noopener"
                       class="relative px-1 py-1 text-cyan-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
                       onclick="event.stopPropagation()">View Code →</a>
                    ${liveDemoHtml}
                </div>
            </div>
        </div>
    </div>`;
}

// ========== 5. Render Cards (works even if API fails) ==========
function renderProjects(repoLookup = {}) {
    // Better & safer selectors
    const mobileContainer = document.querySelector("#projects .grid");
    const desktopContainer = document.querySelector("#projects .relative.mt-12");

    if (!mobileContainer || !desktopContainer) {
        console.error("Project containers not found!");
        return;
    }

    // Clear old content
    mobileContainer.innerHTML = "";
    desktopContainer.innerHTML = "";

    let desktopIndex = 0;

    projectOrder.forEach((repoName) => {
        const data = projectsMap[repoName];
        if (!data) return;

        const repo = repoLookup[repoName];
        const htmlUrl = repo ? repo.html_url : `https://github.com/${username}/${repoName}`;

        // Mobile
        mobileContainer.innerHTML += createMobileCard(data, htmlUrl);

        // Desktop
        if (desktopIndex < desktopPositions.length) {
            desktopContainer.innerHTML += createDesktopCard(data, htmlUrl, desktopPositions[desktopIndex]);
            desktopIndex++;
        }
    });

    // Start animation
    reinitProjectObserver();
}

// ========== 6. Load from GitHub API ==========
function loadProjects() {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        .then(res => res.json())
        .then(repos => {
            if (!Array.isArray(repos)) {
                // API failed (rate limit etc.) → still show cards with fallback links
                console.warn("GitHub API failed, using fallback links");
                renderProjects({});
                return;
            }

            const repoLookup = {};
            repos.forEach(r => repoLookup[r.name] = r);

            renderProjects(repoLookup);
        })
        .catch(err => {
            console.log("Could not load projects from API", err);
            // Fallback – cards will still appear
            renderProjects({});
        });
}

// ========== 7. Animation Observer ==========
function reinitProjectObserver() {
    const projectCards = document.querySelectorAll(".project-card");
    const projectsSection = document.querySelector("#projects");

    if (!projectsSection || projectCards.length === 0) return;

    const projectObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add("show");
                        }, index * 100);
                    });
                } else {
                    projectCards.forEach((card) => {
                        card.classList.remove("show");
                    });
                }
            });
        },
        {
            threshold: 0.30,
            rootMargin: "0px 0px -80px 0px"
        }
    );

    projectObserver.observe(projectsSection);
}

// ========== Start ==========
updateCounters();
loadProjects();