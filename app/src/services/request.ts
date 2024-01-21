import axios from 'axios';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const api = axios.create();

const apollo = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

export { api, apollo, gql };
