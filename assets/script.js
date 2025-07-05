// Script pour le menu hamburger

    // pour le petit icon de nav bar
    const hamburger = document.getElementById('nav_hamburger');

    // affichage du navBar pour moile
        const mobileMenu = document.getElementById('nav_mobile');

    // le profil pour simple test
        const profileDropdown = document.getElementById('profile-dropdown');

    // mode sombre et activer le nav bar
        const profileButton = document.getElementById('profile');
        const themeToggle = document.getElementById('theme-toggle');

    //mode sombre pour mobile
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

  // Petit Menu caché avec /// ( triple barre)
  
  hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
  });

  // Menu profil dropdown
  profileButton.addEventListener('click', function() {
    profileDropdown.classList.toggle('active');
  });

  // Fermer les menus quand on clique ailleurs
  document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
      }
      
      if (!profileButton.contains(e.target)) {
          profileDropdown.classList.remove('active');
      }
  });







  





  // Toggle thème sombre/clair
  function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');

    // Changer l'icône
    const icon = isLight ? 'fa-moon' : 'fa-sun';
    themeToggle.querySelector('i').className = `fa-solid ${icon}`;
    mobileThemeToggle.querySelector('i').className = `fa-solid ${icon}`;

    // Changer le texte mobile
    mobileThemeToggle.querySelector('span').textContent = isLight ? 'Mode sombre' : 'Mode clair';

    // Sauvegarder la préférence
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.querySelector('i').className = 'fa-solid fa-sun';
    mobileThemeToggle.querySelector('i').className = 'fa-solid fa-sun';
    mobileThemeToggle.querySelector('span').textContent = 'Mode clair';
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);









  // Gestion des notifications
  document.getElementById('notifications').addEventListener('click', function() {
    alert('Vous avez 3 nouvelles notifications!');
});

// Gestion des liens du profil
// A remplacer avec le menu du mail

document.getElementById('profile-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Redirection vers le profil utilisateur');
});

document.getElementById('settings-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Redirection vers les paramètres');
});

document.getElementById('help-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Redirection vers l\'aide');
});

document.getElementById('logout-link').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
        alert('Déconnexion en cours...');
    }
});

// Redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Recherche en temps réel
document.getElementById('search-box').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length > 2) {
        console.log('Recherche en cours:', searchTerm);
        // Ici vous pourriez ajouter la logique de recherche
    }
});








document.addEventListener("DOMContentLoaded", function(){
    const ajouterNote = document.getElementById("new-note_btn");
    const container = document.getElementById("container");

    ajouterNote.addEventListener("click", function(){
        const noteModal = document.createElement("div");
        noteModal.classList.add("note-modal");

        noteModal.innerHTML = `
            <div class = "note-modal-content">
                <textarea class="note-title" placeholder="Titre..."></textarea>
                <textarea class="note-content" placeholder="Entrez le contenu de votre note ici..."></textarea>
                <input class="note-tags" type="text" placeholder="Entrez un tag... (ex: #todo, #shoppinglist)">
                <div class="modal-actions">
                    <button class="save-note">Entregistrer</button>
                    <button class="close-note">Annuler</button>
                </div>
            </div>
            `;

            container.appendChild(noteModal);

            noteModal.querySelector(".save-note").addEventListener("click", function(){

                const titre = noteModal.querySelector(".note-title").value.trim();

                const tag = noteModal.querySelector(".note-tags").value.trim();

                const noteCard = document.createElement("div");
                noteCard.classList.add("note-card");

                
                const dateCreation = new Date();
                const date = dateCreation.toLocaleString()
                
                const tags = tag.split(" ")
                                .filter(tag => tag.startsWith("#")).map(tag => `<span class="note-tag"> ${tag}</span>`);

                                console.log(tag);
                noteCard.innerHTML = `
                <h3>${titre || "Nouvelle Note"}</h3>
                
                <p class="note-date">${date}</p>
                <div class="tag">${tags}</div>
                <div class="note-btn">
                    <button class="edit-note"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="delete-note"><i class="fa-solid fa-trash"></i></button>
                `;

                noteCard.querySelector(".delete-note").addEventListener("click", function(){
                    const confirmationSupp = confirm("Etes-vous sur de vouloir supprimer cette note?");
                        if (confirmationSupp) {
                            noteCard.remove();
                        }
                })

                container.appendChild(noteCard);
                noteModal.remove();
            });
            noteModal.querySelector(".close-note").addEventListener("click", function(){
                noteModal.remove();
            })
    });
});