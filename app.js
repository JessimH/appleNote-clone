const options = {
    data() {
        return {
            show: false,
            update: true,
            showForm: '',
            note: {
                title: "",
                content: "",
                description: ""
            },
            notes: [],
        };
    },

    methods: {
        displayInput() {
            const form = document.querySelector('.note-add')
            form.style.display = 'block'
        },
        updateForm(id) {
            const noteSelected = this.notes.filter((note) => {
                return id === note.id;
            });
            if (!this.update) {
                this.update = true
            } else {
                this.update = false
            }
            if (noteSelected) {
                this.showForm = id
            }
            const form = document.querySelector('.note-add')
            form.style.display = 'none'
            // console.log(this.update)
        },
        updateNote(id) {
            this.notes.filter((note) => {
                return id === note.id;
            })
            // noteSelected[0].content = this.note.content
            localStorage.setItem("notes", JSON.stringify(this.notes));
            if (!this.update) {
                this.update = true
            } else {
                this.update = false
            }
        },
        displayOptions() {
            if (!this.show) {
                this.show = true
            } else {
                this.show = false
            }
            this.update = true
            console.log(this.show)
        },
        addNote() {
            const date = new Date()
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            if (!this.note) {
                return;
            }
            if (this.note.tile != "" || this.note.title != "") {
                const note = {
                    id: Date.now(),
                    fullDate: `${day}/${month}/${year}`,
                    title: this.note.title,
                    content: this.note.content,
                    description: `${this.note.content.substr(0, 29)} ...`
                };
                this.notes.unshift(note);
            } else {

            }
            this.note.title = "";
            this.note.content = "";
            const form = document.querySelector('.note-add')
            form.style.display = 'none'
            localStorage.setItem("notes", JSON.stringify(this.notes));
            this.show = false
        },
        deleteNote(id) {
            this.notes = this.notes.filter((note) => {
                return id != note.id;
            });
            localStorage.setItem("notes", JSON.stringify(this.notes));
        }
    },
    mounted() {
        this.notes = JSON.parse(localStorage.getItem("notes")) || [];
    }
};
const app = Vue.createApp(options);

app.directive("focus", {
    mounted(el) {
        el.focus();
    },
})
    .mount("#app");