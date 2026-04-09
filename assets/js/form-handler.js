(function () {
  const form = document.getElementById("leadForm");
  const btn = document.getElementById("submitBtn");

  if (!form || !btn) return;

  const { googleScriptUrl, timezone } = window.APP_CONFIG || {};

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const originalBtnText = btn.innerHTML;
    setLoading(true, btn);

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.Fecha = new Date().toLocaleString("es-MX", {
      timeZone: timezone || "America/Mexico_City",
      hour12: false,
    });

    if (!googleScriptUrl || googleScriptUrl.includes("URL_DE_TU_GOOGLE_APPS_SCRIPT_AQUI")) {
      showConfigError();
      setLoading(false, btn, originalBtnText);
      return;
    }

    try {
      await fetch(googleScriptUrl, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      showSuccess();
      form.reset();
    } catch (error) {
      showError();
      console.error("Error al enviar formulario:", error);
    } finally {
      setLoading(false, btn, originalBtnText);
    }
  });

  function setLoading(isLoading, targetBtn, originalText = "") {
    if (isLoading) {
      targetBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Procesando...';
      targetBtn.disabled = true;
      targetBtn.classList.add("opacity-75");
      return;
    }

    targetBtn.innerHTML = originalText;
    targetBtn.disabled = false;
    targetBtn.classList.remove("opacity-75");
  }

  function showSuccess() {
    Swal.fire({
      title: "¡Análisis Solicitado!",
      text: "Tus datos han sido recibidos. Me pondré en contacto contigo a la brevedad para estructurar tu proyecto ELAM FAW.",
      icon: "success",
      confirmButtonColor: "#0B132B",
      confirmButtonText: "Excelente",
    });
  }

  function showError() {
    Swal.fire({
      title: "Hubo un problema",
      text: "No pudimos enviar tu información. Por favor, intenta de nuevo o contáctame directamente por teléfono.",
      icon: "error",
      confirmButtonColor: "#0B132B",
    });
  }

  function showConfigError() {
    Swal.fire({
      title: "Configura Google Sheets",
      html: "Aún no está configurada la URL de Google Apps Script.<br><br>Abre <code>assets/js/config.js</code> y reemplaza <code>googleScriptUrl</code>.",
      icon: "warning",
      confirmButtonColor: "#0B132B",
    });
  }
})();
