import { Table } from 'antd';
import propTypes from './propTypes';

function RenderCampaignList(list) {  
    const dataSource = {};
    const columns = {};
  return (
    <Table dataSource={dataSource} columns={columns}>
    </Table>
   )
}

RenderCampaignList.propTypes = propTypes;

RenderCampaignList.defaultProps = {
    campaignList: []
}