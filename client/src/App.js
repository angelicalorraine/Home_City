import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Footer from './components/Footer';

// create main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// create request middleware
const authLink = setContext((_, { headers }) => {

  // get the token from local storage 
  const token = localStorage.getItem('id_token');

  // return the headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// create Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const searchVici = () => {
//   return fetch(`http://vici.ayocon.com/vicidial/non_agent_api.php?source=test&user=6666&pass=VoipqP4delTra567&function=lead_status_search&status=NANQUE&date=2021-09-16`)
//     .then(function (data) {
//       return data.json();
//     })

// };
// searchVici();

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />

            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

