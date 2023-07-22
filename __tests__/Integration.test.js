import 'react-native';
import React from 'react';
import {it} from '@jest/globals';
import { render, fireEvent, act } from '@testing-library/react-native';
import CardComponent from '../src/components/CardComponent/CardComponent';
import ModalComponent from '../src/components/ModalComponent/ModalComponent';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

describe('Integration Test', () => {
  it('should open the modal when a card is pressed', () => {
    // dummy data
    const PersonMockData = {
      name: 'John Doe',
      height: 1.72,
      mass: '77',
      createdDate: '2023-07-19T12:34:56.000Z',
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
      dob: '19BBY',
      picture: 'https://example.com/john-doe.jpg',
      cardColor: '#111',
      speciesId: 1,
      filmsLength: 2,
      homeworld: 'https://swapi.dev/api/planets/28/',
      gender: 'male'
    };
    const setModalVisible = jest.fn();
    const { getByTestId } = render(
      <CardComponent item={PersonMockData} onSelectItem={setModalVisible} />
    );
    const card = getByTestId('card-component');
    fireEvent.press(card);
    expect(setModalVisible).toHaveBeenCalled();
  });

  it('should display the correct person information in the modal', async() => {
    
    // dummy data
    const PersonMockData = {
      name: 'John Doe',
      height: 1.72,
      mass: '77',
      createdDate: '2023-07-19T12:34:56.000Z',
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
      dob: '19BBY',
      image: 'https://picsum.photos/300/400',
      filmsLength: 2,
      gender: 'male'
    };

    const HomeworldMockData = {
      name: 'Tatooine',
      terrain: 'Desert',
      climate: 'Arid',
      residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
    };

    const modalVisible = true;

    const { getByText, getByTestId } = render(
      <ModalComponent
        data={PersonMockData}
        homeData={HomeworldMockData}
        modalVisible={modalVisible}
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
    expect(getByText('19BBY')).toBeTruthy();

    // Created
    expect(getByText('Created')).toBeTruthy();
    expect(getByText('19-07-2023')).toBeTruthy();
    
    const homelandOption = getByText('Homeland');
    act(() => {
      fireEvent.press(homelandOption);
    })

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

  });

});

