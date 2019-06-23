import moment from 'moment'
import { dateFormat, invalidDate, supportedDateFormats } from '../constants'

export function isSubStringPresent (mainString, subString) {
	return mainString && mainString.toLowerCase().indexOf(subString.toLowerCase()) !== -1
}
export function isDateInRange(selectedDate, startDate, endDate) {
	const mSelectedDate = formatDate(selectedDate)
	const mStartDate = formatDate(startDate)
	const mEndDate = formatDate(endDate)
    
	if(mSelectedDate === invalidDate || mStartDate === invalidDate || mEndDate === invalidDate)
		return false

	return  moment(mSelectedDate,dateFormat).isBetween(moment(mStartDate,dateFormat),
		moment(mEndDate,dateFormat),null,[]) 
}

export function formatDate(date) {
	return  moment(date,supportedDateFormats).isValid()
		?  moment(date,supportedDateFormats).format(dateFormat)
		: invalidDate
}

export function generateColumnConfig(config) {
	return Object.keys(config).map((key)=>{
		return {
			dataIndex: key,
			title: config[key],
			key: key
		}
	})
}

