import { connect } from 'react-redux';
import DomainList from '../components/domainList.jsx';
import { addDomain } from '../actions/actionsType';

const mapStateToProps = (state) => ({
    domainList: state.domainList
});

const mapDispatchToProps = (dispatch) => ({
    onAddDomain: (domain) => {
        dispatch(addDomain(domain));
    }
});


const DomainListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DomainList);


export default DomainListContainer;
