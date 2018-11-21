import { combineReducers } from 'redux';
import AlertDialogReducer from './AlertDialog';
import ApplicationReducer from './Application';
import AsyncTaskReducer from './AsyncTask';
import ConstraintReducer from './Constraint';
import ContainerReducer from './Container';
import ControlChainReducer from './ControlChain';
import GridViewCellReducer from './GridViewCell';
import ListViewCellReducer from './ListViewCell';
import ProgressDialogReducer from './ProgressDialog';
import ScenesReducer from './Scenes';
import SourceTypeReducer from './SourceType';
import UiPhoneControlReducer from './UiPhoneControl';
import ViewControllersReducer from './ViewControllers';
import NavigationReducer from './Navigation';
import MenuReducer from './Menu';
import WatchControllerReducer from './WatchController';
import WatchControlReducer from './WatchControl';
import WatchClickListenerReducer from './WatchClickListener';
import DataHandlersReducer from './DataHandlers';
import PreferenceRecordReducer from './PreferenceRecord';
import FileStorageRecordReducer from './FileStorageRecord';
import EntityAttributeReducer from './EntityAttribute';
import EntityReducer from './Entity';
import EntityRelationReducer from './EntityRelation';
import CloudObjectReducer from './CloudObject';
import CloudObjectAttributeReducer from './CloudObjectAttribute';

const RootReducer = combineReducers({
    application: ApplicationReducer,
    scenes: ScenesReducer,
    viewControllers: ViewControllersReducer,
    alertDialogs: AlertDialogReducer,
    progressDialogs: ProgressDialogReducer,
    asyncTasks: AsyncTaskReducer,
    uiPhoneControls: UiPhoneControlReducer,
    constraints: ConstraintReducer,
    listViewCells: ListViewCellReducer,
    gridViewCells: GridViewCellReducer,
    sourceTypes: SourceTypeReducer,
    controlChains: ControlChainReducer,
    containers: ContainerReducer,
    navigations: NavigationReducer,
    menu: MenuReducer,

    watchControllers: WatchControllerReducer,
    watchControls: WatchControlReducer,
    watchClickListeners: WatchClickListenerReducer,

    dataHandlers: DataHandlersReducer,
    preferenceRecords: PreferenceRecordReducer,
    fileStorageRecords: FileStorageRecordReducer,
    entities: EntityReducer,
    entityAttributes: EntityAttributeReducer,
    entityRelations: EntityRelationReducer,
    cloudObjects: CloudObjectReducer,
    cloudObjectAttributes: CloudObjectAttributeReducer
});

export default RootReducer;