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