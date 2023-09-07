## SchedulePicker component sample - weekly

    const schedule = {
      id: '1234',
      period: 'weekly',
      days:['monday', 'friday'],
      startTime:{
        timeValue: '01:25',
        pmSelected: true,
      },
      stopTimeEnabled: true,
      stopTime:{
        timeValue: '16:00',
        pmSelected: true
      },
      createdAt: new Date(),
      author:{
        name: 'John Smiths',
        abbreviated: 'John S'
      }
    }

    const isDuplicated = false;

    const initialState = {
      schedule
    }
    const handleWeeklyOnChange = (feedback) => setState({schedule: feedback});


    <div>
      <SchedulePicker schedule={state.schedule} isDuplicated={isDuplicated} onChange={handleWeeklyOnChange} />
    </div>

## SchedulePicker component sample - monthly

    const schedule = {
      id : '343434',
      period: 'monthly',
      on:'day',
      dayNumber: 5,
      startTime:{
        timeValue: '01:25',
        pmSelected: true
      },
      stopTimeEnabled: true,
      stopTime:{
        timeValue: '16:00',
        pmSelected: true
      },
      createdAt: new Date(),
      author:{
        name: 'John Smiths',
        abbreviated: 'John S'
      }
    }

    const isDuplicated = false;

    const initialState = {
      schedule
    }
    const handleMonthlyOnChange = (feedback) => setState({schedule: feedback});


    <div>
      <SchedulePicker schedule={state.schedule} isDuplicated={isDuplicated} onChange={handleMonthlyOnChange} />
    </div>

## SchedulePicker with duplicated warning

    const schedule = {
      id: '12345678',
      period: 'weekly',
      days:['monday', 'friday'],
      startTime:{
        timeValue: '01:25',
        pmSelected: true
      },
      stopTimeEnabled: true,
      stopTime:{
        timeValue: '16:00',
        pmSelected: true
      },
      createdAt: new Date(),
      author:{
        name: 'John Smiths',
        abbreviated: 'John S'
      }
    }

    const isDuplicated = true;

    const initialState = {
      schedule
    };
    const handleDuplicateChange = feedback => setState({schedule: feedback});

    <div>
      <SchedulePicker schedule={state.schedule} isDuplicated={isDuplicated} onChange={handleDuplicateChange} />
    </div>
