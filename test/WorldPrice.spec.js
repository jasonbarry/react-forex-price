import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import './setup';

import WorldPrice from '../src/WorldPrice';

describe('<WorldPrice />', () => {
  describe('Default props', () => {
    it('only amount passed in', () => {
      const instance = <WorldPrice amount={123} />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('$123');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('amount and baseCurrency', () => {
      const instance = <WorldPrice amount={123} baseCurrency="USD" />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('$123');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('amount and displayCurrency', () => {
      const instance = <WorldPrice amount={123} displayCurrency="EUR" />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('€123');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });
  describe('Invalid inputs', () => {
    it('null amount returns empty string', () => {
      const instance = <WorldPrice amount={null} />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('undefined amount returns empty string', () => {
      const instance = <WorldPrice amount={undefined} />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('string returns original string', () => {
      const instance = <WorldPrice amount={'hello'} />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('hello');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('unsupported base currency returns original amount', () => {
      const instance = <WorldPrice amount={987.234} baseCurrency="" />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('987.234');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('unsupported display currency returns original amount', () => {
      const instance = <WorldPrice amount={987.234} displayCurrency="" />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('987.234');
      expect(rendered.toJSON()).toMatchSnapshot();
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
