import React from 'react'
import moment from 'moment'
import DateRange from '../DateRange'
import { render, cleanup } from '@testing-library/react'
import { dateFormat } from '../../constants'
const handleRangeChange = jest.fn().mockImplementation(()=>{})

describe('Date Range component',() => {
	afterEach(cleanup)
	it('should render the Date Range component without crashing ',() => {
		const { asFragment } = render(<DateRange handleRangeChange={handleRangeChange} selectedRange={{startValue:  moment('06/23/2019',dateFormat), endValue: null}} />)
		expect(asFragment()).toMatchSnapshot()
	})
})