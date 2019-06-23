import React from 'react'
import Header from '../Header'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { placeholders } from '../../constants'
const onChange = jest.fn().mockImplementation(()=>{})

describe('Header component',() => {
	afterEach(cleanup)
	it('should render without crashing',() => {
		const { asFragment } = render(<Header onChange={onChange} />)
		expect(asFragment()).toMatchSnapshot()
	})

	it('should trigger the onChange function when user searches for a campaign name ',() => {
		const { getByPlaceholderText } = render(<Header onChange={onChange} />)
		fireEvent.change(getByPlaceholderText(placeholders.searchText), { target: { value: 'a' } })
		expect(onChange).toHaveBeenCalledWith({'field': 'search', 'value': 'a'})
	})
})