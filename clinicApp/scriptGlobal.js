const hamburgerBtn = document.getElementById("hamburger-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function toggleMenu() {
    const isActive = sidebar.classList.contains("active");

    if (isActive) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    sidebar.classList.add("active");
    hamburgerBtn.classList.add("active");
    overlay.classList.add("active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute("aria-label", "Fechar menu de navegação");

    // Previne scroll do body quando menu está aberto
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    sidebar.classList.remove("active");
    hamburgerBtn.classList.remove("active");
    overlay.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Abrir menu de navegação");

    // Restaura scroll do body
    document.body.style.overflow = "";
}

// Event listeners para o menu hambúrguer
hamburgerBtn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
        closeMenu();
    }
});

// Function to set the active link in the sidebar
function setActiveLink() {
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    const currentPage = window.location.pathname;

    sidebarLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        // Check if the link's path is a substring of the current page's path
        if (currentPage.includes(linkPath)) {
            link.parentElement.classList.add("active-link");
        }
    });
}

// Set the active link when the page loads
document.addEventListener("DOMContentLoaded", setActiveLink);

sidebar.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && window.innerWidth <= 768) {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && sidebar.classList.contains("active")) {
        closeMenu();
    }
});

