import { ChangeEvent, useState } from "react";
import logo from './assets/logo-nlw-expert.svg';
import { FormSearchNotes } from "./components/form-search-notes";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string,
  date: Date,
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes-array')

    if (savedNotes) {
      return JSON.parse(savedNotes)
    }
    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
  

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes-array', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
    localStorage.setItem('notes-array', JSON.stringify(newNotes))   
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value
    setSearch(query)
  }

  const filteredNotes = search !== '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="Logo nlw" />
      <FormSearchNotes handleSearch={handleSearch} />

      <div className="h-px bg-slate-700" ></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}

      </div>

    </div>
  )

}
