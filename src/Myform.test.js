import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MyForm from './MyForm'
 
describe('Myform', () => {
  it('renders text including the word wellable', () => {
    render(<MyForm />)
 
    const linkElement = screen.getAllByText(/wellable/i);
    expect(linkElement[0]).toBeInTheDocument();
 
  })
})
