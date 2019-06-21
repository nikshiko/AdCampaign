import React from 'react'
import RenderHeaderComponent from '../Header'
import {
	render,
} from '@testing-library/react'
import campaignListMock from '../__mocks__/index.mock'

const noOp = () => {};
describe('Header component',() => {
  
	it('should render a select component',() => {
		const { asFragment } = render(<RenderHeaderComponent campaignList={campaignListMock} onChange={noOp} />)
		expect(asFragment()).toMatchSnapshot()
	})
})