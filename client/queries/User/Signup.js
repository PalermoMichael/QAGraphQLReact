import gql from 'graphql-tag';

export default gql`
    mutation Signup($name: String, $password: String) {
        signup(name: $name, password: $password) {
            id
            name
        }
    }
`;