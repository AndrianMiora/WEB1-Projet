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
                const contenu = noteModal.querySelector(".note-content").value.trim();
                
                const tags = tag.split(" ")
                                .filter(tag => tag.startsWith("#"))
                                .map(tag => `<span class="note-tag"> ${tag}</span>`)
                                .join(" ");

                                console.log(tag);
                noteCard.innerHTML = `
                <h3>${titre || "Nouvelle Note"}</h3>
                <p class="note-date">${date}</p>
                <p class="note-body">${contenu}</p>
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
                });

                noteCard.querySelector(".edit-note").addEventListener("click", function(){
                    const currentTitle = noteCard.querySelector("h3").textContent;
                    const currentContent = noteCard.querySelector(".note-body").textContent;
                    const currentTags = Array.from(noteCard.querySelectorAll(".note-tag")).map(tag => tag.textContent).join(" ");
                
                    const noteModal = document.createElement("div");
                    noteModal.classList.add("note-modal");
                
                    noteModal.innerHTML = `
                        <div class="note-modal-content">
                            <textarea class="note-title">${currentTitle}</textarea>
                            <textarea class="note-content">${currentContent}</textarea>
                            <input class="note-tags" value="${currentTags}" type="text">
                            <div class="modal-actions">
                                <button class="save-note">Enregistrer</button>
                                <button class="close-note">Annuler</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(noteModal);
                
                    noteModal.querySelector(".save-note").addEventListener("click", function(){
                        noteCard.querySelector("h3").textContent = noteModal.querySelector(".note-title").value.trim();
                        noteCard.querySelector(".note-body").textContent = noteModal.querySelector(".note-content").value.trim();
                
                        const newTagInput = noteModal.querySelector(".note-tags").value.trim();
                        const newTags = newTagInput.split(" ")
                                                .filter(tag => tag.startsWith("#"))
                                                .map(tag => `<span class="note-tag">${tag}</span>`)
                                                .join(" ");
                        noteCard.querySelector(".tag").innerHTML = newTags;
                
                        noteModal.remove();
                    });
                
                    noteModal.querySelector(".close-note").addEventListener("click", function(){
                        noteModal.remove();
                    });
                });
                

                container.appendChild(noteCard);
                noteModal.remove();
            });
            noteModal.querySelector(".close-note").addEventListener("click", function(){
                noteModal.remove();
            });
    });

    const profileToggle = document.getElementById("profile-menu-toggle");
    const dropdown = document.getElementById("profile-dropdown");

    profileToggle.addEventListener("click", function () {
        const isVisible = dropdown.classList.contains("show");

        if (isVisible) {
            dropdown.classList.remove("show");
        } else {
            dropdown.classList.add("show");
        }
    });

    document.addEventListener("click", function (event) {
        const clickedInside = event.target.closest(".dropdown");
        if (!clickedInside) {
            dropdown.classList.remove("show");
        }
    });

    const filterSelect = document.getElementById("filter-select");

    filterSelect.addEventListener("change", function () {
        const notes = Array.from(container.getElementsByClassName("note-card"));

        let sortedNotes = notes;

        if (this.value === "title-asc") {
            sortedNotes = notes.sort((a, b) =>
                a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent)
            );
        } else if (this.value === "title-desc") {
            sortedNotes = notes.sort((a, b) =>
                b.querySelector("h3").textContent.localeCompare(a.querySelector("h3").textContent)
            );
        } else if (this.value === "date-new") {
            sortedNotes = notes.sort((a, b) =>
                new Date(b.querySelector(".note-date").textContent) - new Date(a.querySelector(".note-date").textContent)
            );
        } else if (this.value === "date-old") {
            sortedNotes = notes.sort((a, b) =>
                new Date(a.querySelector(".note-date").textContent) - new Date(b.querySelector(".note-date").textContent)
            );
        }

        container.innerHTML = "";
        sortedNotes.forEach(note => container.appendChild(note));
    });

    const searchBox = document.getElementById("search-box");

    searchBox.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        const notes = container.getElementsByClassName("note-card");

        Array.from(notes).forEach(note => {
            const title = note.querySelector("h3").textContent.toLowerCase();
            const tags = note.querySelector(".tag").textContent.toLowerCase();
            
            if (title.includes(query) || tags.includes(query)) {
                note.style.display = "block";
            } else {
                note.style.display = "none";
            }
        });
    });

    const hamburger = document.getElementById('nav_hamburger');
    const mobileMenu = document.getElementById('nav_mobile');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

});