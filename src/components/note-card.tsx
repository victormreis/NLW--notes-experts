export function NoteCard() {
  return (
    <button className="rounded-md text-left outline-none bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300 ">
        Há 2 dias
      </span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestias saepe sapiente numquam ratione dolore blanditiis quod accusantium, iste quasi cumque ullam, inventore ad! Rerum laborum modi soluta quos hic?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestias saepe sapiente numquam ratione dolore blanditiis quod accusantium, iste quasi cumque ullam, inventore ad! Rerum laborum modi soluta quos hic?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque molestias saepe sapiente numquam ratione dolore blanditiis quod accusantium, iste quasi cumque ullam, inventore ad! Rerum laborum modi soluta quos hic?
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-black/0 pointer-events-none" />
    </button>
  );
}

