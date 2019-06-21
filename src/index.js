import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import moment from 'moment';
import 'antd/dist/antd.css'
import mock from './components/__mocks__/index.mock'

import RenderHeaderComponent from './components/Header'
import RenderCampaignList from './components/Table'

var campaigns = [];
const Layout = styled.div`
  max-width: 1560px
  position: relative;
  margin: 10em;
  padding: 1em;
  border: 0.2em solid black;
`


function App ({campaignList}) {
	const [state, updateState] = useState({
		dateRange: [],
		searchValue: ''
	});

	const handleOnChange = ({ field, value }) => {
		let updatedState = {...state};
     	switch(field){
		 	case 'search': 
			  updatedState.searchValue = value
			  break 
			case 'dateRange': {
			  updatedState.dateRange = value
			}
			 break

			default:
			 //no default 
			  
		 }
		 updateState(updatedState);
	}

	return (
		<Layout>
			<RenderHeaderComponent campaignList={campaignList} onChange={handleOnChange} />
			<RenderCampaignList campaignList={campaignList} filters={state} />
		</Layout>
	)
}




window.AddCampaigns = (moreCampaigns=[]) => {
   campaigns = [...campaigns, ...moreCampaigns.length ? moreCampaigns: []];
   console.log(campaigns);
   ReactDOM.render(
	<App campaignList={campaigns} />,
	document.getElementById('root')
)
}

 ReactDOM.render(
	<App campaignList={campaigns} />,
	document.getElementById('root'))





