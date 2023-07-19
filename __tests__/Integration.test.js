/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import CardComponent from '../src/components/CardComponent/CardComponent';
import ModalComponent from '../src/components/ModalComponent/ModalComponent';
import { PersonMockData, HomeworldMockData } from './MockData';

describe('Integration Test', () => {
  it('should open the modal with the correct person information when a card is pressed', () => {
    // Sample data for testing

    // Mock the function that sets the modal visibility state
    const setModalVisible = jest.fn();

    // Render the CardComponent with the test data
    const { getByTestId } = render(
      <CardComponent item={PersonMockData} onSelectItem={setModalVisible} />
    );

    // Find the card and simulate a press on it
    const card = getByTestId('card-component');
    fireEvent.press(card);

    // Check if the function to set the modal visibility state was called with the correct data
    expect(setModalVisible).toHaveBeenCalledWith(true);
  });

  it('should display the correct person information in the modal', () => {
    // Sample data for testing
    const modalVisible = true;

    // Render the ModalComponent with the test data
    const { getByText } = render(
      <ModalComponent
        data={PersonMockData}
        homeData={HomeworldMockData}
        modalVisible={modalVisible}
        onClose={() => {}}
        loading={false}
        error={null}
      />
    );

    // Check if the correct person information is displayed in the modal
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('172m')).toBeTruthy();
    expect(getByText('77kg')).toBeTruthy();
    // Add more expect statements to check other person information as needed
  });
});

