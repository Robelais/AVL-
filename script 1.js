<script>
// Créer les étoiles animées
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        starsContainer.appendChild(star);
    }
}

// Fonction pour faire défiler vers les plans
function scrollToPlans() {
    console.log("Défilement vers les plans");
    const plansSection = document.getElementById('plans');
    if (plansSection) {
        plansSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sélectionner un plan
function selectPlan(planType) {
    console.log("Plan sélectionné:", planType);
    const selectElement = document.getElementById('subscriptionType');
    if (selectElement) {
        selectElement.value = planType;
        // Faire défiler vers le formulaire
        document.querySelector('.registration-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Valider le formulaire
function validateForm() {
    console.log("Validation du formulaire");
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subscription = document.getElementById('subscriptionType');

    // Vérifier que les éléments existent
    if (!fullName || !email || !phone || !subscription) {
        alert('Erreur: Formulaire incomplet');
        return;
    }

    // Vérifier les valeurs
    if (!fullName.value || !email.value || !phone.value || !subscription.value) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return;
    }

    // Sauvegarder les données utilisateur
    saveUserData(fullName.value, email.value, phone.value, subscription.value);

    // Rediriger vers le paiement
    proceedToPayment(subscription.value);
}

// Sauvegarder les données utilisateur
function saveUserData(name, email, phone, subscription) {
    console.log("Sauvegarde des données");
    const userData = {
        name: name,
        email: email,
        phone: phone,
        subscription: subscription,
        timestamp: new Date().toISOString()
    };
    
    try {
        let users = JSON.parse(sessionStorage.getItem('avlStoreUsers') || '[]');
        users.push(userData);
        sessionStorage.setItem('avlStoreUsers', JSON.stringify(users));
        console.log("Données sauvegardées");
    } catch (error) {
        console.error("Erreur de sauvegarde:", error);
    }
}

// Procéder au paiement
function proceedToPayment(planType) {
    console.log("Plan Type:", planType);
    let paymentUrl = '';
    
    switch (planType) {
        case 'netflix-personal':
            paymentUrl = 'https://pay.wave.com/m/M_ci_twqQfXwhJpwP/c/ci/?amount=3000';
            break;
        case 'netflix-family':
            paymentUrl = 'https://pay.wave.com/m/M_ci_twqQfXwhJpwP/c/ci/?amount=12000';
            break;
        case 'primevideo':
            paymentUrl = 'https://pay.wave.com/m/M_ci_twqQfXwhJpwP/c/ci/?amount=5000';
            break;
        default:
            console.log("Plan Type non reconnu:", planType);
            window.location.href = 'https://chat.whatsapp.com/GmhxpXjcOCVHbS7ydrqB3F?mode=ac_t';
            return;
    }
    
    console.log("Redirection vers la page de paiement:", paymentUrl);
    window.location.href = paymentUrl;
}
    
    console.log("Redirection vers:", paymentUrl);
    // Utiliser location.href au lieu de window.open pour éviter les popups bloqués
    window.location.href = paymentUrl;
}

// Accès administrateur
function showAdminLogin() {
    console.log("Accès admin demandé");
    const password = prompt('Entrez le mot de passe administrateur:');
    if (password === 'avladmin2024') {
        showAdminPanel();
    } else if (password !== null) {
        alert('Mot de passe incorrect');
    }
}

// Panneau administrateur
function showAdminPanel() {
    console.log("Affichage admin panel");
    const users = JSON.parse(sessionStorage.getItem('avlStoreUsers') || '[]');
    
    let adminContent = `
        <div style="background: linear-gradient(135deg, #1a2a6c, #b21f1f); color: white; padding: 30px; border-radius: 15px; margin: 20px; position: relative; z-index: 1000;">
            <h2 style="color: #FFD700; margin-bottom: 20px;">Panneau Administrateur</h2>
            <h3>Utilisateurs enregistrés (${users.length})</h3>
            <div style="max-height: 400px; overflow-y: auto; margin-top: 20px;">
    `;
    
    if (users.length === 0) {
        adminContent += '<p>Aucun utilisateur enregistré</p>';
    } else {
        users.forEach((user, index) => {
            adminContent += `
                <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 15px; margin: 10px 0; border-radius: 10px;">
                    <p><strong>Nom:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Téléphone:</strong> ${user.phone}</p>
                    <p><strong>Abonnement:</strong> ${user.subscription}</p>
                    <p><strong>Date:</strong> ${new Date(user.timestamp).toLocaleString()}</p>
                </div>
            `;
        });
    }
    
    adminContent += `
            </div>
            <button onclick="clearData()" style="background: #FF4500; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px;">Effacer toutes les données</button>
            <button onclick="location.reload()" style="background: #FFD700; color: #1a2a6c; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px; margin-left: 10px;">Fermer</button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', adminContent);
}

// Effacer les données
function clearData() {
    console.log("Effacement des données");
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les données ?')) {
        sessionStorage.removeItem('avlStoreUsers');
        location.reload();
    }
}

// Initialiser les étoiles au chargement
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM chargé - Initialisation");
    createStars();
    .registration-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 30px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: white;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 12px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 16px;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #1a2a6c;
    background: rgba(255, 255, 255, 0.2);
}

.submit-button {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #1a2a6c, #b21f1f);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}
});


