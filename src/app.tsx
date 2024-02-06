import logo from './assets/logo-nlw-expert.svg';
import { FormSearchNotes } from "./components/form-search-notes";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="Logo nlw" />
      <FormSearchNotes />

      <div className="h-px bg-slate-700" ></div>

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>

    </div>
  )

}
