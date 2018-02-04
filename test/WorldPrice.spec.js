import React from 'react';
import { shallow } from 'enzyme';
import './setup';

import WorldPrice from '../src/WorldPrice';

describe('<WorldPrice />', () => {
  describe('Conversions', () => {
    it('only amount passed in', () => {
      const wrapper = shallow(<WorldPrice amount={123} />);
      expect(wrapper.text()).toEqual('$123');
    });
    it('amount and baseCurrency', () => {
      const wrapper = shallow(<WorldPrice amount={123} baseCurrency="USD" />);
      expect(wrapper.text()).toEqual('$123');
    });
    it('amount and displayCurrency', () => {
      const wrapper = shallow(<WorldPrice amount={123} displayCurrency="EUR" />);
      expect(wrapper.text()).toEqual('€123');
    });
  });
  describe('Rounding', () => {
    it('no rounding prop passed in', () => {
      const wrapper = shallow(<WorldPrice amount={8675.309} />);
      expect(wrapper.text()).toEqual('$8,675.31');
    });
    it('rounding up', () => {
      const wrapper = shallow(<WorldPrice amount={8675.309} rounding={Math.ceil} />);
      expect(wrapper.text()).toEqual('$8,675.31');
    });
    it('rounding down', () => {
      const wrapper = shallow(<WorldPrice amount={8675.309} rounding={Math.floor} />);
      expect(wrapper.text()).toEqual('$8,675.30');
    });
    it('rounding up with hideCents', () => {
      const wrapper = shallow(<WorldPrice amount={8675.309} rounding={Math.ceil} hideCents />);
      expect(wrapper.text()).toEqual('$8,676');
    });
    it('rounding down with hideCents', () => {
      const wrapper = shallow(<WorldPrice amount={8675.309} rounding={Math.floor} hideCents />);
      expect(wrapper.text()).toEqual('$8,675');
    });
  });
});
