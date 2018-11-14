import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { createApplication, deleteApplication } from '../actions/Application';

const mapStateToProps = (state) => {
    return {
        app: state.application
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: () => dispatch(createApplication()),
        onDelete: () => dispatch(deleteApplication()),
    }
}

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);

export default MainContainer;