type Note = {
    id: string;
    body: string;
};
type CreateNoteFunc = () => void;
type SelectNoteFunc = (id: string) => void;

export default function Sidebar(props: {
    notes: Note[];
    currentNote: Note;
    newNote: CreateNoteFunc;
    setCurrentNoteId: SelectNoteFunc;
}) {

    const newNoteTemplate = (id: string, order: number, selected: boolean) => (
        <div key={id}>
            <div
                className={`title ${selected ? "selected-note" : ""
                    }`}
                onClick={() => props.setCurrentNoteId(id)}
            >
                <h4 className="text-snippet">Note {order + 1}</h4>
            </div>
        </div>
    )

    const noteElements = props.notes.map((note, index) => newNoteTemplate(note.id, index, note.id === props.currentNote.id));

    return (
        <section id="Sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="add--btn" onClick={props.newNote}>
                    +
                </button>
            </div>
            <div className="sidebar--notes">
                {noteElements}
            </div>
        </section>
    );
}
