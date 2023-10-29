import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { setSelectedTask } from '../../globalActions';
import EventMobile from './EventMobile';
import EventDesktop from './EventDesktop';

const Event = isMobile ? EventMobile : EventDesktop;

const mapStateToProps = (state, props) => ({ ...state.events[props.id] });

const mapDispatchToProps = {
  setSelectedTask,
};
export default connect(mapStateToProps, mapDispatchToProps)(Event);
