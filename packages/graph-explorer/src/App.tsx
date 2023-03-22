import { Route, Routes } from "react-router-dom";
import Redirect from "./components/Redirect";
import Connections from "./workspaces/Connections";
import DataExplorer from "./workspaces/DataExplorer";
import GraphExplorer from "./workspaces/GraphExplorer";
import { Authenticator, View, Image, useTheme } from '@aws-amplify/ui-react';
import {Amplify} from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    region: "<AWSRegion>",
    userPoolId: "<UserPoolId>",
    userPoolWebClientId: "<UserPoolWebClientId>",
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
});

const formFields = {
  signUp: {
    username: {
      order: 1,
      isRequired: true,
    },
    password: {
      order: 2,
      isRequired: true,
    },
    confirm_password: {
      order: 3,
      isRequired: true,
    }, email: {
      order: 4,
      isRequired: true,
    }
  },
}


const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <h1>Graph Explorer</h1>
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        &copy; 2023 All Rights Reserved
      </View>
    );
  }
}

const App = () => {
  return (
    <Authenticator formFields={formFields} components={components}>
      {({ signOut, user }) => (
        <Routes>
          <Route path="/connections" element={<Connections signOut={signOut} user={user} />} />
          <Route path={"/data-explorer/:vertexType"} element={<DataExplorer signOut={signOut} user={user} />} />
          <Route path={"/graph-explorer"} element={<GraphExplorer signOut={signOut} user={user} />} />
          <Route path={"*"} element={<Redirect to={"/graph-explorer"} />} />
        </Routes>
      )}
    </Authenticator>
  );
};

export default App;
