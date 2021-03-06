import React, { ComponentType, useCallback } from 'react';
import { View, StyleSheet, ViewProps, ViewStyle, StyleProp, TextStyle, I18nManager } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Body1, Subtitle1 } from '../typography';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { WrapIconProps } from '../icon-wrapper';

const defaultStyles = StyleSheet.create({
    root: {
        maxWidth: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export type ChannelValueProps = ViewProps & {
    /** Value to show (bold text) */
    value: string | number;

    /** Icon component to render */
    IconClass?: ComponentType<WrapIconProps>;

    /** Props to pass to the Icon component */
    IconProps?: { size?: number; color?: string };

    /** Text to show for units (light text) */
    units?: string;

    /** Whether to show units before the value. Default: false */
    prefix?: boolean;

    /** Font size for all text */
    fontSize?: number;

    /** Font color for all text */
    color?: string;

    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        value?: StyleProp<TextStyle>;
        units?: StyleProp<TextStyle>;
    };

    /**
     * Overrides for theme
     */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

/**
 * ChannelValue component
 *
 * Used to show a channel value and its units.
 * An arbitrary icon may be added
 */
export const ChannelValue: React.FC<ChannelValueProps> = (props) => {
    const {
        value,
        fontSize = 16,
        IconClass,
        color,
        units,
        prefix = false,
        styles = {},
        style,
        IconProps = {},
        theme: themeOverride,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);

    const getColor = useCallback((): string => {
        if (!color) return theme.colors.text;
        if (Object.keys(theme.colors).indexOf(color) >= 0)
            return theme.colors[color as keyof ReactNativePaper.Theme['colors']];
        return color;
    }, [color, theme]);

    const getIcon = useCallback(() => {
        if (IconClass) {
            return (
                <View style={[{ marginRight: Math.round(fontSize / 6) }]}>
                    <IconClass size={fontSize} color={getColor()} {...IconProps} />
                </View>
            );
        }
    }, [IconClass, fontSize, getColor, IconProps]);

    const getUnits = useCallback((): JSX.Element | undefined => {
        if (units) {
            return (
                <Body1 font={'light'} fontSize={fontSize} style={[{ color: getColor() }, styles.units]}>
                    {units}
                </Body1>
            );
        }
    }, [units, fontSize, getColor, styles]);

    const prefixUnits = useCallback((): JSX.Element | undefined => {
        if ((!I18nManager.isRTL && prefix) || (I18nManager.isRTL && !prefix)) {
            return getUnits();
        }
    }, [prefix, getUnits]);

    const suffixUnits = useCallback((): JSX.Element | undefined => {
        if ((I18nManager.isRTL && prefix) || (!I18nManager.isRTL && !prefix)) {
            return getUnits();
        }
    }, [prefix, getUnits]);

    return (
        <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
            {getIcon()}
            <Body1
                numberOfLines={1}
                ellipsizeMode={'tail'}
                testID={'text-wrapper'}
                fontSize={fontSize}
                style={[{ color: getColor() }]}
            >
                {prefixUnits()}
                <Subtitle1 fontSize={fontSize} style={[{ color: getColor() }, styles.value]}>
                    {value}
                </Subtitle1>
                {suffixUnits()}
            </Body1>
        </View>
    );
};
