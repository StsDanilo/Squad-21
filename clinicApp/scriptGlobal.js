document.addEventListener("DOMContentLoaded", function () {
    // Function to load the sidebar
    function loadSidebar() {
        // The path must be absolute from the project root.
        // This works when using a local server.
        fetch("/sidebar.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                // Find the placeholder and inject the sidebar HTML
                const sidebarPlaceholder = document.getElementById("sidebar-placeholder");
                if (sidebarPlaceholder) {
                    sidebarPlaceholder.innerHTML = data;
                }

                // Now that the sidebar is loaded, initialize its functionality
                initializeSidebar();
            })
            .catch(error => {
                console.error("Error loading sidebar:", error);
                const sidebarPlaceholder = document.getElementById("sidebar-placeholder");
                if (sidebarPlaceholder) {
                    sidebarPlaceholder.innerHTML = "<p style='color: red; padding: 1rem;'>Error loading sidebar. Please check if you are running this from a local server.</p>";
                }
            });
    }

    // Function to initialize sidebar elements and event listeners
    function initializeSidebar() {
        const hamburgerBtn = document.getElementById("hamburger-btn");
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("overlay");

        if (!hamburgerBtn || !sidebar || !overlay) {
            console.error("Sidebar components not found after loading.");
            return;
        }

        function toggleMenu() {
            const isActive = sidebar.classList.contains("active");
            isActive ? closeMenu() : openMenu();
        }

        function openMenu() {
            sidebar.classList.add("active");
            hamburgerBtn.classList.add("active");
            overlay.classList.add("active");
            hamburgerBtn.setAttribute("aria-expanded", "true");
            document.body.style.overflow = "hidden";
        }

        function closeMenu() {
            sidebar.classList.remove("active");
            hamburgerBtn.classList.remove("active");
            overlay.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }

        // Event listeners
        hamburgerBtn.addEventListener("click", toggleMenu);
        overlay.addEventListener("click", closeMenu);

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && sidebar.classList.contains("active")) {
                closeMenu();
            }
        });

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

        // Set the active link now that the sidebar is in the DOM
        setActiveLink();
    }

    // Function to set the active link in the sidebar
    function setActiveLink() {
        const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
        const currentPage = window.location.pathname;

        sidebarLinks.forEach(link => {
            // Create a URL object to easily access the pathname
            const linkPath = new URL(link.href, window.location.origin).pathname;

            // Check if the current page's path matches the link's path
            if (currentPage === linkPath) {
                link.parentElement.classList.add("active-link");
            }
        });
    }

    // Start by loading the sidebar
    loadSidebar();
});
