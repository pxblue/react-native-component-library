import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { InfoListItem, ChannelValue, wrapIcon } from '@pxblue/react-native-components';
import { text, boolean, withKnobs, color } from '@storybook/addon-knobs';
import Leaf from '@pxblue/icons-svg/leaf.svg';
import Temp from '@pxblue/icons-svg/temp.svg';
import A from '@pxblue/icons-svg/grade_a.svg';
import Device from '@pxblue/icons-svg/device.svg';
import { framedRow } from '../../decorators';
import * as Colors from '@pxblue/colors';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

const notes = {
    notes:
        'The borders are NOT part of the component; they are provided for framing only. Any React Element may be passed in as `icon`; if using an svg, its color and size are not controlled by `ChannelValue`',
};

const LeafIcon = wrapIcon({ IconClass: Leaf });
const AlarmIcon = wrapIcon({ IconClass: MatIcon, name: 'alarm' });
const TempIcon = wrapIcon({ IconClass: Temp });
const DeviceIcon = wrapIcon({ IconClass: Device });
const AIcon = wrapIcon({ IconClass: A });
storiesOf('InfoListItem', module)
    .addDecorator(withKnobs)
    .addDecorator(framedRow)
    .add('with basic usage', () => <InfoListItem title={text('title', 'Info List Item')} />, notes)
    .add(
        'with subtitle',
        () => (
            <InfoListItem
                title={'Info List Item'}
                subtitle={text('subtitle', 'this is a subtitle within an InfoListItem')}
            />
        ),
        notes
    )
    .add(
        'with icon',
        () => (
            <InfoListItem
                title={'Info List Item'}
                // TODO: make this work
                // iconAlign={select('iconAlign', ['left', 'center', 'right'], 'left')}
                IconClass={AlarmIcon}
                iconColor={color('iconColor', Colors.black[500])}
                subtitle={'with an icon'}
            />
        ),
        notes
    )
    .add(
        'with array of subtitles',
        () => (
            <InfoListItem
                title={'Info List Item'}
                IconClass={TempIcon}
                subtitle={[
                    <ChannelValue key={'temp1'} value={'50'} units={'°C'} />,
                    <ChannelValue key={'temp2'} value={'55'} units={'°C'} />,
                ]}
                subtitleSeparator={text('subtitleSeparator', '·')}
                onPress={
                    boolean('action', true)
                        ? (): void => {
                              /* do nothing */
                          }
                        : undefined
                }
            />
        ),
        notes
    )
    .add(
        'with avatar and status color',
        () => (
            <InfoListItem
                title={'Info List Item'}
                IconClass={AIcon}
                avatar={boolean('avatar', true)}
                subtitle={'with an avatar and configurable status color'}
                statusColor={color('statusColor', Colors.green[700])}
            />
        ),
        notes
    )
    .add(
        'with background color',
        () => (
            <InfoListItem
                title={'Info List Item'}
                IconClass={LeafIcon}
                iconColor={Colors.black[500]}
                subtitle={'With a configurable background color'}
                fontColor={Colors.black[500]}
                backgroundColor={color('backgroundColor', Colors.white[50])}
            />
        ),
        notes
    )
    .add(
        'with right component',
        () => (
            <InfoListItem
                title={'Info List Item'}
                IconClass={DeviceIcon}
                subtitle={'with a right component'}
                rightComponent={
                    <ChannelValue
                        value={text('rightComponent.ChannelValue.value', '15')}
                        units={text('rightComponent.ChannelValue.units', 'A')}
                    />
                }
            />
        ),
        notes
    )
    .add(
        'with full config',
        () => (
            <InfoListItem
                title={text('title', 'Info List Item')}
                IconClass={DeviceIcon}
                subtitle={text('subtitle', 'with all customizable properties')}
                info={text('info', 'more info...')}
                onPress={
                    boolean('action', true)
                        ? (): void => {
                              /* do nothing */
                          }
                        : undefined
                }
                chevron={boolean('chevron', true)}
                avatar={boolean('avatar', false)}
                // TODO: make this work
                // iconAlign={select('iconAlign', ['left', 'center', 'right'], 'right')}
                iconColor={color('iconColor', Colors.black[500])}
                statusColor={color('statusColor', Colors.blue[500])}
                fontColor={color('fontColor', Colors.black[700])}
                backgroundColor={color('backgroundColor', Colors.white[50])}
            />
        ),
        notes
    );
