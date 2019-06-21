import React from 'react'
import PropTypes from 'prop-types';
import { Table, Icon } from 'antd'
import moment from 'moment';

import propTypes from './propTypes'
import constants,{ active, inactive } from './constants'

const generateColumnConfig = () => {
	return Object.keys(constants).map((key)=>{
		return {
			dataIndex: key,
			title: constants[key],
			key: key
		}
	})
}

const getStatus = (startDate,endDate)  => {
    let status = inactive;
  if(moment().isBetween(moment(startDate,'DD/MM/YYYY'),moment(endDate,'DD/MM/YYYY'),null,[])){
      status= active;
  }

 

  return (
   <span>
      <Icon type={status !== active ? "minus-circle": "check-circle"} style={{color: status !== active? '#ff0000' : '#008000'}}/>
      {`\u00A0${status}`}
  </span>
  )  
}

const generateTableData = (list=[],filters) => {
    const { dateRange, searchValue } = filters;
    
	return list.map((item,index) => {
		return {
			key: item.id,
			name: item.name, 
			startDate: item.startDate,
            endDate: item.endDate ,
            active: getStatus(item.startDate,item.endDate),
            Budget: `${item.Budget} USD`
		}
	})
}

const isInRange= (selectedRange, itemRange) => {
const [selectedStartDate, selectedEndDate]= selectedRange;
const [itemStartDate, itemEndDate] = itemRange;
 if(moment(itemStartDate).isBetween(selectedStartDate,selectedEndDate,null,[]) && 
    moment(itemEndDate).isBetween(selectedStartDate,selectedEndDate,null,[])) {
        return true
    }
   return false;
}

const getFilteredData = (data,filters) => {
  const { searchValue, dateRange } = filters;
  if(searchValue && dateRange.length ) {
     return data.filter(item => {
          if(item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 && isInRange(dateRange,[item.startDate,item.endDate])){
               return item;
             }
            })
    }

    if(searchValue) {
        return data.filter(item => {
            if(item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1){
                 return item;
               }
              })
    }

    if(dateRange.length){
        return data.filter(item => {
            if(isInRange(dateRange,[item.startDate,item.endDate])){
                 return item;
               }
              })
    }
    
}

function RenderCampaignList(props) {  
    const { campaignList, filters } = props;
    const { dateRange , searchValue } = filters;
    const dataSource = generateTableData(campaignList,filters)
    const filteredData = (dateRange.length || searchValue) ? getFilteredData(dataSource, filters) : dataSource;
	const columns = generateColumnConfig()
	return (
		<Table dataSource={filteredData} columns={columns} pagination={false}/>
	)
}

RenderCampaignList.propTypes = {
    ...propTypes,
        filters: PropTypes.shape({
        dateRange: PropTypes.array,
        searchValue: PropTypes.string
    })
}

RenderCampaignList.defaultProps = {
    campaignList: [],
    filters: {}
}

export default RenderCampaignList;