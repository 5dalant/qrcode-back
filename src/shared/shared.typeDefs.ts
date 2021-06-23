import { gql } from 'apollo-server';

export default gql`
    type ResponseMutation {
        ok: Boolean!
        error: String
    }
`;
