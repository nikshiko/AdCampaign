import React from 'react';
import RenderHeaderComponent from '../Header';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
  } from '@testing-library/react'
import campaignListMock from '../__mocks__/index.mock';

describe('Header component',() => {
  
    it('should render a select component',() => {
       const { asFragment } = render(<RenderHeaderComponent campaignList={campaignListMock} />);
        expect(asFragment()).toMatchSnapshot();
    })
})