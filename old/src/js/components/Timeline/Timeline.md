## Timeline

Timeline component sample

    const chartWidth = 800;

    (
    <div>
        <Timeline duration={3600} />
    </div>
    )

Timeline component with scaled width

      const chartWidth = 400;

      (
      <div>
          <Timeline duration={3600} chartWidth={chartWidth}/>
      </div>
      )

Timeline component with custom periods

      (
      <div>
          <Timeline duration={3600} periods={10}/>
      </div>
      )

Timeline component with points

    const steps = {
      delay: 0,
      rampup: 60,
      rampdown: 400,
      downtime: 600
    };

    (
    <div>
        <Timeline duration={3600} points={steps} periods={10} chartWidth={800}/>
    </div>
    )
