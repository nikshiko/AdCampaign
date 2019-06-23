import moment from 'moment'
import { dateFormat } from '../constants'

export function isSubStringPresent (mainString, subString) {
	return mainString && mainString.toLowerCase().indexOf(subString.toLowerCase()) !== -1
}
export function isDateInRange(selectedDate, startDate, endDate) {
	const mSelectedDate = moment(selectedDate,dateFormat)
	if(!mSelectedDate.isValid()) return false
	const mStartDate = moment(startDate,dateFormat)
	const mEndDate = moment(endDate,dateFormat)

	return mSelectedDate.isBetween(mStartDate,
		mEndDate,null,[])
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
    