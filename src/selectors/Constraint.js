import DataArchive from '../utils/DataArchive';

export default function ConstraintSelector(state, controlId) {
    return DataArchive.Extract(state.constraints, 'targetId', controlId);
}