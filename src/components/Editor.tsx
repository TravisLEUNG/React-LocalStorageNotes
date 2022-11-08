import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

type Note = {
    body: string;
};
type CallBackFunc = (text: string) => void;
type MdeSelectedTabType = "write" | "preview" | undefined;

export default function Editor(props: {
    currentNote: Note;
    onClickAction: CallBackFunc;
}) {
    const [selectedTab, setSelectedTab] =
        React.useState<MdeSelectedTabType>("write");
    const [readonly, setReadonly] = React.useState<boolean>(false);

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    });

    return (
        <section id="Editor">
            <ReactMde
                value={props.currentNote.body!}
                onChange={props.onClickAction}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    );
}
