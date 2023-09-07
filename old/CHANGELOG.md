## 2.4.12 (Not released yet)
 - Added option to disabled `ContextMenuOptionLink` and `ContextOptionReactLink` components
 - Added searchIcon prop to `SearchDropdown` component
 - Added useSubmitOnEnter prop to `Dropdown` component
 - Added sortCallback prop for `SelectableOptionsList` component

## 2.4.11 (Mar 26, 2019)
 - Hotfix: react-docgen failing and yarn.lock update
 - Hotfix: ContextMenu to honor menuZIndex prop
 - Chore: expose positionOptions prop on <ContextMenu />
 - Added option to close ContextMenu on click

## 2.4.10 (Mar 6, 2019)
 - [CF-9874] Simple numeric input should not allow user type anything than integers
 - Hotfix: Made Collapse children optional
 - [CF-9800] Add simple integer input for advanced player
 - [CF-4909] Collapse component update - types other than Collapsea can now be added to CollapseGroup
 - [SSL-3396] Refactored context menu list to use external package react-menu-list
 - Bugfix (CF-9674): Comma Separated Input should also handle values changes based on forced events
 - Updated lodash to v4.17.11
 - [CF-9432] Extend IconButtons with X mark icon
 - [CF-8510] Unique Values in Comma Separated Input
 - [CF-9359] Improve player control
 - [CF-8507] Comma separated input

## 2.4.9 (Dec 19, 2018)
 - [SSLP-3375] context menu renders dynamic action lists correctly
 - CF-9315: Add optional tab icon and title
 - CF-9156: Hide pop-up in Player Button Component
 - CF-9156: Extend Player Duration Component
 - [CF-9155] Change condition for custom dropdown

## 2.4.8 (Nov 6, 2018)
 - [task/SSLP-3240] Fix [`TableBodyWithExpandRows`](#tablebodywithexpandrows) component to work correctly with isExpanded props
 - Bugfix [`PieChart`](#piechart) dragpoint freezing fix
 - [Chore] Change prop type and add getter for 'options' prop

## 2.4.7 (Oct 4, 2018)
- Added `className` property to components where it was missed
- Hotfix (ARL-XX): Updating yarn.lock  Ready for review bug
- Bugfix (DBE-338): [UI Automation] Breach Topology Page - elements ide…  Ready for review bug
- [SSLP-2964] Improvements to [`Dropdown`](#dropdown). It has filter field for text [`DropdownOption`](#dropdownoption)s.
- [CF-8573] Fixed typo.
- Bugfix (CF-8635): Scenarios callflow Link fix
- [CF-8588] Added units to label while editing.
- [Story/CF-8573] Adding LoadConstraintPanel Component
- Bugfix (CF-8045): New textarea character limit
- Bugfix (CF-8534): Can't remove protocols from the Traffic Mixes
- Bugfix (CF-8022): outlineWarning propTypes Update
- Bugfix (CF-8045): App Scenarios Dialog
- Bugfix (CF-8022): PieChart Outline Style Update
- Bugfix (CF-8022): Change style of outer remove

## 2.4.6 (Aug 17, 2018)
- Bugfix (CF-8383): Lack of information for some certificates

## 2.4.5 (Aug 7, 2018)
- Bugfix (CF-8301): Lack of item word's wrapping in Selectable Options List
- Hotfix: SelectableOptionsList propTypes fixes

## 2.4.4 (Aug 3, 2018)
- Bugfix (CF-6225): Allow only integer values in Pagination page number input

## 2.4.3 (Aug 2, 2018)
- Hotfix: X axis positioning popover fix
- Bugfix CF-8148: Updated FilterList component
- Bugfix (CF-8206): Selectable options list fix
- Hotfix: SelectableOptionsList added options sorting fix

## 2.4.2 (July 30, 2018)
- Conditional windows disappears onEnter (shadow submit)
- Cleanup gotopage validity state in Pagination

## 2.4.1 (July 20, 2018)
- Ciphers certificates reimplementation (SelectableOptionsList updates)
- Lack of Manual Entry in Traffic Mixes files uploading
- Fixed typo when all the bitrates have been added to the HLS protocol
- Href prop to be optional for DropdownOptionLink
- Added icons to ContextMenu options
- PieChart onMouseLeave fix & onDragEnd added
- Protocols one tab visible implementation
- Left Panel input (for renaming) fix
- PieChart upgrade regarding Traffic Mix requirements
- Added .md files, fixed selected option highlighting
- Added Autocomplete component
- Added right padding to input with password and icon.

## 2.4.0 (June 8, 2018)
- Fixed behavior of `ContextMenu`. Menu closes after clicking choosen option.
- Password input type upgrade.
- Add title prop to Button Component
- Add ability to use Icons in dropdown options by adding classNames

## 2.3.2 (May 18, 2018)
- Fixed styles of `ContextMenu`. Fixed also onClick events not working on it's options.

## 2.3.1 (May 17, 2018)
### Changes:
- Fixed position of `ContextMenu` on `Modal`.

## 2.3.0 (April 26, 2018)
### Changes:
- Added `useCssSwitching` prop to [`Tabs`](#tabs) component. This prop changes the rendering logic to always include the invisible (background tabs) to the react tree and use CSS `display: none` to hide them.
- Improvements to [`DynamicPopover`](#dynamicpopover) and [`MultilineEllipsisPopover`](#multilineellipsispopover). Works better with long texts that needs `break-word` css property.

## 2.2.1 (April 20, 2018)
### Changes:
- Fixes [`Popover`](#popover). Prop callback onVisibilityChange gets widths of elements via `getBoundingClientRect` instead of
`offsetWidth`, which gives more precise values (decimal, not floored). This fixes wrong calucation of width in DynamicPopover.
- Fixed [`Collapse`](#collapse) for not being updated after changed prop `customContent`.

## 2.2.0 (April 17, 2018)
### Changes:
- [`<MultilineEllipsisPopover>`](#multilineellipsispopover) now uses [`DynamicPopover`](#dynamicpopover) always
- Updated template for GitHub's PR


## 2.1.0 (April 12, 2018)
### Changes:
- Version of node changed inside of `.nvmrc` to `8.11.1`. Documentation updated.
- Fixed yarn.lock for specific version of chameleon.
- Added `customContent` prop to [`<Collapse>`](#collapse)

## 2.0.0 (April 10, 2018)
### BREAKING CHANGES:
- Updated [`DropdownButton`](#dropdownbutton). It uses `children` props instead of `label` to show content inside DropdownButton. It affects only [`DropdownButton`](#dropdownbutton) with [`DropdownOptionLink`](#dropdownoptionlink)

### Changes:
- Changed word-break rule for [`<Table`>](#table) cells
- Added [`DynamicPopover`](#dynamicpopover) component
- changes in `isVisible` prop of [`Popover`](#popover). Can be set to `undefined`, and it won't behave like a controlled component.
- Fixed component's example file (*.md). They are not throwing various React warnings.
- Added [`ButtonWithIcon`](#buttonwithicon). It renders Button with passed icon.
- Added [`createButtonWithIcon`](#createbuttonwithicon). HOC which adds possibility to passed icon.
- Updated [`DropdownButton`](#dropdownbutton). It uses [`Button`](#button) component.

## 1.8.19 (March 21, 2018)
### Changes:
- Added alignment for [`TableCell`](#tablecell) via [TableHeadCell](#tableheadcell) and context

## 1.8.18 (March 16, 2018)
### Changes:
- Renamed `className` for disabled li element in [`<Multiselect>`](#multiselect).
- Added `noVerticalLine` prop in [`<Multiselect>`](#multiselect)

## 1.8.17 (February 22, 2018)
### Changes:
- Added [`MultilineEllipsis`](#multineellipsis) import/export
- Added [`MultilineEllipsisPopover`](#multineellipsispopover) import/export

## 1.8.16 (February 15, 2018)
### Changes:
- Added [`InileEllipsis`](#inileellipsis) component.
- Added content types for [`TableCell`](#tablecell) to predefine alignment.

### BREAKING CHANGES:
- Removed `Breadcrumbs` and `ProfileLink` components. Both moved to CF as not needed by SSL.
- Removed dependency to `react-router`.

### Changes:
- Changes around ellipsis in table cell. Logic was extract into two new components:
- Changes [`TableCellWithTextEllipsis`](#tablecellwithtextellipsis). It now reuses `MultineEllipsisPopover`.
- Added [`MultineEllipsis`](#multineellipsis). It renders ellipsis (for FF workaround) only when text actually overflows the container.
- Added [`MultineEllipsisPopover`](#multinellipsispopover). It renders popover component only when ellipsis is visible.

### Changes:

## 1.8.15 (February 01, 2018)

### Changes:

- Migration to React Router v4
- Minor changes in [`PopoverFilter`](#popoverfilter) component - it now accepts custom props

## 1.8.14 (January 29, 2018)

### Changes:
- [`TableBodyWithExpandRows`](#tablebodywithexpandrows) `expandOnClick` is by blocked by `a` and `button` elements.

## 1.8.13 (January 22, 2018)

### Changes:
- Added onClick prop to [`BreadCrumbItem`](#breadcrumbitem) component. When setting the `list` prop of [`<Breadcrumbs>`](#bredcrumbs) you can set onClick callback for an item you want.

## 1.8.12 (11 January, 2018)

### Changes:
- Added onClick prop to [`ProfileLink`](#profilelink) component.
- Fixed [`TableCellWithTextEllipsis`](#tablecellwithtextellipsis) background color for firefox ellipsis
- Hover color of `tr` in [`TableBodyWithExpandRows`](#tablebodywithexpandrows) taken from chameleon

## 1.8.11 (December 20, 2017)

### Changes:
- Fixed bug when [`<TableCellWithTextEllipsis>`](#tablecellwithtextellipsis) was incorrectly display expand button twice. Also pointer cursor removed from it's content.

## 1.8.10 (December 19, 2017)

### Changes:
- [`<Pagination>`](#pagination) component's goto page input wrapper now has a `invalid` css class if the input is not a valid number or if it is out of the min-max page range. You can style it with ::after pseudo class and add a message or just some coloring.
- [`<TableCellWithTextEllipsis>`](#tablecellwithtextellipsis) fixed text not being truncated after component update. Also performance upgrade. Truncation is calculated only on hover, not on mount.

## 1.8.9 (December 12, 2017)

### Changes:
- Added `expandOnClick` to  `TableBodyWithExpandRows` which makes whole row clickable to trigger content expansion.
- Modified colors of stripped rows in `Table`. The color is no longer affected by expanded `TableRowWithExpandContent`
- Reduced CSS Specificity of stripped tr background color, which makes it easier to overwrite.
- added `iconsPositions` of `Collapse` into common export object. It's possible to do `import {iconPositions} from 'apoc-react'`

## 1.8.8 (November 17, 2017)

### Changes:
- Fixed colSpan calculation for [`<TableBodyWithExpandRows>`](#tablebodywithexpandrows)
- Fixed bug when expand button didn't display correctly for [`<TableCellWithTextEllipsis>`](#tablecellwithtextellipsis)
- Fixed bug when [`<TableCellWithTextEllipsis>`](#tablecellwithtextellipsis) incorrectly display content

## 1.8.7 (November 16, 2017)

### Changes:
- Renamed [`<TableCellWithExpandContent>`](#tablecellwithexpandcontent) to [`<TableCellWithTextEllipsis>`](#tablecellwithtextellipsis) and used [`<Popover>`](#popover) to show hidden content
- Fixed overflow issue for [`<Collapse>`](#collapse) using `overflow: hidden` only for collapsed state and during animation
- Changed classNames for [`<TableBodyWithExpandRows>`](#tablebodywithexpandrows)
- Added possibility for [`<Popover>`](#popover) to move cursor from content to popover without props `hideAfterDelayOf`

## 1.8.6 (November 10, 2017)

### Changes:
- Added [`<TableHeadRowForExpandRows>`](#tableheadrowforexpandrows) to fix text alignment for first header cell
- Fix border-radius for Expand Button of [`<TableBodyWithExpandRows>`](#tablebodywithexpandrows)
- Fix padding for [`<TableRowWithExpandContent>`](#tablebodywithexpandrows)

## 1.8.5 (November 2, 2017)

### Changes:
- [`<Popover>`](#popover)'s `onOutsidePopoverClick` will fire in MANUAL openTrigger mode
- Added `target` prop to [`<ContextOptionLink>`](#contextoptionlink) and made the onClick prop optional
- Added `wrapperClassName` and `slots` props to [`withPagination`](#withPagination) decorator. `slots` can be used add components before and after the infoLabel (the `1 - 10 of 10 found` label).
- [`<FilterList>`](#filterlist) component now accepts any object as option value. The key of the FilterListItem is now the name of the option.
- Added `showGotoPage` prop to [`<Pagination>`](#pagination) component
- Added `list of selectable items` (ARL-119)

## 1.8.4 (October 30, 2017)

### Changes:
- Added `none` to `iconPositions` of `Collapse` which with combination of `isPanelButton=false` make `Collapse` only externally controllable

## 1.8.3 (August 21, 2017)

### Changes:
- Fixed version of Chameleon package for release branch

## 1.8.2 (August 20, 2017)

### BREAKING CHANGES:
- Added `sc-btn-primary-outline` css class to [`<DropdownButton>`](#dropdownbutton) component's making it render with the @primary chameleon outline color.

### Other changes:
- Added [`<FileInput>`](#fileinput) component as shown in the mocks of the new cyberflood profile builder
- Added `fullWidth` prop to [`<Dropdown>`](#dropdown) component
- Added `isLinkView` prop to [`<Button>`](#button) component
- Added [`<withPagination>`](#withPagination) component
- Added [`<TableWithPagination>`](#TableWithPagination) component

## 1.8.1 (August 18, 2017)

- fixed typo in CHANGELOG.md

## 1.8.0 (August 18, 2017)

### BREAKING CHANGES:
 - Remove the `<DropArea>` component
 - Added `<Placeholder>` component

### Other changes:
 - Fix missing button type in [`<Button>`](#button) component.
 - Added [`<FilterList>`](#filterlist) component.
 - Added `labelPosition` and `fullWidth` props to [`<Multiselect>`](#multiselect).
 - Fixed wrong css class names for the [`<Checkbox>`](#checkbox) component please check if the margin is okay for your use case
 - Added [`<Table`>](#table) Component
 - Added [`<TableBodyWithExpandRows`>](#tablebodywithexpandrows) Component
 - Added [`<TableCell`>](#tablecell) Component
 - Added [`<TableCellWithExpandContent`>](#tablecellwithexpandcontent) Component
 - Added [`<TableHeadCell`>](#tableheadcell) Component
 - Added [`<TableRow`>](#tablerow) Component
 - Added [`<TableRowWithExpandContent`>](#tablerowwithexpandcontent) Component
 - Added `editable` and `onChange`, `onPercentageAdjust`, `highlightFilter` and `highlightLabelFilter` props to the [`<PieChart>`](#piechart) component. In edit mode the PieChart is intended to be used as controlled component so in the onChange callback you should set state and update the data prop accordingly.
 - Added [`DatePicker`](#datepicker) Component
 - Added `subtitle` and `stack` prop to [`ProfileLink`](#profilelink) component.

## 1.7.0 (July 10, 2017)

### BREAKING CHANGES:
 - Renamed `isDisabled` to `disabled` and `isSelected` to `selected` props for [`<DropdownOption>`](#dropdownoption) component
 - The [`<Breadcrumbs>`](#bredcrumbs) component is using `<Link>` component from `react-router` instead of an `<a>` anchor element.
   Please check your links and routes.
 - The `isLicenseMissing` prop was removed from the [`<Button>`](#button) component.

### Other changes:
 - Fixed [`<Checkbox>`](#checkbox) component behaviour in ff when the whole component is clickable - isOnlyCheckboxClickable={false}. isOnlyCheckboxClickable prop of the [`Checkbox`](#checkbox) can be removed in the future as it was probably a quick firefox fix.
 - Add [`<FilterPopover>`](#filterpopover) component
 - Add [`<FilterPanel>`](#filterpanel), [`<FilterPanelCollapse>`](#filterpanelcollapse) and [`<FilterLabel>`](#filterlabel) components to be used with FilterPopover
 - Improve the performance of [`<Collapse>`](#collapse) component
 - Add `allowMultipleOpened` prop to the [`<CollapseGroup>`](#collapsegroup) component that allows to render multiple opened [`<Collapse>`](#collapse) components at the same time
 - Upgrade dependencies and move on to [webpack 3.0 🚀 ](https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b)
 - Update the implementation of [`<Button>`](#button) component. Use `<button>` tag instead of the `<label>`. Don't allow to trigger click handler when the button is disabled.
 - Added [`DropdownInput`](#DropdownInput) component
 - Added [`SearchDropdown`](#SearchDropdown) component
 - [`Dropdown`](#Dropdown) component now can have empty children (non-breaking change)
 - [`Dropdown`](#Dropdown) component toggle function now receives optional `isOpen` arg that will determine to close or open dropdown list (non-breaking change)

## 1.6.0 (June 21, 2017)

### BREAKING CHANGES:
 - The `errorMessage` message prop was removed from the [`<ToggleButton>`](#togglebutton) component. If you need to
  show the tooltip when hovering over the [`<ToggleButton>`](#togglebutton) you will have to use
  [`<ToggleButtonWithPopover>`](#togglebuttonwithpopover) instead.
- [`<Description>`](#description) component is now correctly firing `onChange` callback when there was a change to value (same as native event). Previously `onChange` was fired on blur wich was confusing.
- [`<Description>`](#description) component now uses `value` instead of `children` to set value. This unify it with the usage os `Input` or `TextArea` components
- Fix removing timeout on already unmounted [`<ContextMenu>`](#contextmenu) component

### Other changes:
 - Added [`<ProgressStatus>`](#progressstatus) component that uses [`<Progressbar>`](#progressbar) and [`<ProgressStatusStage>`](#progresstatusstage) to visualize staged progress
 - Update dependencies and switch to Webpack 2
 - Added `withBackdrop` HoC
 - Improve the CSS for [`<Fieldset>`](#fieldset) and [`<Label>`](#label) components
 - Added `tooltipClassName` prop to the [`<Popover>`](#popover) component
 - Added  [`<InputFieldWithPopover>`](#inputfieldwithpopover) Higher Order Component that utilize [`<Input>`](#input)
   and [`<Popover>`](#popover) components.
 - Added  [`<ToggleButtonWithPopover>`](#togglebuttonwithpopover) Higher Order Component that utilize
  [`<ToggleButton>`](#togglebutton) and [`<Popover>`](#popover) components.
 - Added [`<TextArea>`](#textarea) component
 - [`Description`](#description) was refactored using [`<TextArea>`](#textarea) - apart from the `onBlur` change (mentioned in breaking changes) it should look and work the same
 - Added [`List`](#list) component
 - Added [`ListItem`](#listitem) component
 - Added possibility to change selected option via props for [`<Dropdown>`](#dropdown) and [`<ButtonGroupContainer>`](#buttongroupcontainer) components
 - Improve styles for the [`<Breadcrumbs>`](#breadcrumbs) and [`<ProfileLink>`](#profilelink) components
 - Added [`<ErrorMessage>`](#errormessage) component

## 1.5.1 (June 1, 2017)
 - Fixed rounding number of pages for [`<Pagination>`](#Pagination) component.

## 1.5.0 (April 21, 2017)
### BREAKING CHANGE:
  `ButtonGroup` was renamed to  `ButtonGroupContainer`. Please update your imports from

  ```html
  import { ButtonGroup } from 'apoc-react';
  ```
  to
  ```html
  import { ButtonGroupContainer as ButtonGroup } from 'apoc-react';
  ```

  This way you don't have to adjust the rest of your code, you can still use it like so:
  ```html
  <ButtonGroup onChange={callbackFn}>
    <Button value={value}>Option 1</Button>
    <Button value="id">Option 2</Button>
  </ButtonGroup>
  ```

### BREAKING CHANGE:
  - Property `showTime` in `Popover` component was renamed to `hideAfterDelayOf`.
  - `ModalDialog` component was renamed to `ModalWithBackdrop`
  - Property `href` in `ProfileLink` component was renamed to `location` for the favour of `<Link>` component

### Other changes:
 - Added `BreadcrumbItem` component
 - Added `Breadcrumbs` component
 - Added `followCursorPosition` prop into `Popover` component for `BOTTOM_LEFT` and `BOTTOM_RIGHT` placements
 - Refactored `ButtonGroup` to return button value on change
 - Update and upgrade dependencies
 - Added `onButtonMouseOver` property for `ContextMenu` component
 - Added `stopPropagation` for `ContextMenu` burger button and menu itself
 - Added default type property of `button` to components that utilise button html element
 - Changed `Timeline` duration from milliseconds to seconds
 - Added pointer cursor to `VolumeHandler` while dragging
 - Extract `React` and `ReactDOM` from the build
 - Unified usage of object spread operator
 - Added `ButtonGroupContainer` in place of `ButtonGroup`. Apart from name change `ButtonGroupContainer` has additional `selectedIndex` prop.
 - Added `ButtonGroup` presentational (dumb) component
 - `Button` and `PaginationButton` are now functional components
 - Refactored `Progressbar` component and added example page
 - Added custom `numberInRange` validation for props
 - Added `percentageShift` prop to `PieChart`
 - Added `Backdrop` component
 - Added `Modal` component
 - Refactored `ModalDialog` component
 - Added `ModalGroup` component
 - Added `onMenuMouseOver` and `onMenuMouseLeave` event handlers to `ContextMenu` component
 - Added `Alert` component and `AlertTypes` dictionary
 - Added `Label` component
 - Added `CircleDraggablePoints` component
 - Added `Input` component
 - Fix the `MANUAL` opening mode for the `Popover` component. Right now it does not interfere with the `CLICK_OUTSIDE` mode.
 - Added `Description` component
 - Exported `TOGGLE_BUTTON_SIZES` from `ToggleButton`
 - Added `Fieldset` component

## 1.4.0 (January 30, 2017)
 - Added basic `PieChart` with empty sectors
 - `LoadSpecificationChart` is now using SVG instead of canvas
 - Renaming `DraggablePoint` to `Point`
 - Added `DurationEditor` component  - extracted functionality from previous `DraggablePoint`
 - Added new `ContextMenu` component
 - Swapping `react-height` for `react-measure` in `Collapse` component
 - Added custom icon styles prop to `Collapse` component
 - Add global `APOC_REACT` variable that contains information about the package version and GIT SHA1 hash
 - Added new prop `className` for DropdownButton with default value 'sc-btn-default'
 - Fixed bug - JS error in `haveChildrenPropsChanged` when both `nextChildren` and `currentChildren` were empty.
 - Added `isOnlyCheckboxClickable` property to `Checkbox` component.
 - Extended `Checkbox` component to receive label `className` as a parameter and to display title hint when needed.
 - Extended `Checkbox` component to receive tooltip as an additional property to allow different value for label and tooltip.
 - Added example how to update `Dropdown` button label when children prop was changed.
 - Added `EditableLabel` component
 - Added `Tile` component
 - Added `TilesList` component

## 1.3.0 (November 30, 2016)
 - Renamed `Chart` component to `LoadSpecificationChart` and added more examples
 - Create `DraggablePoints` component that can be used as a dragging overlay for the `LoadSpecificationChart` component
 - Babel's presets list is enriched by presence of `es2017`
 - Babel's plugin `transform-runtime` is added to actually start using presets' polyfill
 - Updating `DraggablePoint` component
 - Updating `Timeline` component
 - Removing the `moment` and `moment-duration-format` libraries as dependencies
 - Adding optional projections to `LoadSpecificationChart` and fixing bug with the line width
 - Added new `ProfileLink` component
 - Added `Panel` component to exports
 - Source maps for production build are extracted to separate files. Thanks to that the file size of the `*.js` and `*.css` files was reduced.
 - Changed `Timeline` duration unit to seconds
 - Added fix for `VolumeHandler` component, removed selection while dragging
 - Added manual trigger for showing and hiding `Popover` component
 - Don't overwrite the CanJS based Apoc styles by the `Modal` and `DropArea` components

## 1.2.0 (November 10, 2016)
 - Migrate library to GitHub repository
 - Update Development documentation chapter
 - Update Quick Start documentation chapter
 - Improve and add missing documentation for Tabs, Checkbox, Collapse, Collapse Group, Pagination, Player Duration
 - Publish Tab component documentation and remove it from ignored list
 - Refactor Checkbox component
 - Fix NPM dev dependencies
 - Added timeline component
 - Added volume handler component
 - Added volume handler label component
 - Added Chart component
 - Temporary remove integration with private NPM registry
 - Set GitHub dependencies

## 1.1.0 (October 11, 2016)
- Publish library
- Expose new components: Button, ButtonGroup, Checkbox, Collapse, DropArea, Dropdown, ModalDialog, Multiselect, Pagination, PlayerButton, PlayerDuration, Popover,
 Progressbar, Tabs, TestQueueDropdownOptionLabel, ToggleButton
- Added modifier class to popover on popover open
