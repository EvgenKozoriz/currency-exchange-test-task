import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyConverter from '../components/currency-converter/CurrencyConverter';

test('renders CurrencyConverter with initial values', () => {
  render(<CurrencyConverter />);

  expect(screen.getByLabelText('Change')).toBeInTheDocument();
  expect(screen.getByLabelText('From')).toBeInTheDocument();
  expect(screen.getByLabelText('Get')).toBeInTheDocument();
  expect(screen.getByLabelText('To')).toBeInTheDocument();

  expect(screen.getByText('UAH')).toBeInTheDocument();
  expect(screen.getByText('CZK')).toBeInTheDocument();

});

test('handles input change and conversion', () => {
  render(<CurrencyConverter />);

  fireEvent.change(screen.getByLabelText('Change'), { target: { value: 50 } });
  expect(screen.getByLabelText('Change')).toHaveValue(50);


  fireEvent.change(screen.getByLabelText('Change'), { target: { value: '111' } });
  expect(screen.getByLabelText('Change')).toHaveValue(111);

  fireEvent.change(screen.getByLabelText('Get'), { target: { value: 33 } });
  expect(screen.getByLabelText('Get')).toHaveValue(33); 

  fireEvent.change(screen.getByLabelText('Get'), { target: { value: '43' } });
  expect(screen.getByLabelText('Get')).toHaveValue(43); 
});