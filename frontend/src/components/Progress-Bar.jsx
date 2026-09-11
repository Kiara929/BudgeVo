import "../css/Progress-Bar.css";

function ProgressBar({ progress = 0 }) {
    return (
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}

export default ProgressBar;