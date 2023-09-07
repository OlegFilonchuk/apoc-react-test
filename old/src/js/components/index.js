import Alert, { ALERT_TYPES as AlertTypes } from './Alert/Alert';
import Autocomplete from './Autocomplete/Autocomplete';
import Backdrop from './Backdrop/Backdrop';
import Button from './Button/Button';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import ButtonGroupContainer from './ButtonGroup/ButtonGroupContainer';
import ButtonWithIcon from './ButtonWithIcon/ButtonWithIcon';
import Checkbox, { labelPositions as CheckboxLabelPositions } from './Checkbox/Checkbox';
import CircleDraggablePoints from './CircleDraggablePoints/CircleDraggablePoints';
import Collapse, { iconPositions } from './Collapse/Collapse';
import CollapseGroup from './Collapse/CollapseGroup';
import CommaSeparatedInput from './CommaSeparatedInput/CommaSeparatedInput';
import ContextButton from './ContextMenu/ContextButton';
import ContextMenu from './ContextMenu/ContextMenu';
import ContextOption from './ContextMenu/ContextOption';
import ContextOptionLink from './ContextMenu/ContextOptionLink';
import ContextOptionReactLink from './ContextMenu/ContextOptionReactLink';
import createButtonWithIcon from './ButtonWithIcon/createButtonWithIcon';
import DatePicker from './DatePicker/DatePicker';
import Description from './Description/Description';
import DraggablePoints from './DraggablePoints/DraggablePoints';
import Dropdown from './Dropdown/Dropdown';
import DropdownButton from './Dropdown/DropdownButton';
import DropdownOption from './Dropdown/DropdownOption';
import DropdownOptionLink from './Dropdown/DropdownOptionLink';
import DynamicPopover from './DynamicPopover/DynamicPopover';
import EditableLabel from './EditableLabel/EditableLabel';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Fieldset from './Fieldset/Fieldset';
import FileInput from './FileInput/FileInput';
import FilterList from './FilterList/FilterList';
import FilterPanel from './FilterPanel/FilterPanel';
import FilterPanelCollapse from './FilterPanel/FilterPanelCollapse';
import FilterLabel from './FilterPanel/FilterLabel';
import FilterPopover from './FilterPopover/FilterPopover';
import IconButton from './IconButton/IconButton';
import InlineEllipsis from './InlineEllipsis/InlineEllipsis';
import Input from './Input/Input';
import InputFieldWithPopover from './InputFieldWithPopover/InputFieldWithPopover';
import IntegerInputWithControls from './IntegerInputWithControls/IntegerInputWithControls';
import Label from './Label/Label';
import List from './List/List';
import ListItem from './ListItem/ListItem';
import LoadConstraintPanel from './LoadConstraintPanel/LoadConstraintPanel';
import LoadSpecificationChart from './LoadSpecificationChart/LoadSpecificationChart';
import Modal from './Modal/Modal';
import ModalWithBackdrop from './ModalWithBackdrop/ModalWithBackdrop';
import ModalGroup from './ModalGroup/ModalGroup';
import MultilineEllipsis from './MultilineEllipsis/MultilineEllipsis';
import MultilineEllipsisPopover from './MultilineEllipsisPopover/MultilineEllipsisPopover';
import Multiselect from './Multiselect/Multiselect';
import Pagination from './Pagination/Pagination';
import Panel from './Panel/Panel';
import PanelHeader from './Panel/PanelHeader';
import PanelMenu from './Panel/PanelMenu';
import PanelUtils from './Panel/PanelUtils';
import PieChart from './PieChart/PieChart';
import Placeholder from './Placeholder/Placeholder';
import PlayerButton from './PlayerButton/PlayerButton';
import PlayerDuration from './PlayerDuration/PlayerDuration';
import Popover from './Popover/Popover';
import POPOVER_OPEN_TRIGGER from './Popover/PopoverOpenTrigger';
import POPOVER_PLACEMENTS from './Popover/PopoverPlacements';
import POPOVER_TYPES from './Popover/PopoverTypes';
import Progress from './Progressbar/Progressbar';
import ProgressStatus from './ProgressStatus/ProgressStatus';
import ProgressStatusStage from './ProgressStatus/ProgressStatusStage';
import SchedulePicker from './SchedulePicker/SchedulePicker';
import SchedulePickerGroup from './SchedulePickerGroup/SchedulePickerGroup';
import SearchDropdown from './SearchDropdown/SearchDropdown';
import SelectableOptionsList from './SelectableOptionsList/SelectableOptionsList';
import Table from './Table/Table';
import TableBodyWithExpandRows from './Table/TableBodyWithExpandRows';
import TableCell from './Table/TableCell';
import TableCellWithTextEllipsis from './Table/TableCellWithTextEllipsis';
import TableHeadCell, { TABLE_SORT_ORDER } from './Table/TableHeadCell';
import TableHeadRow from './Table/TableHeadRow';
import TableHeadRowForExpandRows from './Table/TableHeadRowForExpandRows';
import TableRowWithExpandContent from './Table/TableRowWithExpandContent';
import TableWithPagination from './Table/TableWithPagination';
import Tabs from './Tabs/Tabs';
import TestQueueDropdownOptionLabel from './TestQueueDropdownOptionLabel/TestQueueDropdownOptionLabel';
import TextArea from './TextArea/TextArea';
import TextPlaceholder from './TextPlaceholder/TextPlaceholder';
import Tile from './TilesList/Tile';
import TilesList from './TilesList/TilesList';
import Timeline from './Timeline/Timeline';
import ToggleButton, { TOGGLE_BUTTON_SIZES } from './ToggleButton/ToggleButton';
import ToggleButtonWithPopover from './ToggleButtonWithPopover/ToggleButtonWithPopover';
import VolumeHandler from './VolumeHandler/VolumeHandler';
import VolumeLabel from './VolumeHandler/VolumeLabel';
import withBackdrop from './withBackdrop/withBackdrop';
import withPagination from './withPagination/withPagination';
import withCharactersLimit from './withCharactersLimit/withCharactersLimit';
import APOC_REACT from './version';
import * as dataTestElementPropUtils from '../utils/dataTestElementPropUtils';

const { VERSION, APOC_GIT_SHA1 } = APOC_REACT;

Object.defineProperty(window, 'APOC_REACT', {
  enumerable: false,
  writable: false,
  configurable: true,
  value: APOC_REACT
});

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable no-console */
  console.debug('Apoc-React: %s (%s)', VERSION, APOC_GIT_SHA1);
  /* eslint-enable no-console */
}

const DTE = dataTestElementPropUtils.DTE;

export {
  Alert,
  AlertTypes,
  Autocomplete,
  Backdrop,
  Button,
  ButtonGroup,
  ButtonWithIcon,
  ButtonGroupContainer,
  Checkbox,
  CheckboxLabelPositions,
  CircleDraggablePoints,
  Collapse,
  CommaSeparatedInput,
  createButtonWithIcon,
  iconPositions,
  InlineEllipsis,
  CollapseGroup,
  ContextButton,
  ContextMenu,
  ContextOption,
  ContextOptionLink,
  ContextOptionReactLink,
  DatePicker,
  Description,
  DraggablePoints,
  Dropdown,
  DropdownButton,
  DropdownOption,
  DropdownOptionLink,
  DynamicPopover,
  EditableLabel,
  ErrorMessage,
  Fieldset,
  FileInput,
  FilterList,
  FilterPanel,
  FilterPanelCollapse,
  FilterLabel,
  FilterPopover,
  IconButton,
  Input,
  InputFieldWithPopover,
  IntegerInputWithControls,
  Label,
  List,
  ListItem,
  LoadConstraintPanel,
  LoadSpecificationChart,
  Modal,
  ModalWithBackdrop,
  ModalGroup,
  Multiselect,
  MultilineEllipsis,
  MultilineEllipsisPopover,
  Pagination,
  Panel,
  PanelHeader,
  PanelMenu,
  PanelUtils,
  PieChart,
  Placeholder,
  PlayerButton,
  PlayerDuration,
  Popover,
  POPOVER_OPEN_TRIGGER,
  POPOVER_PLACEMENTS,
  POPOVER_TYPES,
  Progress,
  ProgressStatus,
  ProgressStatusStage,
  SchedulePicker,
  SchedulePickerGroup,
  SearchDropdown,
  SelectableOptionsList,
  Table,
  TableBodyWithExpandRows,
  TableCell,
  TableCellWithTextEllipsis,
  TableHeadCell,
  TableHeadRow,
  TableHeadRowForExpandRows,
  TableRowWithExpandContent,
  TableWithPagination,
  TABLE_SORT_ORDER,
  Tabs,
  TestQueueDropdownOptionLabel,
  TextArea,
  TextPlaceholder,
  Tile,
  TilesList,
  Timeline,
  ToggleButton,
  ToggleButtonWithPopover,
  TOGGLE_BUTTON_SIZES,
  VolumeHandler,
  VolumeLabel,
  VERSION,
  withBackdrop,
  withPagination,
  withCharactersLimit,
  dataTestElementPropUtils,
  DTE
};
