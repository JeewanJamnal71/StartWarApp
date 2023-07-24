import 'react-native';
import React from 'react';
import {it} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import CardComponent from '../src/components/CardComponent/CardComponent';
import ModalComponent from '../src/components/ModalComponent/ModalComponent';
import { personMockData, homeworldMockData } from '../__mocks__/mockData';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

describe('Integration Test', () => {
  it('should open the modal when a card is pressed', () => {
   
    const setModalVisible = jest.fn();
    const { getByTestId } = render(
      <CardComponent item={personMockData} onSelectItem={setModalVisible} />
    );
    const card = getByTestId('card-component');
    fireEvent.press(card);
    expect(setModalVisible).toHaveBeenCalled();
    
  });

  it('should display the correct person information in the modal', async() => {
  
    const { getByText, getByTestId } = render(
      <ModalComponent
        data={personMockData}
        homeData={homeworldMockData}
        modalVisible={true}
        onClose={() => {}}
        loading={false}
        error={null}
      />
    );

    // Get the initial text content (expect "Value is hidden")
    const isAboutTabTextSelected = getByText('Films');
    expect(isAboutTabTextSelected).toBeTruthy();
    
    const modalImageComponent = getByTestId('profile-image');

    // Basic Info
    expect(modalImageComponent.props.source.uri).toEqual('https://picsum.photos/300/400');
    expect(getByText('John Doe')).toBeTruthy();

    // Weight
    expect(getByText('Weight')).toBeTruthy();
    expect(getByText('77 kg')).toBeTruthy();

    // Height
    expect(getByText('Height')).toBeTruthy();
    expect(getByText('1.72 m')).toBeTruthy();

    // Gender
    expect(getByText('Gender')).toBeTruthy();
    expect(getByText('male')).toBeTruthy();

    // Films
    expect(getByText('Films')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();

    // DOB
    expect(getByText('DOB')).toBeTruthy();
    expect(getByText('01-01-0020')).toBeTruthy();

    // Created
    expect(getByText('Created')).toBeTruthy();
    expect(getByText('19-07-2023')).toBeTruthy();
    
    const homelandOption = getByText('Homeland');
    fireEvent.press(homelandOption);

    // HomeLand Info

    // Name
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Tatooine')).toBeTruthy();

    // Terrain
    expect(getByText('Terrain')).toBeTruthy();
    expect(getByText('Desert')).toBeTruthy();

    //Climate
    expect(getByText('Climate')).toBeTruthy();
    expect(getByText('Arid')).toBeTruthy();

    //Number of residents
    expect(getByText('Residents')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();

  });

});

