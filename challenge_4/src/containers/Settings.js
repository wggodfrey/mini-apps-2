import { connect } from 'react-redux';

import Settings from './../components/Settings';
import { updateSettings } from './../actions/settings';
import { adjustOutcome } from './../actions/outcome';

const mapStateToProps = state => ({
  size: state.settings.size,
  difficulty: state.settings.difficulty,
  outcome: state.outcome,
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: settings => {
    dispatch(updateSettings(settings));
    dispatch(adjustOutcome('reset'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);