document.addEventListener("DOMContentLoaded", () => {
    // Referências do DOM
    const sidebar = document.getElementById("sidebar");
    const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
    const sidebarArrow = document.getElementById("sidebarArrow");

    const userProfileBtn = document.getElementById("userProfileBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const dropdownIcon = document.querySelector(".dropdown-icon");

    // Toggle da Sidebar com seta dinâmica
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");

            if (sidebar.classList.contains("collapsed")) {
                sidebarArrow.classList.remove("fa-chevron-left");
                sidebarArrow.classList.add("fa-chevron-right");
            } else {
                sidebarArrow.classList.remove("fa-chevron-right");
                sidebarArrow.classList.add("fa-chevron-left");
            }
        });
    }

    // Toggle do Menu de Usuário
    if (userProfileBtn && dropdownMenu) {
        userProfileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle("show");

            if (dropdownIcon) {
                dropdownIcon.style.transform =
                    dropdownMenu.classList.contains("show")
                        ? "rotate(180deg)"
                        : "rotate(0)";
            }
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener("click", (e) => {
            if (
                !userProfileBtn.contains(e.target) &&
                dropdownMenu.classList.contains("show")
            ) {
                dropdownMenu.classList.remove("show");

                if (dropdownIcon) {
                    dropdownIcon.style.transform = "rotate(0)";
                }
            }
        });
    }
});