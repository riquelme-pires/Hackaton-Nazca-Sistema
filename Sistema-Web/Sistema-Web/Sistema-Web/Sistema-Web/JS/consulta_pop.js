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

    // =============================================
    // VALIDAÇÃO DO CAMPO FILTRO CÓDIGO DO POP
    // Formato aceito: 2 letras + espaço opcional + 3 números
    // Exemplo: AL001 ou AL 001
    // =============================================

    const campoFiltroCodigo = document.getElementById("filtroCodigo");
    const feedbackFiltroCodigo = document.createElement("span");
    feedbackFiltroCodigo.classList.add("codigo-feedback");
    feedbackFiltroCodigo.style.cssText = `
        display: block;
        font-size: 0.78rem;
        margin-top: 4px;
        min-height: 18px;
        font-weight: 500;
    `;

    if (campoFiltroCodigo) {
        campoFiltroCodigo.parentNode.appendChild(feedbackFiltroCodigo);

        // Auto-maiúsculo: converte para maiúsculo enquanto digita
        campoFiltroCodigo.addEventListener("input", () => {
            const pos = campoFiltroCodigo.selectionStart;
            campoFiltroCodigo.value = campoFiltroCodigo.value.toUpperCase();
            campoFiltroCodigo.setSelectionRange(pos, pos);
            validarFiltroCodigoPOP();
        });

        // Também aplica ao focar
        campoFiltroCodigo.addEventListener("focus", () => {
            campoFiltroCodigo.value = campoFiltroCodigo.value.toUpperCase();
        });

        // Valida ao sair do campo
        campoFiltroCodigo.addEventListener("blur", () => {
            validarFiltroCodigoPOP(true);
        });
    }

    /**
     * Valida o formato do código de filtro: 2 letras + espaço opcional + 3 números
     * @param {boolean} mostrarErro - exibe mensagem de erro se true
     * @returns {boolean} - true se válido ou vazio (filtro é opcional)
     */
    function validarFiltroCodigoPOP(mostrarErro = false) {
        if (!campoFiltroCodigo) return true;

        const valor = campoFiltroCodigo.value.trim();
        const regex = /^[A-Z]{2}\s?\d{3}$/;

        // Campo vazio é permitido na consulta (filtro opcional)
        if (valor === "") {
            campoFiltroCodigo.style.borderColor = "";
            feedbackFiltroCodigo.textContent = "";
            return true;
        }

        const valido = regex.test(valor);

        if (valido) {
            campoFiltroCodigo.style.borderColor = "#22c55e";
            feedbackFiltroCodigo.style.color = "#22c55e";
            feedbackFiltroCodigo.textContent = "✔ Código válido";
        } else if (mostrarErro || valor.length >= 5) {
            campoFiltroCodigo.style.borderColor = "#ef4444";
            feedbackFiltroCodigo.style.color = "#ef4444";
            feedbackFiltroCodigo.textContent = "✖ Use 2 letras e 3 números. Ex: AL001 ou AL 001";
        }

        return valido;
    }

    /**
     * Expõe função de validação globalmente para uso no botão de busca
     * Se o campo código estiver preenchido, ele deve estar no formato correto
     */
    window.validarCodigoConsulta = function () {
        return validarFiltroCodigoPOP(true);
    };
});