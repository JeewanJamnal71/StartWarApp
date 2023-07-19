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
  it('should open the modal when a card is pressed', () => {
    const setModalVisible = jest.fn();
    const { getByTestId } = render(
      <CardComponent item={PersonMockData} onSelectItem={setModalVisible} />
    );
    const card = getByTestId('card-component');
    fireEvent.press(card);
    expect(setModalVisible).toHaveBeenCalled();
  });

  it('should display the correct person information in the modal', () => {
    const modalVisible = true;
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
    // expect(getByText('Desert')).toBeTruthy();
    // expect(getByText('Arid')).toBeTruthy();
    // Add more expect statements to check other person information as needed
  });
});

