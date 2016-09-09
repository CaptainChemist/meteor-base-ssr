import React from 'react';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../containers/app-navigation';
import Helmet from "react-helmet";


export const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },
  render() {
    return <div>
      <Helmet
        title={this.props.children.props.route.pageTitle}
        meta={[
          {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        ]}
      />
      <AppNavigation />
      <Grid>
        { this.props.children }
      </Grid>
    </div>;
  },
});
