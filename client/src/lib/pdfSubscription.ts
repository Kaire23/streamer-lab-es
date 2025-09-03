// PDF Subscription functionality for email collection and download
export interface PdfSubscriptionData {
  email: string;
  pdfType: string;
  timestamp: number;
}

// Initialize PDF subscription forms on page load
export function initializePdfForms() {
  if (typeof window === 'undefined') return;

  document.addEventListener('DOMContentLoaded', () => {
    setupPdfSubscriptionForms();
  });

  // If DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPdfSubscriptionForms);
  } else {
    setupPdfSubscriptionForms();
  }
}

function setupPdfSubscriptionForms() {
  const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
  
  pdfLinks.forEach(link => {
    const originalHref = link.getAttribute('href');
    if (!originalHref) return;

    // Convert direct PDF links to subscription forms
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPdfSubscriptionModal(originalHref, link as HTMLElement);
    });
  });
}

function showPdfSubscriptionModal(pdfUrl: string, linkElement: HTMLElement) {
  const pdfName = pdfUrl.split('/').pop()?.replace('.pdf', '') || 'checklist';
  
  // Create modal HTML
  const modalHtml = `
    <div id="pdf-subscription-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          🎯 Descarga GRATIS tu Checklist
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Introduce tu email para recibir el PDF directamente en tu bandeja de entrada
        </p>
        <form id="pdf-subscription-form" class="space-y-4">
          <input type="hidden" name="pdfType" value="${pdfName}">
          <input type="hidden" name="pdfUrl" value="${pdfUrl}">
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>
          
          <div class="flex gap-3">
            <button
              type="submit"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              id="pdf-submit-btn"
            >
              📧 Enviar PDF
            </button>
            <button
              type="button"
              onclick="closePdfModal()"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
        
        <div id="pdf-message" class="mt-4 hidden"></div>
        
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">
          📧 Te enviaremos el PDF por email + tips exclusivos de streaming
        </p>
      </div>
    </div>
  `;

  // Remove existing modal if any
  const existingModal = document.getElementById('pdf-subscription-modal');
  if (existingModal) {
    existingModal.remove();
  }

  // Add modal to page
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Add form submission handler
  const form = document.getElementById('pdf-subscription-form') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', handlePdfSubscription);
  }

  // Make close function global
  (window as any).closePdfModal = () => {
    const modal = document.getElementById('pdf-subscription-modal');
    if (modal) {
      modal.remove();
    }
  };

  // Close modal on outside click
  const modal = document.getElementById('pdf-subscription-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        (window as any).closePdfModal();
      }
    });
  }
}

async function handlePdfSubscription(e: Event) {
  e.preventDefault();
  
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const email = formData.get('email') as string;
  const pdfType = formData.get('pdfType') as string;
  const pdfUrl = formData.get('pdfUrl') as string;

  const submitBtn = document.getElementById('pdf-submit-btn') as HTMLButtonElement;
  const messageDiv = document.getElementById('pdf-message') as HTMLDivElement;

  if (!email || !pdfType) {
    showMessage('Por favor completa todos los campos', 'error');
    return;
  }

  // Show loading state
  if (submitBtn) {
    submitBtn.textContent = '⏳ Enviando...';
    submitBtn.disabled = true;
  }

  try {
    const response = await fetch('/api/subscribe-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        pdfType,
        pdfUrl,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(
        '✅ ¡PDF enviado! Revisa tu email (y carpeta de spam)',
        'success'
      );
      
      // Replace form with success message
      if (form) {
        form.innerHTML = `
          <div class="text-center">
            <div class="text-green-600 text-2xl mb-2">✅</div>
            <h4 class="font-bold text-green-600 mb-2">¡PDF Enviado!</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Revisa tu email (y carpeta de spam).<br>
              ¡También recibirás tips exclusivos de streaming!
            </p>
          </div>
        `;
      }

      // Auto-close modal after 3 seconds
      setTimeout(() => {
        (window as any).closePdfModal();
      }, 3000);

    } else {
      showMessage(data.error || 'Error al enviar PDF', 'error');
      
      // Reset button
      if (submitBtn) {
        submitBtn.textContent = '📧 Enviar PDF';
        submitBtn.disabled = false;
      }
    }
  } catch (error) {
    console.error('PDF subscription error:', error);
    showMessage('Error de conexión. Inténtalo de nuevo.', 'error');
    
    // Reset button
    if (submitBtn) {
      submitBtn.textContent = '📧 Enviar PDF';
      submitBtn.disabled = false;
    }
  }
}

function showMessage(message: string, type: 'success' | 'error') {
  const messageDiv = document.getElementById('pdf-message');
  if (!messageDiv) return;

  messageDiv.className = `p-3 rounded-lg text-sm ${
    type === 'success'
      ? 'bg-green-100 text-green-700 border border-green-200'
      : 'bg-red-100 text-red-700 border border-red-200'
  }`;
  
  messageDiv.textContent = message;
  messageDiv.classList.remove('hidden');

  // Hide message after 5 seconds
  setTimeout(() => {
    messageDiv.classList.add('hidden');
  }, 5000);
}

// Auto-initialize when module is imported
initializePdfForms();