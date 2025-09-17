// Elementos da página
const btnFollow1 = document.getElementById('btnFollow1');
const btnFollow2 = document.getElementById('btnFollow2');
const btnUnlock = document.getElementById('btnUnlock');
const progressBar = document.getElementById('progress-bar');
const loadingOverlay = document.getElementById('loading-overlay');

// Estado inicial
btnFollow1.disabled = false;
btnFollow2.disabled = true;
btnUnlock.disabled = true;

// Analytics e rastreamento
function trackEvent(action, category = 'UserAction') {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': 'Script Access Flow'
        });
    }
    
    // Console para debug
    console.log(`📊 Evento rastreado: ${action}`);
}

// Mostrar loading
function showLoading(text = 'Carregando...') {
    loadingOverlay.querySelector('p').textContent = text;
    loadingOverlay.style.display = 'flex';
}

// Esconder loading
function hideLoading() {
    loadingOverlay.style.display = 'none';
}

// Marcar botão como concluído
function markCompleted(button) {
    button.classList.add('completed');
    const status = button.querySelector('.btn-status');
    status.textContent = 'Concluído';
    
    // Efeito visual
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Animar progresso
function fillProgress(start, end, duration, callback) {
    let current = start;
    const stepTime = 50; // Mais suave
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(interval);
            if (callback) callback();
        }
        
        progressBar.style.width = current + "%";
        progressBar.textContent = Math.floor(current) + "%";
        
        // Mudar cor conforme progresso
        if (current >= 100) {
            progressBar.style.background = 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)';
        }
    }, stepTime);
}

// Atualizar status do botão
function updateButtonStatus(button, status, enabled = false) {
    const statusElement = button.querySelector('.btn-status');
    statusElement.textContent = status;
    button.disabled = !enabled;
}

// Primeiro botão - TikTok 1
btnFollow1.addEventListener('click', () => {
    trackEvent('follow_tiktok_1', 'SocialMedia');
    
    btnFollow1.disabled = true;
    updateButtonStatus(btnFollow1, 'Verificando...', false);
    
    // Abrir TikTok
    const tiktokWindow = window.open('https://www.tiktok.com/@pedrun_0.0?lang=pt-BR', '_blank');
    
    // Verificar se a janela foi aberta
    if (!tiktokWindow) {
        alert('⚠️ Por favor, permita pop-ups para este site!');
        btnFollow1.disabled = false;
        updateButtonStatus(btnFollow1, 'Clique aqui', true);
        return;
    }
    
    markCompleted(btnFollow1);
    
    // Progresso de 0% a 50%
    fillProgress(0, 50, 15000, () => {
        btnFollow2.disabled = false;
        updateButtonStatus(btnFollow2, 'Clique aqui', true);
        
        // Efeito visual no segundo botão
        btnFollow2.style.animation = 'pulse 1s ease-in-out 3';
    });
});

// Segundo botão - TikTok 2
btnFollow2.addEventListener('click', () => {
    trackEvent('follow_tiktok_2', 'SocialMedia');
    
    btnFollow2.disabled = true;
    updateButtonStatus(btnFollow2, 'Verificando...', false);
    
    // Abrir TikTok
    const tiktokWindow = window.open('https://www.tiktok.com/@ysosheik7', '_blank');
    
    if (!tiktokWindow) {
        alert('⚠️ Por favor, permita pop-ups para este site!');
        btnFollow2.disabled = false;
        updateButtonStatus(btnFollow2, 'Clique aqui', true);
        return;
    }
    
    markCompleted(btnFollow2);
    
    // Progresso de 50% a 100%
    fillProgress(50, 100, 15000, () => {
        btnUnlock.disabled = false;
        updateButtonStatus(btnUnlock, 'CLIQUE PARA SCRIPTS!', true);
        
        // Efeito especial no botão final
        btnUnlock.style.animation = 'pulse 0.8s infinite';
        
        // Mostrar notificação
        showNotification('🎉 Scripts desbloqueados! Clique no botão dourado!');
    });
});

// Botão final - Desbloquear
btnUnlock.addEventListener('click', () => {
    trackEvent('unlock_scripts', 'Conversion');
    
    btnUnlock.disabled = true;
    showLoading('Preparando seus scripts...');
    
    markCompleted(btnUnlock);
    updateButtonStatus(btnUnlock, 'Redirecionando...', false);
    
    // Simular carregamento
    setTimeout(() => {
        hideLoading();
        
        // SUBSTITUA PELA SUA URL REAL DO LINKVERTISE OU OUTRO LINK
        const finalLink = 'https://link-hub.net/1397590/QhyvaQTyl8gl'; // ← MUDE AQUI
        
        const finalWindow = window.open(finalLink, '_blank');
        
        if (!finalWindow) {
            alert('⚠️ Por favor, permita pop-ups para acessar seus scripts!');
        } else {
            showNotification('✅ Redirecionando para seus scripts!');
        }
        
        // Reset após 5 segundos (opcional)
        setTimeout(() => {
            location.reload();
        }, 5000);
        
    }, 2000);
});

// Sistema de notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#4CAF50' : '#ff9800'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1001;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideDown 0.5s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.5s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// Adicionar animações CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Prevenir reload acidental
window.addEventListener('beforeunload', (e) => {
    const progress = parseInt(progressBar.textContent) || 0;
    if (progress > 0 && progress < 100) {
        e.preventDefault();
        e.returnValue = '';
        return 'Você tem progresso não salvo. Tem certeza que quer sair?';
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 YSO SHEIK Scripts - Sistema iniciado!');
    trackEvent('page_load', 'Navigation');
    
    // Esconder loading inicial
    hideLoading();
    
    // Mensagem de boas-vindas
    setTimeout(() => {
        showNotification('👋 Bem-vindo! Siga os passos para desbloquear seus scripts!');
    }, 1000);
});
