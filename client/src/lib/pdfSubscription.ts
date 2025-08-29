// PDF Subscription Form Handler
// This script handles the PDF subscription forms embedded in blog posts

export function initializePdfForms() {
  // Handle PDF subscription forms
  const pdfForms = document.querySelectorAll('#pdf-subscription-form');
  
  pdfForms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('#pdf-email') as HTMLInputElement;
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      
      if (!emailInput || !submitButton) return;
      
      const email = emailInput.value.trim();
      
      if (!email) {
        showMessage('Por favor ingresa tu email', 'error');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage('Por favor ingresa un email válido', 'error');
        return;
      }
      
      // Show loading state
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '📧 Enviando...';
      submitButton.disabled = true;
      
      try {
        // Determine PDF type based on page URL or form data
        let pdfType = 'setup'; // default
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('obs') || currentPath.includes('cpu')) {
          pdfType = 'obs-cpu';
        } else if (currentPath.includes('setup') || currentPath.includes('100-euros')) {
          pdfType = 'setup';
        }
        
        const response = await fetch('/api/subscribe-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email,
            pdfType 
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          showMessage('¡PDF enviado! Revisa tu email 📧', 'success');
          emailInput.value = '';
          
          // Update form to show success state
          const formContainer = form.parentElement;
          if (formContainer) {
            formContainer.innerHTML = `
              <div style="background: #10b981; color: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h3>✅ ¡PDF Enviado Exitosamente!</h3>
                <p>Revisa tu email (y la carpeta de spam) para descargar tu PDF gratuito.</p>
                <p style="font-size: 14px; margin-top: 15px;">¿No llegó? <a href="mailto:hola@yostreamer.com" style="color: white; text-decoration: underline;">Contáctanos</a></p>
              </div>
            `;
          }
        } else {
          showMessage(data.error || 'Error al enviar PDF', 'error');
        }
      } catch (error) {
        console.error('PDF subscription error:', error);
        showMessage('Error de conexión. Inténtalo de nuevo.', 'error');
      } finally {
        // Restore button state (if form still exists)
        if (submitButton.parentElement) {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        }
      }
    });
  });
}

function showMessage(message: string, type: 'success' | 'error') {
  // Create a simple toast notification
  const toast = document.createElement('div');
  toast.innerHTML = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    z-index: 10000;
    max-width: 350px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideInRight 0.3s ease-out;
  `;
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(toast);
  
  // Remove after 5 seconds
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease-out reverse';
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 5000);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePdfForms);
} else {
  initializePdfForms();
}