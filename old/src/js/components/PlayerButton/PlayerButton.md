## Play button, enabled, not standalone

    const onPlay = () => {
      document.getElementById('notStandaloneButtonConsole').innerText = `I'm playing`;
    };

    const onStop = () => {
      document.getElementById('notStandaloneButtonConsole').innerText = `I'm stopped`;
    };

    const onReplay = () => {
      document.getElementById('notStandaloneButtonConsole').innerText = `I'm re-playing`;
    };

    (
    <div>
      <PlayerButton
        testValid
        isPlaying={false}
        isStandalone={false}
        onPlay={onPlay}
        onStop={onStop}
        onReplay={onReplay}
      />

      <div id="notStandaloneButtonConsole">I'm in initial state</div>
    </div>
    )

## Play button, enabled

    const onPlay = () => {
      document.getElementById('standaloneButtonConsole').innerText = `I'm playing`;
    };

    const onStop = () => {
      document.getElementById('standaloneButtonConsole').innerText = `I'm stopped`;
    };

    const onReplay = () => {
      document.getElementById('standaloneButtonConsole').innerText = `I'm re-playing`;
    };

    (
    <div>
      <PlayerButton
        testValid
        isReplayable
        onPlay={onPlay}
        onStop={onStop}
        onReplay={onReplay}
      />

      <div id="standaloneButtonConsole">I'm in initial state</div>
    </div>
    )

## Stop button, enabled

    (
    <div>
      <PlayerButton
        testValid
        isPlaying
        isStoppable
        isReplayable
      />
    </div>
    )

## Replay button, enabled

    (
    <div>
      <PlayerButton
        testValid
        isPlaying
        isStopped
        isReplayable
      />
    </div>
    )

## Play button, disabled

    (
    <div>
      <PlayerButton
        testValid={false}
        isPlaying={false}
        isStoppable={false}
        errors={[`Can't start`]}
      />

      <div id="disabledButtonConsole">I'm in disabled state and won't react for any clicks</div>
    </div>
    )

## Stop button, disabled

    (
    <div>
      <PlayerButton
        testValid
        isPlaying
        isStoppable={false}
        errors={[`Can't stop`]}
      />
    </div>
    )

## Replay button, disabled

    (
    <div>
      <PlayerButton
        testValid
        isStopped
        isStoppable={false}
        isReplayable={false}
        errors={[`Can't replay`]}
      />
    </div>
    )
