import { RxCross1 } from "react-icons/rx";

type Note = {
    id: string;
    body: string;
};
type CreateNoteFunc = () => void;
type DeleteNoteFunc = (id: string) => void;
type SelectNoteFunc = (id: string) => void;

export default function Sidebar(props: {
    notes: Note[];
    currentNote: Note;
    newNote: CreateNoteFunc;
    deleteNote: DeleteNoteFunc;
    setCurrentNoteId: SelectNoteFunc;
}) {
    const newNoteTemplate = (
        id: string,
        order: number,
        title: string,
        selected: boolean
    ) => {
        return (
            <div key={id}>
                <div
                    className={`title ${selected ? "selected-note" : ""}`}
                    onClick={() => props.setCurrentNoteId(id)}
                >
                    <div className="text-snippet">📋 {title || "New Note"}</div>
                    <RxCross1
                        className="delete-btn"
                        onClick={(event) => {
                            event.stopPropagation()
                            props.deleteNote(id)
                        }}
                    />
                </div>
            </div>
        );
    };

    const noteElements = props.notes.map((note, index) =>
        newNoteTemplate(note.id, index, note.body, note.id === props.currentNote.id)
    );

    return (
        <section id="Sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="add--btn" onClick={props.newNote}>
                    +
                </button>
            </div>
            <div className="sidebar--notes">{noteElements}</div>
        </section>
    );
}
