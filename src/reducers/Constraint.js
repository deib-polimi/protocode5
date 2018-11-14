import DataArchive from '../utils/DataArchive';
import { CREATE_CONSTRAINT, EDIT_CONSTRAINT, DELETE_CONSTRAINT } from '../actions/Constraint';
import { DELETE_VIEW_CONTROLLER } from '../actions/ViewController';
import { DELETE_UI_PHONE_CONTROL } from '../actions/UiPhoneControl';
import { CONSTRAINT_INVALID_INCOMPLETE, CONSTRAINT_VALID, CONSTRAINT_INVALID_LOOP } from '../Constants';

const InitialState = DataArchive.Create('id', ['viewControllerId', 'targetId']);

function isConstraintWellFormed(constraint) {
    return constraint.refId !== undefined
        && constraint.side !== undefined
        && (constraint.refId === null || constraint.refSide !== undefined);
}

function detectCircularDependency(constraints, startFrom) {
    let queue = [...DataArchive.Extract(constraints, 'targetId', startFrom).filter(c => c.valid).map(c => c.refId)];
    while (queue.length > 0) {
        let current = queue.shift();
        if (current === startFrom) {
            return true;
        }
        queue.push(...DataArchive.Extract(constraints, 'targetId', current).filter(c => c.valid).map(c => c.refId));
    }
    return false;
}

export default function ConstraintReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_CONSTRAINT:
            return DataArchive.Insert(state, {
                id: action.constraintId,
                name: 'Constraint' + (DataArchive.CountRel(state, 'targetId', action.targetId) + 1),
                viewControllerId: action.viewControllerId,
                targetId: action.targetId,
                refId: undefined,
                side: undefined,
                refSide: undefined,
                valid: CONSTRAINT_INVALID_INCOMPLETE
            });
        case EDIT_CONSTRAINT:
            /**
             * This is tricky
             * 
             * We must first update the constraint, in order to have fresh data
             * Then we check that
             * - the updated constraint is well-formed (i.e. all attributes are set)
             * - the updated constraint does not introduce circular dependencies (only valid constraints are checked)
             * If the updated constraint changes its validity state, we must do another update
             * else we are done and we can return the state we created with the first update
             */
            let edited = DataArchive.Merge(state, {
                id: action.constraintId,
                ...action.edits
            });
            let updatedConstraint = DataArchive.Get(edited, action.constraintId);
            let newValidity = CONSTRAINT_VALID;
            if (!isConstraintWellFormed(updatedConstraint)) {
                newValidity = CONSTRAINT_INVALID_INCOMPLETE;
            }
            else if (detectCircularDependency(edited, updatedConstraint.id)) {
                newValidity = CONSTRAINT_INVALID_LOOP;
            }
            if (newValidity !== updatedConstraint.valid) {
                return DataArchive.Merge(edited, {
                    id: updatedConstraint.id,
                    valid: newValidity
                });
            } else {
                return edited;
            }
        case DELETE_CONSTRAINT:
            return DataArchive.Delete(state, action.constraintId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.viewControllerId);
        case DELETE_UI_PHONE_CONTROL:
            /**
             * We could in principle exploit DeleteByRel to delete constraints basing on targetId
             * but refId is mutable, hence not indexable. Relying on rels would require two scans
             * of the DataArchive, this requires only one scan.
             */
            return DataArchive.DeleteByFilter(state, item => {
                return item.targetId === action.controlId || item.refId === action.controlId
            });
        default:
            return state;
    }
}