import React, { useCallback, useState } from 'react';
import { PixelRatio, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { BottomSheet } from './bottom-sheet';
import { useTheme, Divider } from 'react-native-paper';
import { InfoListItem, InfoListItemProps } from '../info-list-item/info-list-item';
import * as Colors from '@pxblue/colors';

export type UserMenuProps = {
    // Custom avatar to render as bottomsheet trigger
    avatar: JSX.Element;
    // Background color of the bottomsheet
    backgroundColor?: string;
    // Color of font for menu items
    fontColor?: string;
    // Color of icons in the bottomsheet
    iconColor?: string;
    menuItems: InfoListItemProps[];
    menuTitle?: string;
    menuSubtitle?: string;
    styles?: {
        root?: ViewStyle;
        avatar?: ViewStyle;
        bottomsheet?: ViewStyle;
    };
};

const useStyles = (
    theme: ReactNativePaper.Theme,
    fontScale: number,
    avatarSize: number
): StyleSheet.NamedStyles<{
    root: ViewStyle;
    avatar: ViewStyle;
    bottomsheet: ViewStyle;
}> =>
    StyleSheet.create({
        root: {
            backgroundColor: theme.colors.surface,
        },
        avatar: {
            width: avatarSize * fontScale,
            height: avatarSize * fontScale,
            borderRadius: avatarSize * fontScale,
        },
        bottomsheet: {},
    });

export const UserMenu: React.FC<UserMenuProps> = (props) => {
    const theme = useTheme();
    const {
        avatar,
        backgroundColor,
        fontColor,
        iconColor = theme.dark ? Colors.black[200] : Colors.gray[500], // @TODO: PXBLUE-2122 - remove this hardcoded color value when doing theme updates (add black[200] to dark palette, gray[500] to light palette)
        menuTitle,
        menuSubtitle,
        menuItems,
        styles = {},
    } = props;
    const avatarSize = avatar.props.size || 40;
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const fontScale = PixelRatio.getFontScale();
    const defaultStyles = useStyles(theme, fontScale, avatarSize);

    const openMenu = (): void => {
        if (menuItems) setShowBottomSheet(true);
    };

    const closeMenu = (): void => {
        setShowBottomSheet(false);
    };

    const getAvatar = useCallback(
        () =>
            React.cloneElement(avatar, {
                size: avatarSize * fontScale,
            }),
        [avatar]
    );

    const getMenu = useCallback(
        (): JSX.Element => (
            <>
                {menuTitle && (
                    <>
                        <InfoListItem
                            hidePadding
                            title={menuTitle || ''}
                            subtitle={menuSubtitle}
                            leftComponent={
                                <View style={[defaultStyles.avatar, styles.avatar, { marginLeft: 16 }]}>
                                    {getAvatar()}
                                </View>
                            }
                            fontColor={fontColor}
                            backgroundColor={backgroundColor}
                        />
                        <Divider />
                    </>
                )}
                {menuItems &&
                    menuItems.map((menuItem: InfoListItemProps, index: number) => {
                        const menuItemStyles = menuItem.styles || {};
                        return (
                            <InfoListItem
                                {...menuItem}
                                key={index}
                                onPress={(): void => {
                                    closeMenu();
                                    if (menuItem.onPress) menuItem.onPress();
                                }}
                                iconColor={iconColor || menuItem.iconColor}
                                fontColor={fontColor || menuItem.fontColor}
                                backgroundColor={backgroundColor || menuItem.backgroundColor}
                                dense={menuItem.dense !== undefined ? menuItem.dense : true}
                                styles={Object.assign(menuItemStyles, {
                                    title: Object.assign(
                                        {
                                            fontSize: 16,
                                            fontFamily: theme.fonts.regular.fontFamily,
                                            fontWeight: theme.fonts.regular.fontWeight,
                                        },
                                        menuItemStyles.title
                                    ),
                                })}
                            />
                        );
                    })}
            </>
        ),
        [menuItems, menuTitle, menuSubtitle, iconColor, fontColor, backgroundColor]
    );

    return (
        <>
            <TouchableWithoutFeedback
                onPress={(): void => openMenu()}
                testID={'avatar'}
                style={[defaultStyles.root, styles.root]}
            >
                {getAvatar()}
            </TouchableWithoutFeedback>
            <BottomSheet
                show={showBottomSheet}
                backgroundColor={backgroundColor}
                onClose={(): void => closeMenu()}
                styles={{ root: styles.bottomsheet }}
            >
                {getMenu()}
            </BottomSheet>
        </>
    );
};
