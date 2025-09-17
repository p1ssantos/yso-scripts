// Gerenciador de Anúncios
class AdManager {
    constructor() {
        this.adsenseEnabled = false;
        this.propellerEnabled = false;
        this.init();
    }

    init() {
        // Verificar se AdSense está configurado
        this.checkAdSense();
        
        // Configurar Propeller Ads como backup
        this.setupPropellerAds();
        
        // Carregar anúncios após 2 segundos
        setTimeout(() => {
            this.loadAds();
        }, 2000);
    }

    checkAdSense() {
        // Verificar se o ID do AdSense foi configurado
        const adsenseScripts = document.querySelectorAll('script[src*="googlesyndication"]');
        if (adsenseScripts.length > 0) {
            const script = adsenseScripts[0];
            if (script.src.includes('SEU_PUBLISHER_ID')) {
                console.log('⚠️ AdSense não configurado ainda');
                this.showAdPlaceholders();
            } else {
                this.adsenseEnabled = true;
                console.log('✅ AdSense configurado');
            }
        }
    }

    setupPropellerAds() {
        // Propeller Ads como backup (substitua pelos seus IDs)
        if (!this.adsenseEnabled) {
            // Pop-under (use com moderação)
            const propellerScript = document.createElement('script');
            propellerScript.innerHTML = `
                (function(d,z,s){s.src='//gratuitouswaffle.com/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('gratuitouswaffle.com',7853104,document.createElement('script'))
            `;
            // Descomente a linha abaixo para ativar Propeller Ads
            // document.head.appendChild(propellerScript);
        }
    }

    showAdPlaceholders() {
        // Mostrar placeholders dos anúncios
        const adContainers = document.querySelectorAll('.ad-container');
        adContainers.forEach((container, index) => {
            container.style.background = '#f0f0f0';
            container.style.border = '2px dashed #ccc';
            container.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #666;">
                    <h3>📢 Anúncio ${index + 1}</h3>
                    <p>Configure o AdSense para ativar</p>
                    <small>Espaço: ${container.classList.contains('ad-horizontal') ? 'Horizontal' : 
                           container.classList.contains('ad-between') ? 'Quadrado' : 'Responsivo'}</small>
                </div>
            `;
        });
    }

    loadAds() {
        if (this.adsenseEnabled && typeof adsbygoogle !== 'undefined') {
            try {
                // Carregar anúncios AdSense
                const ads = document.querySelectorAll('.adsbygoogle');
                ads.forEach(ad => {
                    if (!ad.hasAttribute('data-adsbygoogle-status')) {
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    }
                });
                console.log('✅ Anúncios AdSense carregados');
            } catch (error) {
                console.error('❌ Erro ao carregar AdSense:', error);
            }
        }
    }

    // Rastrear cliques em anúncios (Analytics)
    trackAdClick(adType) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ad_click', {
                'event_category': 'Advertisement',
                'event_label': adType
            });
        }
    }
}

// Inicializar gerenciador de anúncios
document.addEventListener('DOMContentLoaded', () => {
    window.adManager = new AdManager();
});

// Detectar AdBlock
function detectAdBlock() {
    const adTest = document.createElement('div');
    adTest.innerHTML = '&nbsp;';
    adTest.className = 'adsbox';
    adTest.style.position = 'absolute';
    adTest.style.left = '-10000px';
    document.body.appendChild(adTest);
    
    setTimeout(() => {
        if (adTest.offsetHeight === 0) {
            console.log('⚠️ AdBlock detectado');
            // Mostrar mensagem amigável para usuários com AdBlock
            showAdBlockMessage();
        }
        document.body.removeChild(adTest);
    }, 100);
}

function showAdBlockMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff9800;
        color: white;
        padding: 15px;
        border-radius: 10px;
        z-index: 1000;
        font-weight: bold;
        max-width: 300px;
    `;
    message.innerHTML = `
        <div>🛡️ AdBlock Detectado</div>
        <small>Os anúncios nos ajudam a manter o site gratuito!</small>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 5000);
}

// Verificar AdBlock
setTimeout(detectAdBlock, 2000);
