// api/register.js
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { fullName, email, phone, subscription } = request.body;
    
    // Validation basique
    if (!fullName || !email || !phone || !subscription) {
      return response.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Ici, tu enverras les données à ta base de données
    console.log('Nouvel utilisateur :', { fullName, email, phone, subscription });
    
    // Ici, tu enverras un email de confirmation
    // await sendConfirmationEmail(email, fullName);

    // Réponse de succès
    return response.status(200).json({ 
      success: true, 
      message: 'Compte créé avec succès ! Un email de confirmation a été envoyé.' 
    });
    
  } catch (error) {
    console.error('Erreur API:', error);
    return response.status(500).json({ error: 'Erreur serveur' });
  }
}
