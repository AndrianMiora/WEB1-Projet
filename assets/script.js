
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
                <div class="modal-actions">
                    <button class="save-note">Entregistrer</button>
                    <button class="close-note">Annuler</button>
                </div>
            </div>
            `;

            container.appendChild(noteModal);

            noteModal.querySelector(".save-note").addEventListener("click", function(){
                alert("Votre note a bien ete enregistree");
                noteModal.remove();
            });
            noteModal.querySelector(".close-note").addEventListener("click", function(){
                noteModal.remove();
            })
    });
});