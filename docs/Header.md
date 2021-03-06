# Header

The `<Header>` component is used at the top of the page to display page information. It shows a title and has optional parameters to show a subtitle, background image, navigation button, and multiple action buttons. The header can also be configured to expand/collapse as desired. For expand/collapse behavior tied to the screen scroll position, you should use the [`<CollapsibleHeaderLayout>`](./CollapsibleHeaderLayout.md) component.

<img width="400" alt="Collapsed header" src="./images/header_small.png">
<img width="400" alt="Expanded header" src="./images/header_large.png">

## Usage

```tsx
import { Header } from '@pxblue/react-native-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
const MenuIcon = wrapIcon({IconClass: Icon, name:'menu'});
const MoreIcon = wrapIcon({IconClass: Icon, name:'more-vert'});
...
<Header
    title={'Valley Forge'}
    subtitle={'The Last Stand'}
    navigation={{icon: MenuIcon, onPress: () => {}}}
    actionItems={[
        {icon: MoreIcon, onPress: () => {}}
    ]}
/>
```

## API

<div style="overflow: auto">

| Prop Name          | Description                                                                                                                | Type                                                                                | Required       | Default                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------- | ------------------------ |
| actionItems        | Icons to show to the right of the title                                                                                    | `Array<HeaderIcon                                                                   | HeaderAvatar>` | no                       |
| backgroundColor    | The color used for the background                                                                                          | `string`                                                                            | no             | `theme.colors.primary`   |
| backgroundImage    | An image to display in the header                                                                                          | `ImageSourcePropType`                                                               | no             |                          |
| collapsedHeight    | The height of the header when collapsed                                                                                    | `number`                                                                            | no             | 56                       |
| expandable         | Allow the header to expand/collapse on tap                                                                                 | `boolean`                                                                           | no             | `false`                  |
| expandedHeight     | The height of the header when expanded                                                                                     | `number`                                                                            | no             | 200                      |
| fontColor          | The color used for the text                                                                                                | `string`                                                                            | no             | `theme.colors.onPrimary` |
| info               | Third line of text (hidden on collapse)                                                                                    | `ReactNode`                                                                         | no             |                          |
| navigation         | Icon to show left of the title                                                                                             | `HeaderIcon`                                                                        | no             |                          |
| scrollPosition     | Y-value of the linked ScrollView (dynamic variant only)                                                                    | `Animated.Value`                                                                    | no             |                          |
| searchableConfig   | Configuration for search behavior                                                                                          | `SearchableConfig`                                                                  | no             |                          |
| startExpanded      | Default the header to expanded                                                                                             | `boolean`                                                                           | no             | `false`                  |
| styles             | Style overrides                                                                                                            | `Object`                                                                            | no             |                          |
| subtitle           | The text to show on the second line                                                                                        | `ReactNode`                                                                         | no             |                          |
| theme              | Theme partial for default styling                                                                                          | `Theme`                                                                             | no             |                          |
| updateScrollView\* | Callback function to update a linked ScrollView (dynamic variant only)                                                     | `({ padding: number \| null; animate: boolean; scrollTo: number \| null }) => void` | no             |                          |
| title              | The text to show on the first line                                                                                         | `ReactNode`                                                                         | yes            |                          |
| variant            | The resize mode of the Header (static will resize only on taps, if enabled. Dynamic will resize as the screen is scrolled) | `'dynamic'` \| `'static'`                                                           | no             | 'static'                 |

</div>

> Props marked with a star (\*) are managed automatically when using the `<CollapsibleHeaderLayout>` component.

### Styles

You can override the internal styles used by PX Blue by passing a `styles` prop. It supports the following keys:

| Name            | Description                                |
| --------------- | ------------------------------------------ |
| root            | Styles applied to the root element         |
| actionItem      | Styles applied to the action icon(s)       |
| actionPanel     | Styles applied to the actions container    |
| avatar          | Styles applied to the action components    |
| backgroundImage | Styles applied to the background image     |
| content         | Styles applied to the content wrapper      |
| info            | Styles applied to the info element         |
| navigationIcon  | Styles applied to the navigation icon      |
| search          | Styles applied to the search input element |
| subtitle        | Styles applied to the subtitle element     |
| textContent     | Styles applied to the text wrapper         |
| title           | Styles applied to the title element        |

# HeaderIcon

Header icons specified as a JSON object with the following properties:

<div style="overflow: auto">

| Key     | Description                        | Type                                               | Required | Default |
| ------- | ---------------------------------- | -------------------------------------------------- | -------- | ------- |
| icon    | A component to render for the icon | `React.Component<{ size: number, color: string }>` | yes      |         |
| onPress | A function to execute when clicked | `function`                                         | no       |         |

</div>

# HeaderAvatar

Header avatar component specified as a JSON object with the following properties:

<div style="overflow: auto">

| Key       | Description                          | Type          | Required | Default |
| --------- | ------------------------------------ | ------------- | -------- | ------- |
| component | A component to render for the avatar | `JSX.Element` | yes      |         |

</div>

# SearchableConfig

SearchableConfig is an optional object used to configure the search functionality of the header component. It is a JSON object with the following properties:

<div style="overflow: auto">

| Key            | Description                             | Type                                                                 | Required | Default      |
| -------------- | --------------------------------------- | -------------------------------------------------------------------- | -------- | ------------ |
| autoCapitalize | Auto-capitalize search input            | [`TextInput.autoCapitalize`](https://reactnative.dev/docs/textinput) | no       | 'none'       |
| autoCorrect    | Auto-correct search input               | `boolean`                                                            | no       | `false`      |
| autoFocus      | Gives focus to search input when opened | `boolean`                                                            | no       | `false`      |
| icon           | An override for the default search icon | `React.Component<{ size: number, color: string }>`                   | no       | `SearchIcon` |
| onChangeText   | Callback when search text changes       | `function`                                                           | no       | `null`       |
| placeholder    | Helper text shown in search field       | `string`                                                             | no       | 'Search'     |

</div>
