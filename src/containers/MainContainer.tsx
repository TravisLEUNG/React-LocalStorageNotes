import { useEffect, useState } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";

import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import StartScreen from "../components/StartScreen";

type Note = {
    id: string;
    body: string;
};

export default function MainContainer() {
    const [notes, setNotes] = useState<Note[]>((): Note[] => JSON.parse(localStorage.getItem("Notes") || "[]") as Note[] || []);
    const [currentNoteId, setCurrentNoteId] = useState<string>(
        notes[0]?.id || ""
    );

    useEffect(() => {
        localStorage.setItem("Notes", JSON.stringify(notes))
    }, [notes])

    const createNewNote = (): void => {
        const newNote: Note = {
            id: nanoid(),
            body: "# Type your markdown note's title here",
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
        setCurrentNoteId(newNote.id);
    };

    const updateNote = (text: string): void => {
        setNotes((oldNotes) =>
            oldNotes.map((oldNote) => {
                return oldNote.id === currentNoteId
                    ? { ...oldNote, body: text }
                    : oldNote;
            })
        );
    };

    const findCurrentNote = (): Note => {
        return (
            notes.find((note) => {
                return note.id === currentNoteId;
            }) || notes[0]
        );
    };

    return (
        <main>
            {notes.length > 0 ? (
                <Split sizes={[30, 70]} gutterSize={0} direction="horizontal" className="split">
                    <Sidebar
                        notes={notes}
                        currentNote={findCurrentNote()}
                        setCurrentNoteId={setCurrentNoteId}
                        newNote={createNewNote}
                    />
                    {currentNoteId && (
                        <Editor currentNote={findCurrentNote()} onClickAction={updateNote} />
                    )}
                </Split>
            ) : <StartScreen onClickAction={createNewNote} />}
        </main>
    );
}
