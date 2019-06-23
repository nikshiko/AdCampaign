import React from 'react'
import { render } from '@testing-library/react'
import { toMatchDiffSnapshot } from 'snapshot-diff'

expect.extend({ toMatchDiffSnapshot })
import Status from '../Status'

describe('Status component',() => {
	it('should render the active and inactive status without crashing',() => {
		const { asFragment } = render(<Status startDate="06/20/2018" endDate="07/24/2019" />)
		const firstRender = asFragment()
		const { asFragment: newFragment } = render(<Status startDate="06/20/2018" endDate="06/21/2019" />)
		expect(newFragment()).toMatchDiffSnapshot(firstRender)
	})
})