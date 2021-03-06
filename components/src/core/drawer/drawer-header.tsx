import React, { ReactNode, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    ImageStyle,
    TextStyle,
    ViewProps,
    PixelRatio,
    TouchableOpacity,
} from 'react-native';
import { H6, Subtitle1 } from '../typography';
import { Divider, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EdgeInsets, HeaderIcon as HeaderIconType } from '../__types__';
import { $DeepPartial } from '@callstack/react-theme-provider';
import { REGULAR_HEIGHT } from '../header/constants';

const makeStyles = (
    props: DrawerHeaderProps,
    theme: ReactNativePaper.Theme,
    insets: EdgeInsets
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    icon: ViewStyle;
    content: ViewStyle;
    textContent: ViewStyle;
    title: TextStyle;
    subtitle: TextStyle;
    backgroundImageWrapper: ViewStyle;
    backgroundImage: ImageStyle;
}> => {
    const fontScale = PixelRatio.getFontScale();
    return StyleSheet.create({
        root: {
            paddingTop: insets.top,
            backgroundColor: props.backgroundColor || theme.colors.primaryBase || theme.colors.primary,
            height: REGULAR_HEIGHT,
        },
        icon: {
            marginLeft: 16,
            height: 56 * fontScale,
            width: 40 * fontScale,
            justifyContent: 'center',
        },
        content: {
            flexDirection: 'row',
        },
        textContent: {
            flexDirection: 'column',
            paddingVertical: 4 * fontScale,
            paddingLeft: 16,
            flex: 1,
            height: '100%',
        },
        title: {
            color: props.fontColor || theme.colors.surface,
            lineHeight: 30,
        },
        subtitle: {
            color: props.fontColor || theme.colors.surface,
            lineHeight: 16,
            marginTop: -2 * fontScale,
        },
        backgroundImageWrapper: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            opacity: props.backgroundOpacity,
        },
        backgroundImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
    });
};

export type DrawerHeaderProps = ViewProps & {
    /** Colored background of the header */
    backgroundColor?: string;
    /** Image to blend with the colored background in the header */
    backgroundImage?: ImageSourcePropType;
    /** Opacity to use for blending the background image into the background color */
    backgroundOpacity?: number;
    /** Color to use for header text elements */
    fontColor?: string;
    /** Icon to use to the left of the header text */
    icon?: HeaderIconType;
    /** First line of text in the header */
    title?: string;
    /** Second line of text in the header */
    subtitle?: string;
    /** Custom content to use in place of the header text */
    titleContent?: ReactNode;
    /** Custom styles (same as styles.root) */
    style?: StyleProp<ViewStyle>;
    /** Style Overrides */
    styles?: {
        root?: StyleProp<ViewStyle>;
        backgroundImageWrapper?: StyleProp<ViewStyle>;
        backgroundImage?: StyleProp<ImageStyle>;
        content?: StyleProp<ViewStyle>;
        textContent?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
        icon?: StyleProp<ViewStyle>;
    };
    /** Overrides for theme */
    theme?: $DeepPartial<ReactNativePaper.Theme>;
};

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
    const {
        title,
        subtitle,
        titleContent,
        backgroundImage,
        fontColor,
        icon,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        backgroundOpacity,
        theme: themeOverride,
        styles = {},
        style,
        ...viewProps
    } = props;
    const theme = useTheme(themeOverride);
    const insets = useSafeAreaInsets();
    const defaultStyles = makeStyles(props, theme, insets);

    const getIcon = useCallback((): JSX.Element | undefined => {
        if (icon) {
            const IconClass = icon.icon;
            return (
                <View style={[defaultStyles.icon, styles.icon]}>
                    <TouchableOpacity
                        testID={'drawer-header-navigation'}
                        onPress={icon.onPress}
                        style={{ padding: 8, marginLeft: -8 }}
                        disabled={!icon.onPress}
                    >
                        <IconClass size={24} color={fontColor || 'white'} />
                    </TouchableOpacity>
                </View>
            );
        }
    }, [defaultStyles, styles, icon, fontColor]);

    const getHeaderContent = useCallback(
        (): ReactNode =>
            titleContent || (
                <View style={[defaultStyles.textContent, styles.textContent]}>
                    <H6 style={[defaultStyles.title, styles.title]} numberOfLines={1}>
                        {title}
                    </H6>
                    <Subtitle1 font={'light'} style={[defaultStyles.subtitle, styles.subtitle]} numberOfLines={1}>
                        {subtitle}
                    </Subtitle1>
                </View>
            ),
        [title, subtitle, titleContent, defaultStyles, styles]
    );

    const getBackgroundImage = useCallback((): ReactNode | undefined => {
        if (backgroundImage) {
            return (
                <View style={[defaultStyles.backgroundImageWrapper, styles.backgroundImageWrapper]}>
                    <Image
                        source={backgroundImage}
                        resizeMethod={'resize'}
                        // @ts-ignore typescript is being weird about the backgroundImage style type
                        style={[defaultStyles.backgroundImage, styles.backgroundImage]}
                    />
                </View>
            );
        }
    }, [backgroundImage, defaultStyles, styles]);

    return (
        <View style={[defaultStyles.root, styles.root, style]} {...viewProps}>
            {getBackgroundImage()}
            <View style={[defaultStyles.content, styles.content]}>
                {icon && getIcon()}
                {getHeaderContent()}
            </View>
            <Divider />
        </View>
    );
};

DrawerHeader.displayName = 'DrawerHeader';
DrawerHeader.defaultProps = {
    backgroundOpacity: 0.3,
};
