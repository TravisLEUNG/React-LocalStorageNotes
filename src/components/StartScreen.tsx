type CallBackFunc = () => void;

export default function StartScreen(props: { onClickAction: CallBackFunc }) {
    return (
        <div id="StartScreen">
            <h1>Welcome!</h1>
            <h2>You have no notes</h2>
            <button onClick={props.onClickAction}>
                Create one now
            </button>
        </div>
    )
}