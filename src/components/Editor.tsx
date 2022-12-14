import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

type Note = {
    body: string;
};
type CallBackFunc = (text: string) => void;
type MdeSelectedTabType = "write" | "preview" | undefined;

export default function Editor(props: {
    currentNote: Note;
    onClickAction: CallBackFunc;
}) {
    // const [readonly, setReadonly] = useState<boolean>(false);

    return (
        <section id="Editor">
            <MDEditor
                value={props.currentNote.body!}
                onChange={(value) => props.onClickAction(value!)}
                // data-color-mode="dark"
                height="100%"
            />
        </section>
    );
}
