import { gql } from 'apollo-angular';
export const VERIFY_CODE = gql`
  mutation verifyCode($code: String!) {
    verifyCode(code: $code) {
      success
      message
      result {
        user_id
        user_nme
        email_address
        phone_nbr
        icon_url
        gender
      }
    }
  }
`;
