## SchedulePickerGroup component sample

    const schedules = [
      {
        id: '234',
        period: 'monthly',
        on: 'day',
        dayNumber: 5,
        startTime: {
          timeValue: '01:25',
          pmSelected: true
        },
        stopTimeEnabled: true,
        stopTime: {
          timeValue: '16:00',
          pmSelected: true
        },
        createdAt: new Date(),
        author: {
          name: 'John Smiths',
          abbreviated: 'John S'
        }
      },
      {
        id: '567',
        period: 'weekly',
        days: ['monday', 'friday'],
        startTime: {
          timeValue: '01:25',
          pmSelected: true
        },
        stopTimeEnabled: true,
        stopTime: {
          timeValue: '16:00',
          pmSelected: true
        },
        createdAt: new Date(),
        author: {
          name: 'John Smiths',
          abbreviated: 'John S'
        }
      }
    ];

      (
        <div>
          <SchedulePickerGroup schedules={schedules} onChange={(feedback)=>console.log(`${feedback} group feedback`)} />
          <p>Check console for onChange feedback</p>
        </div>
      )
