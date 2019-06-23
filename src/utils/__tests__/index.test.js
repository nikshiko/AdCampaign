import moment from 'moment'
import { generateColumnConfig, isDateInRange, isSubStringPresent } from '../index'
import columnConfig, {dateFormat} from '../../constants'
describe('utils', () => {
	test('generateColumnConfig should return the correct config',() => {
		const generatedConfig = generateColumnConfig(columnConfig)
		expect(generatedConfig).toMatchSnapshot()
	})

	test('inDateRange should return true if a given date is in the specified range',() => {
        const isInRange = isDateInRange('06-23-2019','06/22/2019','06/30/2020')
        expect(isInRange).toBeTruthy()

	})

	test('inDateRange should return false if a given date is in the specified range',() => {
		const isInRange = isDateInRange(moment().format(dateFormat),'06/21/2019','06/21/2019')
		expect(isInRange).toBeFalsy()
	})

	test('inDateRange should return false if the selected date is in the invalid format',() => {
		const isInRange = isDateInRange('12','06/21/2019','06/23/2019')
		expect(isInRange).toBeFalsy()
	})

	test('isSubStringPresent should return truthy in case the substring is present in the main string',() => {
		expect(isSubStringPresent('Sample','sa')).toBeTruthy()
		expect(isSubStringPresent('sample','z')).toBeFalsy()
	})
})