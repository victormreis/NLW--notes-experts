import { ChangeEvent } from "react";

interface FormSearchNotesProps {
  handleSearch : (input :ChangeEvent<HTMLInputElement>)  => void 
}

export function FormSearchNotes({handleSearch} : FormSearchNotesProps) {
  return (
    <form className="w-full">
      <input
        type="text"
        placeholder="Busque em suas notas"
        className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500"
        onChange={handleSearch}
      />
    </form>
  );
}

