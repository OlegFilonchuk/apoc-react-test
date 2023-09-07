import React from 'react';
import { mount } from 'enzyme';

import ProgressStatus from './ProgressStatus';
import ProgressStatusStage, { STAGE_STATUS } from './ProgressStatusStage';
import Progressbar from '../Progressbar/Progressbar';

describe('<ProgressStatus />', () => {
  it('renders ProgressStatus component', () => {
    // arrange
    const progress = 30;

    // act
    const component = mount(
      <ProgressStatus progress={progress} progressLabel="some file.txt">
        <ProgressStatusStage title="Importing File" />
        <ProgressStatusStage title="Converting To Scenario" />
        <ProgressStatusStage title="Reloading the view" />
      </ProgressStatus>
    );

    // assert
    expect(component).toMatchSnapshot();
  });

  it('renders Progressbar inside ProgressStatus with correct percentage', () => {
    // arrange
    const progress = 30;

    // act
    const component = mount(
      <ProgressStatus progress={progress} progressLabel="some file.txt">
        <ProgressStatusStage title="Importing File" />
        <ProgressStatusStage title="Converting To Scenario" />
        <ProgressStatusStage title="Reloading the view" />
      </ProgressStatus>
    );

    // assert
    expect(component.find(Progressbar).props().percentage).toEqual(30);
  });

  it('renders ProgressStatusStage right number of child components', () => {
    // arrange
    const progress = 30;

    // act
    const component = mount(
      <ProgressStatus progress={progress} progressLabel="some file.txt">
        <ProgressStatusStage title="Importing File" />
        <ProgressStatusStage title="Converting To Scenario" />
        <ProgressStatusStage title="Reloading the view" />
      </ProgressStatus>
    );

    // assert
    expect(component.find(ProgressStatusStage).length).toEqual(3);
  });

  it('renders ProgressStatusStage right number of child components #2', () => {
    // arrange
    const progress = 30;

    // act
    const component = mount(
      <ProgressStatus progress={progress} progressLabel="some file.txt">
        <ProgressStatusStage title="Importing File" />
        <ProgressStatusStage title="Converting To Scenario" />
      </ProgressStatus>
    );

    // assert
    expect(component.find(ProgressStatusStage).length).toEqual(2);
  });

  it('renders ProgressStatusStage child components in correct status value', () => {
    // arrange
    const progress = 60;

    // act
    const component = mount(
      <ProgressStatus progress={progress} progressLabel="some file.txt">
        <ProgressStatusStage title="Importing File" />
        <ProgressStatusStage title="Converting To Scenario" />
        <ProgressStatusStage title="Reloading the view" />
      </ProgressStatus>
    );

    // assert
    expect(
      component
        .find(ProgressStatusStage)
        .at(0)
        .props().status
    ).toEqual(STAGE_STATUS.FINISHED);
    expect(
      component
        .find(ProgressStatusStage)
        .at(1)
        .props().status
    ).toEqual(STAGE_STATUS.INPROGRESS);
    expect(
      component
        .find(ProgressStatusStage)
        .at(2)
        .props().status
    ).toEqual(STAGE_STATUS.WAITING);
  });
});
