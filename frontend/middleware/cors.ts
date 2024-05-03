export default function ({req, res, next}) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        // Pour les requêtes OPTIONS, renvoyez une réponse immédiate avec le statut 200 (OK)
        return res.end();
    }

    next(); // Passe au middleware suivant
};