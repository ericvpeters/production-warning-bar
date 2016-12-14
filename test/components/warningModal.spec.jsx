import React from 'react'
import { shallow, mount } from 'enzyme';

import WarningModal from '../../src/js/components/warningModal.jsx';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import toJson from 'enzyme-to-json';

describe('WarningModal', () => {
    let component;
    
    beforeAll(() => { injectTapEventPlugin(); });

    beforeEach(() => {
        component = mount( <WarningModal></WarningModal>, {
            context: {
            muiTheme: getMuiTheme(baseTheme)
            }, 
            childContextTypes: {
            muiTheme: React.PropTypes.object.isRequired
            }
        });
    });
    
     
    it("Modal should disappear after clicking on accept button", () => {
        let tree = toJson(component);
        expect(tree).toMatchSnapshot();
        expect(component.find('Dialog').prop('onRequestClose')).toEqual(component.find('Dialog').prop('actions')[0].props['onTouchTap']);
        component.find('Dialog').prop('onRequestClose')();
        expect(component.state('open')).toEqual(false);
        tree = toJson(component);
        expect(tree).toMatchSnapshot();
    });
});
