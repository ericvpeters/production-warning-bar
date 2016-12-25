import { connect } from 'react-redux';
import DomainList from '../components/domainList.jsx';
import { addDomain, modifyDomain, removeDomain } from '../actions/actionsType';

const mapStateToProps = (state) => ({
    domainList: state.domainList
});

const mapDispatchToProps = (dispatch) => ({
    onAddDomain: (domain) => {
        dispatch(addDomain(domain));
    },
    onModifyDomain: (domain, oldDomain) => {
        dispatch(modifyDomain(domain, oldDomain));
    },
    onRemoveDomain: (domain) => {
        dispatch(removeDomain(domain));
    }
});


const DomainListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DomainList);


export default DomainListContainer;
