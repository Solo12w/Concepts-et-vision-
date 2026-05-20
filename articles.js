// ============================================================
//  articles.js — BASE DE DONNÉES DE TES ARTICLES
//  Tu peux modifier ce fichier depuis n'importe quel éditeur
//  ou utiliser la page Admin (admin.html) depuis ton téléphone
// ============================================================

var ARTICLES = [
  {
    id: 1,
    title: "Bienvenue sur mon blog international",
    category: "✦ À propos",
    excerpt: "Pourquoi j'ai décidé de créer ce blog et ce que tu peux attendre de cette aventure éditoriale.",
    date: "18 Avril 2026",
    readTime: 3,
    content: `Bienvenue ! Je suis ravi de t'accueillir sur cet espace qui m'appartient entièrement.

Ce blog est hébergé sur GitHub Pages — ce qui signifie qu'il ne peut jamais être supprimé ou bloqué par une plateforme tierce. Tout le contenu m'appartient.

Mon objectif est simple : partager mes réflexions, mes expériences et mes découvertes avec le monde entier. Que tu sois en Afrique, en Europe, en Asie ou en Amérique, ce blog est fait pour toi.

Je publierai régulièrement des articles sur des sujets qui me passionnent. N'hésite pas à partager et à revenir souvent !`
  },
  {
    id: 2,
    title: "Comment bloguer depuis son téléphone sans stress",
    category: "✦ Conseils",
    excerpt: "Mes astuces pour créer du contenu de qualité directement depuis un smartphone, n'importe où dans le monde.",
    date: "17 Avril 2026",
    readTime: 5,
    content: `Beaucoup de gens pensent qu'il faut un ordinateur puissant pour gérer un blog. C'est faux.

Depuis plus d'un an, je gère ce blog entièrement depuis mon téléphone. Voici mes secrets.

Premièrement, l'organisation. J'utilise une application de notes pour écrire mes brouillons en déplacement. Quand une idée me vient, je la note immédiatement.

Deuxièmement, la régularité. Publier un article de qualité par semaine vaut mieux que cinq articles médiocres.

Troisièmement, la simplicité technique. Ce blog est fait en HTML simple — pas de WordPress, pas de serveur compliqué. Juste des fichiers que je modifie et que je pousse sur GitHub.

Le résultat ? Un blog rapide, gratuit, et qui m'appartient vraiment.`
  },
  {
    id: 3,
    title: "L'Afrique et le numérique : une révolution silencieuse",
    category: "✦ Technologie",
    excerpt: "Le continent africain est en train de vivre une transformation numérique extraordinaire qui change la vie de millions de personnes.",
    date: "15 Avril 2026",
    readTime: 7,
    content: `Quand on parle de révolution numérique, on pense souvent à la Silicon Valley ou à la Chine. Pourtant, c'est en Afrique que se jouent certaines des innovations les plus fascinantes de notre époque.

M-Pesa au Kenya a révolutionné les paiements mobiles bien avant que l'Occident ne s'y intéresse vraiment. Des millions de personnes sans compte bancaire ont accès à des services financiers grâce à leur téléphone.

En Éthiopie, au Nigeria, au Sénégal, des startups technologiques émergent chaque jour pour résoudre des problèmes locaux avec des solutions locales.

Cette révolution est silencieuse parce qu'elle ne fait pas les grands titres internationaux. Mais elle est bien réelle, et elle va changer le monde.`
  }
];

// ============================================================
//  FONCTIONS UTILITAIRES (ne pas modifier)
// ============================================================
function saveArticles() {
  try {
    localStorage.setItem('blog_articles', JSON.stringify(ARTICLES));
  } catch(e) {}
}

function loadArticles() {
  try {
    var saved = localStorage.getItem('blog_articles');
    if (saved) ARTICLES = JSON.parse(saved);
  } catch(e) {}
}

loadArticles();
