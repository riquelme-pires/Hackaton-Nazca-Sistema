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
    // VALIDAÇÃO DO CAMPO CÓDIGO DO POP
    // Formato aceito: 2 letras + espaço opcional + 3 números
    // Exemplo: AL001 ou AL 001
    // =============================================

    const campoCodigo = document.getElementById("codigo");
    const feedbackCodigo = document.createElement("span");
    feedbackCodigo.classList.add("codigo-feedback");
    feedbackCodigo.style.cssText = `
        display: block;
        font-size: 0.78rem;
        margin-top: 4px;
        min-height: 18px;
        font-weight: 500;
    `;

    if (campoCodigo) {
        campoCodigo.parentNode.appendChild(feedbackCodigo);

        // Auto-maiúsculo: converte para maiúsculo enquanto digita
        campoCodigo.addEventListener("input", () => {
            const pos = campoCodigo.selectionStart;
            campoCodigo.value = campoCodigo.value.toUpperCase();
            campoCodigo.setSelectionRange(pos, pos);
            validarCampoCodigo();
        });

        // Também aplica ao focar (caso já tenha algo digitado)
        campoCodigo.addEventListener("focus", () => {
            campoCodigo.value = campoCodigo.value.toUpperCase();
        });

        // Valida ao sair do campo
        campoCodigo.addEventListener("blur", () => {
            validarCampoCodigo(true);
        });
    }

    /**
     * Valida o formato do código: 2 letras + espaço opcional + 3 números
     * @param {boolean} mostrarErro - exibe mensagem de erro se true
     * @returns {boolean} - true se válido
     */
    function validarCampoCodigo(mostrarErro = false) {
        if (!campoCodigo) return true;

        const valor = campoCodigo.value.trim();
        const regex = /^[A-Z]{2}\s?\d{3}$/;
        const valido = regex.test(valor);

        if (valor === "") {
            // Campo vazio: sem feedback (será validado no submit)
            campoCodigo.style.borderColor = "";
            feedbackCodigo.textContent = "";
        } else if (valido) {
            campoCodigo.style.borderColor = "#22c55e";
            feedbackCodigo.style.color = "#22c55e";
            feedbackCodigo.textContent = "✔ Código válido";
        } else if (mostrarErro || valor.length >= 5) {
            campoCodigo.style.borderColor = "#ef4444";
            feedbackCodigo.style.color = "#ef4444";
            feedbackCodigo.textContent = "✖ Use 2 letras e 3 números. Ex: AL001 ou AL 001";
        }

        return valido;
    }

    /**
     * Valida o código antes de salvar o POP
     * Chamada pelo botão "Salvar POP" no HTML
     */
    window.salvarPOP = function () {
        const codigoValido = validarCampoCodigo(true);

        if (!campoCodigo || campoCodigo.value.trim() === "") {
            campoCodigo.style.borderColor = "#ef4444";
            feedbackCodigo.style.color = "#ef4444";
            feedbackCodigo.textContent = "✖ O campo Código é obrigatório";
            campoCodigo.focus();
            return;
        }

        if (!codigoValido) {
            campoCodigo.focus();
            return;
        }

        // Aqui entra a lógica de salvar (integração com backend/Firebase/etc.)
        alert(`POP "${campoCodigo.value.trim()}" salvo com sucesso!`);
    };

    /**
     * Limpa o formulário e reseta o visual do campo código
     * Chamada pelo botão "Limpar" no HTML
     */
    window.limparFormulario = function () {
        document.querySelectorAll("input, select, textarea").forEach((el) => {
            if (el.tagName === "SELECT") {
                el.selectedIndex = 0;
            } else {
                el.value = "";
            }
            el.style.borderColor = "";
        });
        if (feedbackCodigo) feedbackCodigo.textContent = "";
    };
});