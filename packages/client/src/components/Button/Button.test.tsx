import React from 'react';
import { Button } from './Button';
import { shallow } from 'enzyme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let testButton;

describe('Button test', () => {
    it('should render a default button', () => {
        testButton = shallow(<Button />);
        const innerButton = testButton.find('button');
        expect(innerButton.exists()).toBeTruthy();
        expect(innerButton.text()).toEqual('Button item');
        expect(innerButton.prop('disabled')).toBeFalsy();
        expect(testButton.find('.button-icon').exists()).toBeFalsy();
        expect(testButton).toMatchSnapshot();
    });

    it('should set button text properly', () => {
        const buttonText = 'test button';
        testButton = shallow(<Button text={buttonText} />);
        expect(testButton.find('button').text()).toEqual(buttonText);
    });

    it('should set button icon properly', () => {
        const buttonIcon = 'plus-circle';
        testButton = shallow(<Button icon={buttonIcon} />);
        const expectedFAIcon = <FontAwesomeIcon icon={buttonIcon} />;
        expect(testButton.find('.button-icon').containsMatchingElement(expectedFAIcon));
    });

    it('should set onClick handler properly', () => {
        const mockCallback = jest.fn();
        testButton = shallow(<Button onClick={mockCallback} />);
        testButton.find('button').simulate('click');
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should disable button properly', () => {
        testButton = shallow<Button>(<Button />);
        testButton.instance().toggle();
        expect(testButton.find('button').prop('disabled')).toBeTruthy();
    });
});
