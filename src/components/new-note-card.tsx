import * as Dialog from '@radix-ui/react-dialog'
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null


export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {

  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [shouldOpenModal, setShouldOpenModal] = useState(false)


  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChanged(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
    if (!e.target.value) setShouldShowOnboarding(true)
  }

  function handleSaveNote(e: FormEvent) {
    e.preventDefault()
    toast.success('Nota criada com sucesso!')
    setContent('')
    setShouldShowOnboarding(true)
    onNoteCreated(content)
    setShouldOpenModal(false)
  }

  function handleStartRecord() {
    const isSpeechReconitionAPIAvailable = 'SpeechREcognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechReconitionAPIAvailable) {
      alert('Infelizmente seu navegador não tem suporte para gravação de audio')
      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (e) => {
      const transcription = Array.from(e.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (e) => {
      console.error(e)
    }

    speechRecognition.start()
  }

  function handleStopRecord() {
    setIsRecording(false)
    if (speechRecognition !== null) {
      speechRecognition.stop()

    }
  }

  function togleModal() {
    setShouldOpenModal(false)
    handleStopRecord()
  }


  return (
    <Dialog.Root open={shouldOpenModal} onOpenChange={setShouldOpenModal}>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200 ">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em audio que será convertida em texto automaticamente
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content onEscapeKeyDown={togleModal} onInteractOutside={togleModal} className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none '>
          <div onClick={togleModal} className="absolute top-0 right-0 bg-slate-800 p-1.5  text-slate-400 hover:text-slate-100 cursor-pointer" >
            <X className="size-5" />
          </div >

          <form className="flex-1 flex flex-col">

            <div className="flex flex-1 flex-col gap-3 p-5 ">
              <span className="text-sm font-medium text-slate-300 ">
                Adicionar nota
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button type="button" onClick={handleStartRecord} className="text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se prefeir <button
                    type="button"
                    className="text-lime-400 hover:underline"
                    onClick={handleStartEditor}
                  >
                    utilize apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}

            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecord}
                className="w-full flex items-center justify-center gap-2 disabled:bg-slate-600 bg-slate-900 py-3 text-center text-sm text-slate-300 font-bold outline-none hover:text-slate-100 cursor-pointer" >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando audio (Parar reprodução)
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type="button"
                disabled={!content}
                className="w-full disabled:bg-lime-600 bg-lime-400 py-3 text-center text-sm text-lime-950 font-bold outline-none hover:bg-lime-500">
                Salvar nota
              </button>
            )}

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

