## Staged progress component
Combines a [Progressbar](#progressbar) and a [ProgressStatusStage](#progressstatusstage) component to display the progress of a long running staged operation.

## ProgressStatus Example

    (
        <ProgressStatus progress={43} progressLabel="my_file.mls">
            <ProgressStatusStage title="Importing File"></ProgressStatusStage>
            <ProgressStatusStage title="Converting To Scenario"></ProgressStatusStage>
        </ProgressStatus>
    )

## ProgressStatus Example with 3 items

    (
        <ProgressStatus progress={65} progressLabel="my_file.mls">
            <ProgressStatusStage title="Importing File"></ProgressStatusStage>
            <ProgressStatusStage title="Converting To Scenario"></ProgressStatusStage>
            <ProgressStatusStage title="Reloading the view"></ProgressStatusStage>
        </ProgressStatus>
    )

..or more

    const changePercentage = () => {
      setState({ progress: Math.floor(Math.random()* 100) });
    };

    (   
        <div>
            <button onClick={() => setState({progress: 0})}>0</button>
            <button onClick={() => setState({progress: 60})}>60</button>
            <button onClick={() => setState({progress: 99})}>99</button>
            <button onClick={() => setState({progress: 100})}>100</button>
            <button onClick={changePercentage}>Random</button>
            <ProgressStatus progress={state.progress} progressLabel="my_file.mls">
                <ProgressStatusStage title="Importing File"></ProgressStatusStage>
                <ProgressStatusStage title="Converting To Scenario"></ProgressStatusStage>
                <ProgressStatusStage title="Loading the Scenario"></ProgressStatusStage>
                <ProgressStatusStage title="Cleanup"></ProgressStatusStage>
                <ProgressStatusStage title="Reloading the view"></ProgressStatusStage>
            </ProgressStatus>
        </div>
    )