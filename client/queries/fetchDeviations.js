import gql from 'graphql-tag';

const fetchDeviationsQuery = gql `
  {
    deviations {
      id
      title
      client
      owner
      classification
      department
      status
      occurencedate 
      lots{
        id
        contents
      }
    }
  }
`;

export default fetchDeviationsQuery;