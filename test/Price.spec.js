import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import './setup';

import Price from '../src/Price';

describe('<Price />', () => {
  describe('Default props', () => {
    it('only amount passed in', () => {
      const instance = <Price amount={123} />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('$123');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('amount and baseCurrency', () => {
      const instance = <Price amount={123} baseCurrency="USD" />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('$123');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });
  describe('Invalid inputs', () => {
    it('null amount returns empty string', () => {
      const instance = <Price amount={null} />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('undefined amount returns empty string', () => {
      const instance = <Price amount={undefined} />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('string returns original string', () => {
      const instance = <Price amount={'hello'} />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('hello');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('unsupported base currency returns original amount', () => {
      const instance = <Price amount={987.234} baseCurrency="" />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('987.234');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    it('unsupported display currency returns original amount', () => {
      const instance = <Price amount={987.234} displayCurrency="" />;
      const wrapper = shallow(instance);
      const rendered = renderer.create(instance);
      expect(wrapper.text()).toEqual('987.234');
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });
  describe('Rounding', () => {
    it('no rounding prop passed in', () => {
      const wrapper = shallow(<Price amount={8675.309} />);
      expect(wrapper.text()).toEqual('$8,675.31');
    });
    it('rounding up', () => {
      const wrapper = shallow(<Price amount={8675.309} rounding={Math.ceil} />);
      expect(wrapper.text()).toEqual('$8,675.31');
    });
    it('rounding down', () => {
      const wrapper = shallow(<Price amount={8675.309} rounding={Math.floor} />);
      expect(wrapper.text()).toEqual('$8,675.30');
    });
    it('rounding up with dropCents', () => {
      const wrapper = shallow(<Price amount={8675.309} rounding={Math.ceil} dropCents />);
      expect(wrapper.text()).toEqual('$8,676');
    });
    it('rounding down with dropCents', () => {
      const wrapper = shallow(<Price amount={8675.309} rounding={Math.floor} dropCents />);
      expect(wrapper.text()).toEqual('$8,675');
    });
  });
});
