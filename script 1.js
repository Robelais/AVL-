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
            document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
        }

        // Sélectionner un plan
        function selectPlan(planType) {
            document.getElementById('subscriptionType').value = planType;
            document.getElementById('subscriptionType').scrollIntoView({ behavior: 'smooth' });
        }

        // Valider le formulaire
        function validateForm() {
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subscription = document.getElementById('subscriptionType').value;

            if (!fullName || !email || !phone || !subscription) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }

            // Sauvegarder les données utilisateur
            saveUserData(fullName, email, phone, subscription);

            // Rediriger vers le paiement
            proceedToPayment(subscription);
        }

        // Sauvegarder les données utilisateur
        function saveUserData(name, email, phone, subscription) {
            const userData = {
                name: name,
                email: email,
                phone: phone,
                subscription: subscription,
                timestamp: new Date().toISOString()
            };
            
            let users = JSON.parse(sessionStorage.getItem('avlStoreUsers') || '[]');
            users.push(userData);
            sessionStorage.setItem('avlStoreUsers', JSON.stringify(users));
        }

        // Procéder au paiement
        function proceedToPayment(planType) {
    console.log("Plan Type:", planType); // Log pour vérifier le planType
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
            window.open('https://chat.whatsapp.com/GmhxpXjcOCVHbS7ydrqB3F?mode=ac_t', '_blank');
            return;
       }
    console.log("Ouverture de la fenêtre de paiement avec URL:", paymentUrl);
    window.open(paymentUrl, '_blank');

        
 }

        // Accès administrateur
        function showAdminLogin() {
            const password = prompt('Entrez le mot de passe administrateur:');
            if (password === 'avladmin2024') {
                showAdminPanel();
            } else if (password !== null) {
                alert('Mot de passe incorrect');
            }
        }

        // Panneau administrateur
        function showAdminPanel() {
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
            if (confirm('Êtes-vous sûr de vouloir effacer toutes les données ?')) {
                sessionStorage.removeItem('avlStoreUsers');
                location.reload();
            }
        }

        // Initialiser les étoiles au chargement
        document.addEventListener('DOMContentLoaded', function() {
            createStars();
        });
    </script>
