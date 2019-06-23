import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import moment from 'moment'

import Status from './Status'
import config,{ currency } from '../constants'
import { generateColumnConfig ,isDateInRange , isSubStringPresent } from '../utils'

/**
 * 
 * @param {Array} list - An array of campaign details
 * @param {Object} filters - startValue, endValue and searchValue are the possible filters
 * 
 * @returns {Array} which contains objects that have a structure specific to the antd Table
 *   if, 
 *     filters are present, the filtered list is returned
 *   else 
 *    entire list is returned
 * 
 * @description A method to generate the data required by the table, with and without filters
 */
export const generateTableData = (list=[], filters={}) => {
	const { searchValue, startValue, endValue } = filters || {}
	const initialValue = {
		tableList: [],
		filteredList: []
	}
	const { tableList, filteredList } =  list.reduce((acc,item,key) => {
		let {tableList, filteredList} = acc
		const { id='-', name= '-', startDate= '-', endDate= '-' ,Budget= '-' } = item || {}
		const rowItem = {
			key: `${key}_id`,
			name, 
			startDate,
			endDate,
			active: <Status key={id} startDate={startDate} endDate={endDate} />,
			Budget: `${Budget } ${currency}`
		}
		
		/**
		 * checks for filters when the date range and search value both are present
		 */
		if( searchValue && (startValue || endValue)) {
			if(isSubStringPresent(name, searchValue) && 
			isInRange([startValue,endValue],[startDate,endDate])) {
				filteredList.push(rowItem)
				return { tableList: [], filteredList }
			}
			return { tableList: [], filteredList: [] }
		}

		/**
		 * checks for filters when searchValue is present, 
		 * this is when the date range is not present
		 */
		if(searchValue && isSubStringPresent(name, searchValue)) {
			filteredList.push(rowItem)
			return { tableList:[], filteredList }
		}
		
		/**
		 *  checks for filters when range of startValue and/or endValue is present,
		 * this is when no search value is present
		 */

		if((startValue || endValue) && isInRange([startValue,endValue], [startDate,endDate])){		
			filteredList.push(rowItem)
			return { tableList: [], filteredList }
		}
		tableList.push(rowItem)
		return { tableList, filteredList }
	}, 
	initialValue)
	
	return startValue || endValue || searchValue ? filteredList: tableList
}

/**
 * 
 * @param {Array} selectedRange - An array containing the selected start date and the selected end date
 * @param {Array} itemRange - An array containing the start date and the end date of a given campaign
 * 
 * @returns - a boolean, signifying if the campaign is in within the range of selected dates
 * 
 * @description - A method to check if the campaign is in the range selected
 */
const isInRange= (selectedRange, itemRange) => {
	const [selectedStartDate, selectedEndDate]= selectedRange
	const [itemStartDate, itemEndDate] = itemRange

	/**
	 * Check if both start date and end date have been selected 
	 */
	if(selectedStartDate && selectedEndDate) {
		if(isDateInRange(itemStartDate,selectedStartDate,selectedEndDate) &&
			isDateInRange(itemEndDate,selectedStartDate,selectedEndDate)) {
			return true
		}
		return false
	}

	/**
	 * In case any one of them is selected, return if the item is in range
	 */

	if(selectedStartDate && moment(itemEndDate).isSameOrAfter(selectedStartDate)) {
		return true
	}

	if(selectedEndDate && moment(itemEndDate).isSameOrBefore(selectedEndDate)) {
		return true
	}

	return false
}

/**
 * CampaignList is a component that renders a list of campaigns in a tabular 
 *  format
 * 
 * Usage:
 * 
 * <CampaignList
 *    list=[] 
 *    filters={{startValue: '28/12/2001', endValue: '20/11/2002', searchValue}} />
 */

export default function CampaignList({ list, filters}) {
	const dataSource = generateTableData(list, filters)
	const columns = generateColumnConfig(config)
	return <Table dataSource={dataSource} columns={columns} pagination={false} />
}


CampaignList.defaultProps = {
	list: [],
	startValue: '',
	endValue: ''
}


CampaignList.propTypes = {
	/**
	 * A list of campaigns details passed in the specified shape
	*/
	list: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		budget: PropTypes.number
	})),

	/**
	 * Filters that apply on the campaign list. 
	 *   1. startValue is of Moment type 
	 *   2. endValue is of Moment type
	 *   3. searchValue is any value that is typed in the search input
	 */
	filters: PropTypes.shape({
		startValue: PropTypes.object,
		endValue: PropTypes.object,
		searchValue: PropTypes.string
	})
}
