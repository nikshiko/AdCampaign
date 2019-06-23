import React from 'react'
import { render } from '@testing-library/react'
import { toMatchDiffSnapshot } from 'snapshot-diff'
import moment from 'moment'
import CampaignList,{ generateTableData } from '../CampaignList'
import mock from '../__mocks__/index.mock'

expect.extend({ toMatchDiffSnapshot })


describe('CampaignList',() => {

	describe('component', ()=> {
		it('renders the list without any filters',() => {
			const { asFragment } = render(<CampaignList list={mock.correctFormat}/>)
			expect(asFragment()).toMatchSnapshot()
		})

		it('renders the list when search is applied',()=> {
			const { asFragment } = render(<CampaignList list={mock.correctFormat} filters={{searchValue: 'd'}} />)
			expect(asFragment()).toMatchSnapshot()
		})
	})

	describe('getTableData',()=>{
		it('returns the data required to be rendered in the table when the date format is incorrect',() => {
			const tableData = generateTableData(mock.incorrectDateFormat)
			expect(tableData).toMatchSnapshot()
		})

		it('returns the data required to be rendered in the table with filters',() => {
			const tableData = generateTableData(mock.correctFormat,{searchValue: 'd'})
			expect(tableData).toMatchSnapshot()
		})

		it('returns the data required to be rendered in the table with start date selected',()=>{
			const tableData = generateTableData(mock.correctFormat,{startValue: moment('06/23/2019')})
			expect(tableData).toMatchSnapshot()
		})

		it('returns the data required to be rendered in the table with end date selected',() => {
			const tableData = generateTableData(mock.correctFormat,{endValue: moment('06/23/2019')})
			expect(tableData).toMatchSnapshot()
		})

		it('returns the data required to be rendered in the table with the range selected',() => {
			const tableData = generateTableData(mock.correctFormat,{startValue:moment('06/23/2017'), endValue: moment('06/23/2019')})
			expect(tableData).toMatchSnapshot()
		})

		it('returns the data required to be rendered in the table with the range selected and the search value',() => {
			const tableData = generateTableData(mock.correctFormat,{startValue:moment('06/23/2017'), endValue: moment('06/23/2019'), searchValue: 'd'})
			expect(tableData).toMatchSnapshot()
		})

		it('does\'t break when the format of the list passed is not correct',() =>{
			const tableData = generateTableData(mock.incorrectCampaignFormat)
			expect(tableData).toMatchSnapshot()
		})
	})
   
})